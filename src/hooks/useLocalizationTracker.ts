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
    getAverageSpeedData,
    getTrackerData,
    speedToLow,
    startCurrentRoute,
} from './utils/localizationTracker';
import {useLocationProvider} from '@src/providers/staticLocationProvider/staticLocationProvider';

export interface DataI {
    distance: string;
    speed: string;
    averageSpeed: string;
    odometer: number;
    coords: {
        lat: number;
        lon: number;
    };
    timestamp: number;
}

let speed: number[] = [];

const useLocalizationTracker = (
    persist: boolean,
    omitRequestingPermission?: boolean,
) => {
    const dispatch = useAppDispatch();
    const {isTrackingActivatedHandler} = useLocationProvider();

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

    // const onPersistData = useCallback(
    //     async (d: number) => {
    //         if (d - lastDistance < 1500) {
    //             return;
    //         }

    //         dispatch(persistCurrentRouteData());
    //         if (averageSpeed) {
    //             dispatch(setAverageSpeed(averageSpeed));
    //         }
    //         setLastDistance(d);
    //     },
    //     [dispatch, lastDistance, averageSpeed],
    // );

    const stopTracker = useCallback(
        async (omitPersist?: boolean) => {
            deactivateKeepAwake();
            dispatch(stopCurrentRoute(omitPersist));
            if (!omitPersist) {
                dispatch(persistCurrentRouteData());
            }
            const state = await stopBackgroundGeolocation();
            if (!state || !state?.enabled) {
                setIsActive(false);
            }

            isTrackingActivatedHandler(false);
        },
        [dispatch, isTrackingActivatedHandler],
    );

    const startTracker = useCallback(
        async (keep?: boolean, routeIdToFollow?: string) => {
            speed = [];
            /* TODO: error */
            const state = await getBackgroundGeolocationState();

            if (state?.enabled && !keep) {
                await stopTracker();
            }

            setIsActive(true);
            activateKeepAwake();

            /**
             * Should update state befeore change redux.
             */
            isTrackingActivatedHandler(true);

            const currRoute = await startCurrentRoute(routeIdToFollow);
            const routeID =
                keep && currentRouteId ? currentRouteId : currRoute.id;
            await startBackgroundGeolocation(routeID, keep);
            if (!keep) {
                dispatch(startRecordingRoute(currRoute, keep));
            }
        },
        [dispatch, currentRouteId, stopTracker, isTrackingActivatedHandler],
    );

    const onPauseTracker = useCallback(async () => {
        await pauseTracingLocation();
        setTrackerData(prev => {
            if (prev) {
                return {
                    ...prev,
                    speed: DEFAULT_SPEED,
                };
            }
            return undefined;
        });
        setIsActive(false);
    }, []);

    const onStartTracker = useCallback(async () => {
        await resumeTracingLocation();
        setIsActive(true);
    }, []);

    useEffect(() => {
        speed = [];
    }, []);

    useEffect(() => {
        if (!omitRequestingPermission) {
            requestGeolocationPermission();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setCurrentTrackerData = useCallback(() => {
        getCurrentLocation(currentRouteId).then(d => {
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
                ((d?.odometer && d?.odometer - lastDistance > 10) ||
                    !lastDistance) &&
                !notMoving &&
                parseFloat(aSpeed) >= 0.1
            ) {
                aSpeed = getAverageSpeedData(speed, currentRouteAverrageSpeed);
            }

            const res = getTrackerData(d, aSpeed);

            setTrackerData(res);
            setCurrentAverageSpeed(parseFloat(aSpeed));

            if (persist) {
                /* TODO: High disk usage - to verify and eventually delete */
                // onPersistData(d?.odometer);
            }
        });
    }, [
        persist,
        currentRouteAverrageSpeed,
        lastDistance,
        setAverageSpeedOnStart,
        currentRouteId,
    ]);

    /* TODO: on motion change event */
    useEffect(() => {
        let interval: any;
        if (isActive) {
            interval = setInterval(() => {
                setCurrentTrackerData();
            }, 1000);
        }

        return () => {
            clearInterval(interval);
            cleanUp();
        };
    }, [isActive, setCurrentTrackerData]);

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
        setCurrentTrackerData,
    };
};

export default useLocalizationTracker;
