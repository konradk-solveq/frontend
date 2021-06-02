import {useCallback, useEffect, useState} from 'react';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {useAppDispatch, useAppSelector} from './redux';
import {trackerCurrentRouteAverrageSpeedSelector} from '../storage/selectors/routes';
import {
    persistCurrentRouteData,
    setAverageSpeed,
    setCurrentRoute,
    stopCurrentRoute,
} from '../storage/actions/routes';
import {
    cleanUp,
    getBackgroundGeolocationState,
    getCurrentLocation,
    requestGeolocationPermission,
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
} from '../utils/geolocation';
import {
    DEFAULT_SPEED,
    deviceIsNotMoving,
    getAverageSpeedData,
    getTrackerData,
    speedToLow,
    startCurrentRoute,
} from './utils/localizationTracker';

interface DataI {
    distance: string;
    speed: string;
    averageSpeed: string;
    odometer: number;
    coords: {
        lat: number;
        lon: number;
    };
}

let speed: number[] = [];

const useLocalizationTracker = (persist: boolean) => {
    const dispatch = useAppDispatch();
    const currentRouteAverrageSpeed = useAppSelector(
        trackerCurrentRouteAverrageSpeedSelector,
    );
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [lastDistance, setLastDistance] = useState<number>(0);
    const [averageSpeed, setCurrentAverageSpeed] = useState<
        number | undefined
    >();

    const setAverageSpeedOnStart = useCallback(() => {
        if (!averageSpeed && currentRouteAverrageSpeed) {
            const as = getAverageSpeedData([currentRouteAverrageSpeed]);
            setCurrentAverageSpeed(parseFloat(as));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPersistData = useCallback(
        async (d: number) => {
            if (d - lastDistance < 200) {
                return;
            }

            dispatch(persistCurrentRouteData());
            if (averageSpeed) {
                dispatch(setAverageSpeed(averageSpeed));
            }
            setLastDistance(d);
        },
        [dispatch, lastDistance, averageSpeed],
    );

    const stopTracker = async () => {
        /* TODO: error */
        deactivateKeepAwake();
        dispatch(persistCurrentRouteData());
        setIsActive(false);
        dispatch(stopCurrentRoute());
        stopBackgroundGeolocation();
    };

    const startTracker = async (keep?: boolean) => {
        speed = [];
        /* TODO: error */
        const state = await getBackgroundGeolocationState();

        if (state.enabled && !keep) {
            await stopTracker();
        }

        setIsActive(true);
        activateKeepAwake();

        await startBackgroundGeolocation(keep);
        if (!keep) {
            const currRoute = await startCurrentRoute();
            dispatch(setCurrentRoute(keep ? undefined : currRoute));
        }
    };

    const onPauseTracker = () => {
        setIsActive(false);
        setTrackerData(prev => {
            if (prev) {
                return {
                    ...prev,
                    speed: DEFAULT_SPEED,
                };
            }
            return undefined;
        });
    };

    useEffect(() => {
        speed = [];
    }, []);

    useEffect(() => {
        requestGeolocationPermission();
    }, []);
    /* TODO: on motion change event */
    useEffect(() => {
        let interval: any;
        if (isActive) {
            interval = setInterval(() => {
                getCurrentLocation().then(d => {
                    const notMoving = false;
                    const lowSpeed = speedToLow(d);

                    setAverageSpeedOnStart();

                    let aSpeed = getAverageSpeedData(speed);
                    if (notMoving || lowSpeed) {
                        setTrackerData(prev => {
                            if (!prev) {
                                return undefined;
                            }
                            return {
                                ...prev,
                                averageSpeed: getAverageSpeedData(
                                    speed,
                                    currentRouteAverrageSpeed,
                                ),
                                speed: '0,0',
                            };
                        });
                        return;
                    }

                    if (d?.coords?.speed && d?.coords?.speed > 0) {
                        speed.push(d?.coords?.speed);
                    }

                    if (
                        (d?.odometer - lastDistance > 10 || !lastDistance) &&
                        !notMoving &&
                        parseFloat(aSpeed) >= 0.1
                    ) {
                        aSpeed = getAverageSpeedData(
                            speed,
                            currentRouteAverrageSpeed,
                        );
                    }

                    const res = getTrackerData(d, aSpeed);

                    setTrackerData(res);
                    setCurrentAverageSpeed(parseFloat(aSpeed));

                    if (persist) {
                        onPersistData(d?.odometer);
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
            cleanUp();
        };
    }, [
        isActive,
        persist,
        onPersistData,
        currentRouteAverrageSpeed,
        lastDistance,
        setAverageSpeedOnStart,
    ]);

    return {
        trackerData,
        lastDistance,
        isActive,
        pauseTracker: onPauseTracker,
        resumeTracker: () => setIsActive(true),
        startTracker,
        stopTracker,
        averageSpeed,
    };
};

export default useLocalizationTracker;
