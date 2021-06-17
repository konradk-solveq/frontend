import {useCallback, useEffect, useState} from 'react';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {useAppDispatch, useAppSelector} from './redux';
import {
    trackerCurrentRouteAverrageSpeedSelector,
    trackerFollowedRouteIdSelector,
    trackerRouteIdSelector,
} from '../storage/selectors/routes';
import {
    persistCurrentRouteData,
    setAverageSpeed,
    setCurrentRoute,
    startRecordingRoute,
    stopCurrentRoute,
} from '../storage/actions/routes';
import {
    cleanUp,
    getBackgroundGeolocationState,
    getCurrentLocation,
    pauseTracingLocation,
    requestGeolocationPermission,
    resumeTracingLocation,
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
    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    const followedRouteId = useAppSelector(trackerFollowedRouteIdSelector);
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
        dispatch(stopCurrentRoute());
        dispatch(persistCurrentRouteData());
        const state = await stopBackgroundGeolocation();
        if (!state.enabled) {
            setIsActive(false);
        }
    };

    const startTracker = async (keep?: boolean, routeIdToFollow?: string) => {
        speed = [];
        /* TODO: error */
        const state = await getBackgroundGeolocationState();

        if (state.enabled && !keep) {
            await stopTracker();
        }

        setIsActive(true);
        activateKeepAwake();

        const currRoute = await startCurrentRoute(routeIdToFollow);
        const routeID = keep && currentRouteId ? currentRouteId : currRoute.id;
        await startBackgroundGeolocation(routeID, keep);
        if (!keep) {
            dispatch(startRecordingRoute(currRoute, keep));
        }
    };

    const onPauseTracker = () => {
        setIsActive(false);
        resumeTracingLocation();
        pauseTracingLocation();
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

    const onStartTracker = async () => {
        await resumeTracingLocation();
        setIsActive(true);
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
                getCurrentLocation(currentRouteId).then(d => {
                    const notMoving = false;
                    const lowSpeed = speedToLow(d);
console.log('read localization after restrat', d)
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
        currentRouteId,
    ]);

    return {
        trackerData,
        lastDistance,
        isActive,
        pauseTracker: onPauseTracker,
        resumeTracker: onStartTracker,
        startTracker,
        stopTracker,
        averageSpeed,
        followedRouteId,
    };
};

export default useLocalizationTracker;
