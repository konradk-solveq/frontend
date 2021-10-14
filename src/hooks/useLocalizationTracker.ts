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
    trackerActiveSelector,
} from '../storage/selectors/routes';
import {startRecordingRoute, stopCurrentRoute} from '../storage/actions/routes';
import {
    getCurrentLocation,
    onWatchPostionChangeListener,
    pauseTracingLocation,
    requestGeolocationPermission,
    resumeTracingLocation,
} from '../utils/geolocation';
import {
    DEFAULT_SPEED,
    getAverageSpeedData,
    getTrackerData,
    speedToLow,
} from './utils/localizationTracker';
import {useLocationProvider} from '@src/providers/staticLocationProvider/staticLocationProvider';
import {Location} from '@interfaces/geolocation';
import {getCurrentRoutePathByIdWithLastRecord} from '@utils/routePath';
import {ShortCoordsType} from '@type/coords';
import {isLocationValidate} from '@utils/locationData';
import {isLocationValidToPass} from '@src/utils/transformData';

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
    const mountedRef = useRef(true);
    const restoredRef = useRef(false);

    const {isTrackingActivatedHandler} = useLocationProvider();

    const currentRouteAverrageSpeed = useAppSelector(
        trackerCurrentRouteAverrageSpeedSelector,
    );
    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const followedRouteId = useAppSelector(trackerFollowedRouteIdSelector);
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    const [initTrackerData, setInitTrackerData] = useState<DataI>();
    const [lastDistance, setLastDistance] = useState<number>(0);
    const [averageSpeed, setCurrentAverageSpeed] = useState<
        number | undefined
    >();
    const [processing, setProcessing] = useState(false);

    const [restoredPath, setRestoredPath] = useState<ShortCoordsType[]>([]);

    const setAverageSpeedOnStart = useCallback(() => {
        if (!averageSpeed && currentRouteAverrageSpeed) {
            const as = getAverageSpeedData([currentRouteAverrageSpeed]);
            setCurrentAverageSpeed(parseFloat(as));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stopTracker = useCallback(
        async (omitPersist?: boolean) => {
            setProcessing(true);

            /**
             * Dispatch actions, stop GPS plugin
             */
            const stopAction = await dispatch(stopCurrentRoute(omitPersist));

            if (stopAction?.finished) {
                setIsActive(false);
                isTrackingActivatedHandler(false);
            }

            deactivateKeepAwake();

            setProcessing(false);
        },
        [dispatch, isTrackingActivatedHandler],
    );

    const startTracker = useCallback(
        async (routeIdToFollow?: string, skipProcessing?: boolean) => {
            if (!skipProcessing) {
                setProcessing(true);
            }

            speed = [];

            setIsActive(true);
            activateKeepAwake();

            /**
             * Should update state befeore change redux.
             */
            isTrackingActivatedHandler(true);

            /**
             * Dispatch actions, start GPS plugin
             */
            const startAction = await dispatch(
                startRecordingRoute(routeIdToFollow),
            );

            if (startAction?.finished && !startAction?.success) {
                await stopTracker(true);
            }

            if (!skipProcessing) {
                setProcessing(false);
            }
        },
        [dispatch, isTrackingActivatedHandler, stopTracker],
    );

    /**
     * Manual pause. Stops watching locations.
     */
    const onPauseTracker = useCallback(async () => {
        await pauseTracingLocation(true);
        stopWatchPostionChangeListener();
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
        await resumeTracingLocation(currentRouteId);
        setIsActive(true);
    }, [currentRouteId]);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
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
        async (fastTimeout?: boolean, lcoationData?: Location) => {
            const currentLocationData =
                lcoationData ||
                (await getCurrentLocation(
                    currentRouteId,
                    fastTimeout ? 4 : undefined,
                    undefined,
                    fastTimeout ? true : false,
                    fastTimeout ? 5 : 15,
                    fastTimeout ? 2000 : 500,
                ));

            if (!currentLocationData) {
                return;
            }

            if (!isLocationValidate(currentLocationData)) {
                return;
            }

            if (
                !fastTimeout &&
                !isLocationValidToPass(currentLocationData, currentRouteId)
            ) {
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
                currentLocationData?.coords?.speed > 0 &&
                !fastTimeout
            ) {
                speed.push(currentLocationData?.coords?.speed);
            }

            if (
                ((currentLocationData?.odometer &&
                    currentLocationData?.odometer - lastDistance > 10) ||
                    !lastDistance) &&
                !notMoving &&
                parseFloat(aSpeed) >= 0.1 &&
                !fastTimeout
            ) {
                aSpeed = getAverageSpeedData(speed, currentRouteAverrageSpeed);
            }

            const res = getTrackerData(currentLocationData, aSpeed);

            if (!res) {
                return;
            }

            setTrackerData(res);
            setCurrentAverageSpeed(parseFloat(aSpeed));

            if (persist) {
                /* TODO: High disk usage - to verify and eventually delete */
                // onPersistData(d?.odometer);
            }

            if (lcoationData) {
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
        if (!restoredRef.current && currentRouteId && isTrackerActive) {
            const runInitLocationSet = async () => {
                const recordedPath = await getCurrentRoutePathByIdWithLastRecord(
                    currentRouteId,
                    [],
                    true,
                );

                if (recordedPath?.data?.length) {
                    setRestoredPath(recordedPath.data);
                }

                if (!trackerData) {
                    setCurrentTrackerData(true);
                }

                restoredRef.current = true;
            };

            runInitLocationSet();

            return;
        }

        restoredRef.current = true;

        return () => {
            // restoredRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRouteId, isTrackerActive]);

    useEffect(() => {
        if (isActive && !trackerData && initTrackerData) {
            setTrackerData(initTrackerData);
        }
    }, [isActive, initTrackerData, trackerData]);

    useEffect(() => {
        if (isActive) {
            const setLocation = (location: Location) => {
                if (!mountedRef.current) {
                    return;
                }

                setCurrentTrackerData(undefined, location);
                setInitTrackerData(undefined);
            };

            if (!initialTrackerDataRef.current) {
                onWatchPostionChangeListener(setLocation);
            }
        }

        return () => {
            initialTrackerDataRef.current = false;
        };
    }, [isActive, setCurrentTrackerData]);

    useEffect(() => {
        if (isActive) {
            /**
             * Initial tracker data
             */
            setCurrentTrackerData(true);
        }
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
        restoredPath,
        processing,
    };
};

export default useLocalizationTracker;
