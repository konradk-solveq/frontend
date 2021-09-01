import {useCallback, useEffect, useRef, useState} from 'react';
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
    getLocations,
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
import useAppState from './useAppState';

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
    const fastTrackerDataRef = useRef(false);
    const initialTrackerDataRef = useRef(false);

    const {isTrackingActivatedHandler} = useLocationProvider();
    const {appPrevStateVisible, appStateVisible} = useAppState();

    const currentRouteAverrageSpeed = useAppSelector(
        trackerCurrentRouteAverrageSpeedSelector,
    );
    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    const followedRouteId = useAppSelector(trackerFollowedRouteIdSelector);
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [initTrackerData, setInitTrackerData] = useState<DataI>();
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

            activateKeepAwake();
            const currRoute = await startCurrentRoute(routeIdToFollow);
            const routeID =
                keep && currentRouteId ? currentRouteId : currRoute.id;
            if (!keep) {
                dispatch(startRecordingRoute(currRoute, keep));
            }
            setIsActive(true);

            /**
             * Should update state befeore change redux.
             */
            isTrackingActivatedHandler(true);

            await startBackgroundGeolocation(routeID, keep);
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

    const setCurrentTrackerData = useCallback(
        async (fastTimeout?: boolean) => {
            const currentLocationData = await getCurrentLocation(
                currentRouteId,
                fastTimeout ? 3 : undefined,
                undefined,
                true,
                // fastTimeout ? true : false,
                fastTimeout ? 3 : 15,
                fastTimeout ? 2000 : 500,
            );
            if (!currentLocationData) {
                return;
            }

            const notMoving = false;
            const lowSpeed = speedToLow(currentLocationData);

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

            if (
                currentLocationData?.coords?.speed &&
                currentLocationData?.coords?.speed > 0
            ) {
                speed.push(currentLocationData?.coords?.speed);
            }

            if (
                ((currentLocationData?.odometer &&
                    currentLocationData?.odometer - lastDistance > 10) ||
                    !lastDistance) &&
                !notMoving &&
                parseFloat(aSpeed) >= 0.1
            ) {
                aSpeed = getAverageSpeedData(speed, currentRouteAverrageSpeed);
            }

            const res = getTrackerData(currentLocationData, aSpeed);

            setTrackerData(res);
            setCurrentAverageSpeed(parseFloat(aSpeed));

            if (persist) {
                /* TODO: High disk usage - to verify and eventually delete */
                // onPersistData(d?.odometer);
            }
        },
        [
            persist,
            currentRouteAverrageSpeed,
            lastDistance,
            setAverageSpeedOnStart,
            currentRouteId,
        ],
    );

    useEffect(() => {
        if (!trackerData && currentRouteId) {
            const asyncAction = async () => {
                const locations = await getLocations();
                if (!locations?.length) {
                    return;
                }

                let lastLocation: any;
                for (let index = locations.length - 1; index > 0; index--) {
                    const l: any = locations[index];
                    if (l?.extras?.route_id === currentRouteId) {
                        lastLocation = {
                            ...l,
                            coords: {
                                ...l?.coords,
                                speed: undefined,
                            },
                        };
                        break;
                    }
                }

                if (!lastLocation) {
                    return;
                }
                const td = getTrackerData(lastLocation);
                setInitTrackerData(td);
            };

            asyncAction();
        }
    }, [currentRouteId, trackerData]);

    useEffect(() => {
        if (isActive && !trackerData && initTrackerData) {
            setTrackerData(initTrackerData);
        }
    }, [isActive, initTrackerData, trackerData]);

    /**
     * Set tracker data after return from background
     */
    useEffect(() => {
        if (
            appPrevStateVisible === 'background' &&
            !fastTrackerDataRef.current &&
            initialTrackerDataRef.current
        ) {
            setCurrentTrackerData(true);

            fastTrackerDataRef.current = true;
        }
    }, [appPrevStateVisible, setCurrentTrackerData]);

    useEffect(() => {
        if (appStateVisible === 'background') {
            fastTrackerDataRef.current = false;
        }
    }, [appStateVisible]);

    /* TODO: on motion change event */
    useEffect(() => {
        let interval: any;
        if (isActive) {
            /**
             * Initial tracker data
             */
            setCurrentTrackerData(true);

            interval = setInterval(() => {
                setCurrentTrackerData();
            }, 1000);

            initialTrackerDataRef.current = true;
        }

        return () => {
            clearInterval(interval);
            cleanUp();
            initialTrackerDataRef.current = false;
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
