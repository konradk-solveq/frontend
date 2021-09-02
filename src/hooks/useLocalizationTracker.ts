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
    getLastLocationByRoutId,
    onWatchPostionChangeListener,
    pauseTracingLocation,
    requestGeolocationPermission,
    resumeTracingLocation,
    startBackgroundGeolocation,
    stopBackgroundGeolocation,
    stopWatchPostionChangeListener,
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
import {Location} from '@interfaces/geolocation';
import {locationTypeEnum} from '@src/type/location';

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
    const initialTrackerDataRef = useRef(false);

    const {isTrackingActivatedHandler, locationType} = useLocationProvider();
    const {appStateVisible} = useAppState();

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
                // await stopWatchPostionChangeListener();
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
        async (fastTimeout?: boolean, withLocation?: Location) => {
            const currentLocationData =
                withLocation ||
                (await getCurrentLocation(
                    currentRouteId,
                    fastTimeout ? 3 : undefined,
                    undefined,
                    fastTimeout ? true : false,
                    fastTimeout ? 3 : 15,
                    fastTimeout ? 2000 : 500,
                ));
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

            if (withLocation) {
                initialTrackerDataRef.current = true;
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
                const td = await getLastLocationByRoutId(currentRouteId);
                if (!td) {
                    setInitTrackerData(td);
                }
            };

            asyncAction();
        }
    }, [currentRouteId, trackerData]);

    useEffect(() => {
        if (isActive && !trackerData && initTrackerData) {
            setTrackerData(initTrackerData);
        }
    }, [isActive, initTrackerData, trackerData]);

    useEffect(() => {
        if (
            appStateVisible === 'background' &&
            isActive &&
            initialTrackerDataRef.current
        ) {
            if (locationType === locationTypeEnum.ALWAYS) {
                stopWatchPostionChangeListener();
                initialTrackerDataRef.current = false;
                console.log('[STOP WATCH POSITION LISTENER]');
            }
        }
    }, [appStateVisible, isActive, locationType]);

    useEffect(() => {
        if (isActive) {
            console.log('[RESUME LISTENER]');
            const setLocation = (location: Location) => {
                setCurrentTrackerData(undefined, location);
            };
            if (
                appStateVisible === 'active' &&
                !initialTrackerDataRef.current
            ) {
                onWatchPostionChangeListener(setLocation);
            }
        }

        return () => {
            initialTrackerDataRef.current = false;
        };
    }, [isActive, setCurrentTrackerData, appStateVisible]);

    useEffect(() => {
        if (isActive) {
            /**
             * Initial tracker data
             */
            setCurrentTrackerData(true);
        }

        return () => {
            cleanUp();
            console.log('[==CLEANUP ALL LISTENERS==]');
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
        currentRouteId,
    };
};

export default useLocalizationTracker;
