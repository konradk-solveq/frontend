import {useCallback, useEffect, useRef, useState} from 'react';
import {
    activateKeepAwake,
    deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import {useAppDispatch, useAppSelector} from './redux';
import {
    trackerFollowedRouteIdSelector,
    trackerRouteIdSelector,
    trackerActiveSelector,
} from '@storage/selectors/routes';
import {
    setRecordingState,
    startRecordingRoute,
    stopCurrentRoute,
} from '@storage/actions/routes';
import {
    askMotionPermission,
    onWatchPostionChangeListener,
    pauseTracingLocation,
    requestGeolocationPermission,
    resumeTracingLocation,
    stopWatchPostionChangeListener,
} from '@utils/geolocation';
import {
    DEFAULT_SPEED,
    getLocationData,
    getTrackerData,
} from '@hooks/utils/localizationTracker';
import {Location} from '@interfaces/geolocation';
import {getCurrentRoutePathByIdWithLastRecord} from '@utils/routePath';
import {ShortCoordsType} from '@type/coords';
import {dispatchRouteDebugAction} from '@utils/debugging/routeData';
import {setGlobalLocation, setLocationInfoShowed} from '@storage/actions/app';

export interface DataI {
    distance: string;
    speed: string;
    odometer: number;
    coords: {
        lat: number;
        lon: number;
    };
    /**
     * `ISO-8601 UTC`
     */
    timestamp: string;
}

const useLocalizationTracker = (omitRequestingPermission?: boolean) => {
    const dispatch = useAppDispatch();

    const mountedRef = useRef(true);
    const restoredRef = useRef(false);

    const currentRouteId = useAppSelector(trackerRouteIdSelector);
    const isTrackerActive = useAppSelector(trackerActiveSelector);
    const followedRouteId = useAppSelector(trackerFollowedRouteIdSelector);
    const [isActive, setIsActive] = useState(false);
    const [trackerData, setTrackerData] = useState<DataI>();
    /**
     * State shows if tarcker is changing its state
     */
    const [processing, setProcessing] = useState(false);
    /**
     * Path restored from sql after app is restarted when recording is active
     */
    const [restoredPath, setRestoredPath] = useState<ShortCoordsType[]>([]);

    /**
     * Stop recording location data
     */
    const onStopTracker = useCallback(
        async (omitPersist?: boolean) => {
            setProcessing(true);

            /**
             * Dispatch actions, stop GPS plugin
             */
            const stopAction = await dispatch(stopCurrentRoute(omitPersist));

            if (stopAction?.finished) {
                setIsActive(false);
            }

            /**
             * Dsiables screen to stay awake
             */
            deactivateKeepAwake();

            setProcessing(false);
        },
        [dispatch],
    );

    /**
     * Start recording location data
     */
    const onStartTracker = useCallback(
        async (
            routeIdToFollow?: string,
            skipProcessing?: boolean,
            checkPermissions?: boolean,
        ) => {
            if (!skipProcessing) {
                setProcessing(true);
            }
            /**
             * State os hook is set to active
             * which means that location data is collected
             */
            setIsActive(true);
            /**
             * Enables screen to stay awake
             */
            activateKeepAwake();
            /**
             * Check if user gave permission to use motion sensor
             */
            if (checkPermissions) {
                await askMotionPermission();
            }
            /**
             * Dispatch actions, start GPS plugin
             */
            const startAction = await dispatch(
                startRecordingRoute(routeIdToFollow),
            );
            /**
             * If any crash occurs, stop the tracker
             * to allow users start it again
             */
            if (startAction?.finished && !startAction?.success) {
                await onStopTracker(true);
            }
            /**
             * After first user's choice we want to respect it.
             * It doesn't matter what kind of permission user gave us
             */
            dispatch(setLocationInfoShowed());

            if (!skipProcessing) {
                setProcessing(false);
            }
        },
        [dispatch, onStopTracker],
    );

    /**
     * Updates user location before recording is started
     * to update location on the map
     */
    const updateLocationWithoutPersistingData = useCallback(() => {
        const setLocation = (location: Location) => {
            if (!mountedRef.current || !location) {
                return;
            }

            const res = getTrackerData(location, true);
            if (!res) {
                return;
            }

            setTrackerData(res);
        };

        onWatchPostionChangeListener(setLocation);
    }, []);

    /**
     * Manual pause. Stops watching locations
     */
    const onPauseTracker = useCallback(async () => {
        dispatch(setRecordingState('paused'));
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

        /* Debug route - start */
        dispatchRouteDebugAction(dispatch, 'pause', currentRouteId);
        /* Debug route - end */

        setIsActive(false);
    }, [dispatch, currentRouteId]);

    /**
     * Resume recording location data
     */
    const onResumeTracker = useCallback(async () => {
        dispatch(setRecordingState('recording'));
        await resumeTracingLocation(currentRouteId);

        /* Debug route - start */
        dispatchRouteDebugAction(dispatch, 'resume', currentRouteId);
        /* Debug route - end */

        setIsActive(true);
    }, [dispatch, currentRouteId]);

    /**
     * Current tracker data based on location data.
     */
    const setCurrentTrackerData = useCallback(
        async (fastTimeout?: boolean, locationData?: Location) => {
            const trackerDataToUpdate = await getLocationData(
                currentRouteId,
                fastTimeout,
                locationData,
            );

            if (trackerDataToUpdate) {
                setTrackerData(prev => {
                    if (trackerDataToUpdate?.lowSpeed) {
                        if (!prev) {
                            return undefined;
                        }

                        return {
                            ...prev,
                            speed: trackerDataToUpdate.trackerData.speed,
                        };
                    } else {
                        return trackerDataToUpdate.trackerData;
                    }
                });
            }
        },
        [currentRouteId],
    );

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            /**
             * Clear location changes listener
             */
            stopWatchPostionChangeListener();
        };
    }, []);

    /**
     * Update location (only) initially
     * when recording is not still active
     */
    useEffect(() => {
        if (!isTrackerActive) {
            updateLocationWithoutPersistingData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!omitRequestingPermission) {
            requestGeolocationPermission();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Sets global location on end of recording route
     * to make it actual for the whole app
     */
    useEffect(() => {
        if (!isTrackerActive && !isActive) {
            trackerData?.coords.lat &&
                trackerData?.coords.lon &&
                dispatch(
                    setGlobalLocation({
                        latitude: trackerData.coords.lat,
                        longitude: trackerData.coords.lon,
                    }),
                );
        }
    }, [
        dispatch,
        isActive,
        isTrackerActive,
        trackerData?.coords?.lat,
        trackerData?.coords?.lon,
    ]);

    /**
     * Restore path after app relaunch
     * when recording is active
     */
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

                restoredRef.current = true;
            };
            runInitLocationSet();

            return;
        }

        restoredRef.current = true;
    }, [currentRouteId, isTrackerActive]);

    useEffect(() => {
        if (isActive) {
            /**
             * Initial location with lower accuracy
             */
            setCurrentTrackerData(true);

            const setLocation = (location: Location) => {
                if (!mountedRef.current) {
                    return;
                }

                setCurrentTrackerData(undefined, location);
            };

            const runListener = async () => {
                /**
                 * Stop previous listener if any active
                 */
                await stopWatchPostionChangeListener();
                onWatchPostionChangeListener(setLocation);
            };
            runListener();
        }
    }, [isActive, setCurrentTrackerData]);

    return {
        trackerData,
        isActive,
        pauseTracker: onPauseTracker,
        resumeTracker: onResumeTracker,
        startTracker: onStartTracker,
        stopTracker: onStopTracker,
        followedRouteId,
        setCurrentTrackerData,
        currentRouteId,
        restoredPath,
        processing,
    };
};

export default useLocalizationTracker;
