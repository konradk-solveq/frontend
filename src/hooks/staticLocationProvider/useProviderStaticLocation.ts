import {useEffect, useState, useCallback, useRef} from 'react';

import {GeofenceEvent} from '@interfaces/geolocation';
import {BasicCoordsType} from '@type/coords';
import {locationTypeEnum} from '@type/location';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {setGlobalLocation} from '@storage/actions/app';
import {showedLocationInfoSelector} from '@storage/selectors/app';
import {
    cleanUpListener,
    getLatLngFromForeground,
    getLocationWithLowAccuracy,
    onGeofenceChangeListener,
    removeGeofence,
    setConfigWithLocationPermission,
    setGeofenceFromCurrentLocation,
    stopBackgroundGeolocationPlugin,
} from '@utils/geolocation';
import {
    authUserIsAuthenticatedStateSelector,
    onboardingFinishedSelector,
    trackerActiveSelector,
} from '@storage/selectors';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {
    IDENTIFIER,
    shouldOmit,
    transfromToProperFormat,
} from '@providers/staticLocationProvider/utils/geofenceData';
import useAppState from '@hooks/useAppState';
import {getHaversineDistance} from '@utils/locationData';
import {MINIMAL_DISTANCE_FOR_LOCATION_UPDATE} from '@utils/system/location';
import {ANDROID_VERSION_10, isIOS} from '@utils/platform';

const INTERVAL_TO_REFRESH_LOCATION = __DEV__ ? 30000 : 300000;
const DELAY_TO_RERUN_GEOFANCE = 15000;

const ANDROID_IS_VERSION_10 = !isIOS && ANDROID_VERSION_10;
const ACCURACY_FOR_LOCATION_UPDATES = 50;

const useProviderStaticLocation = () => {
    const dispatch = useAppDispatch();
    const initLocationRef = useRef(false);
    const currentLocationRef = useRef<BasicCoordsType | undefined>();
    const initialGeofence = useRef(false);

    const {appIsActive} = useAppState();
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const isRouteRecordingActive = useAppSelector(trackerActiveSelector);
    const locationDialogHasBeenShown = useAppSelector(
        showedLocationInfoSelector,
    );
    const isAuthanticated = useAppSelector(
        authUserIsAuthenticatedStateSelector,
    );

    const {locationType, permissionGranted} = useCheckLocationType();
    const [isTrackingActivated, setIsTrackingActivated] = useState(false);

    /**
     * Get initial location with low accuracy.
     * It should be rerun after user has logged out and logged in again.
     */
    useEffect(() => {
        if (
            !initLocationRef.current &&
            isOnboardingFinished &&
            permissionGranted &&
            isAuthanticated
        ) {
            const getLocation = async () => {
                const loc = await getLocationWithLowAccuracy();
                if (loc?.coords) {
                    const l: BasicCoordsType = {
                        latitude: loc?.coords?.latitude,
                        longitude: loc?.coords?.longitude,
                    };

                    currentLocationRef.current = l;
                    dispatch(setGlobalLocation(l));
                }
            };

            getLocation();
            initLocationRef.current = true;
        }
    }, [dispatch, permissionGranted, isOnboardingFinished, isAuthanticated]);

    /**
     * Set BacgkroundGeolocation config based on user's choice
     */
    useEffect(() => {
        if (!locationDialogHasBeenShown) {
            return;
        }
        const setLocationConfig = async () => {
            if (locationType === locationTypeEnum.ALWAYS) {
                await setConfigWithLocationPermission('Always');
                return;
            }
            if (locationType === locationTypeEnum.WHEN_IN_USE) {
                await setConfigWithLocationPermission('WhenInUse');
                return;
            }
        };

        setLocationConfig();
    }, [locationType, locationDialogHasBeenShown]);

    /**
     * Stores location in global state
     */
    const storeCurrentLocation = useCallback(
        (loc: BasicCoordsType, skipDistanceCount?: boolean) => {
            if (!initLocationRef.current) {
                return;
            }

            const distance = getHaversineDistance(
                {
                    latitude: currentLocationRef.current?.latitude,
                    longitude: currentLocationRef.current?.longitude,
                },
                loc,
                true,
            );
            /**
             * Update location only when minimum distance is reached.
             * It prevents to update location too often when geofencing is not active.
             */
            if (
                (distance &&
                    distance >= MINIMAL_DISTANCE_FOR_LOCATION_UPDATE) ||
                skipDistanceCount
            ) {
                currentLocationRef.current = loc;
                dispatch(setGlobalLocation(loc));
            }
        },
        [dispatch],
    );

    const setGofenceToMonitor = useCallback(
        (event?: GeofenceEvent) => {
            const setLoc = async () => {
                if (event?.action === 'EXIT' || !initialGeofence.current) {
                    const omit = shouldOmit(event?.identifier);

                    const geofenceLocation = transfromToProperFormat(
                        event?.location,
                    );

                    const loc = await setGeofenceFromCurrentLocation(
                        IDENTIFIER,
                        geofenceLocation,
                        isIOS ? 200 : 100,
                        false,
                        true,
                        false,
                        omit && initialGeofence.current,
                    );

                    if (loc) {
                        storeCurrentLocation(loc, !initialGeofence.current);
                        initialGeofence.current = true;
                    }
                }
            };

            setLoc();
        },
        [storeCurrentLocation],
    );

    /**
     * Passing the force argument to the getLatLngFromForeground function
     * to force the location library to fetch the current location ignoring the current state
     * of the location library
     */
    const setLocationWithInterval = useCallback(
        async (
            force?: boolean,
            accuracy?: number,
            skipDistanceCount?: boolean,
        ) => {
            if (!initLocationRef.current) {
                return;
            }

            const loc = await getLatLngFromForeground(force, accuracy);
            if (loc) {
                storeCurrentLocation(loc, skipDistanceCount);
            }
        },
        [storeCurrentLocation],
    );

    /**
     * Refresh location after opening the app from the background
     */
    useEffect(() => {
        /**
         * There is a bug in Android 10 where the appstatus updates in infinite loop.
         */
        if (ANDROID_IS_VERSION_10) {
            return;
        }

        if (appIsActive && !isRouteRecordingActive!) {
            setLocationWithInterval(true);
        }
    }, [appIsActive, setLocationWithInterval, isRouteRecordingActive]);

    /**
     * Start plugin only if route tracking is disabled.
     */
    const startGeofenceMonitoring = useCallback(() => {
        setGofenceToMonitor();
        if (!isTrackingActivated && !isRouteRecordingActive) {
            onGeofenceChangeListener(
                setGofenceToMonitor,
                !isTrackingActivated && !isRouteRecordingActive,
            );
        }
    }, [setGofenceToMonitor, isTrackingActivated, isRouteRecordingActive]);

    /**
     * Don't stop plugin when tracking is enabled.
     */
    const stopGeofenceMonitoring = useCallback(() => {
        removeGeofence(IDENTIFIER);
        cleanUpListener('geofence', setGofenceToMonitor);
        if (!isTrackingActivated && !isRouteRecordingActive) {
            stopBackgroundGeolocationPlugin();
            console.log(
                '[=== STATIIC LOCATION PROVIDER -- plugin stopped ===]',
            );
        }
    }, [isTrackingActivated, isRouteRecordingActive, setGofenceToMonitor]);

    /**
     * Set tracker's current status.
     */
    const isTrackingActivatedHandler = useCallback((a: boolean) => {
        setIsTrackingActivated(a);
    }, []);

    /**
     * Refresh locationon every "EXIT" event when geofencing is active and route tracking is disabled.
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (
            locationType === locationTypeEnum.ALWAYS &&
            isOnboardingFinished &&
            !isTrackingActivated &&
            !isRouteRecordingActive
        ) {
            initialGeofence.current = false;
            startGeofenceMonitoring();
            /**
             * BackgroundGeolocation plugin returns Promise.resolved even it still shuts down.
             * Sometimes this generates an error that stops the plugin after starting geofence monitoring.
             *
             * This is workoround for this issue.
             */
            t = setTimeout(() => {
                startGeofenceMonitoring();
            }, DELAY_TO_RERUN_GEOFANCE);

            console.log(
                '[=== STATIIC LOCATION PROVIDER -- geofence started ===]',
            );
        }

        return () => {
            clearTimeout(t);
            stopGeofenceMonitoring();
            console.log(
                '[=== STATIIC LOCATION PROVIDER -- cleanup geofence finished ===]',
            );
        };
    }, [
        isOnboardingFinished,
        locationType,
        startGeofenceMonitoring,
        stopGeofenceMonitoring,
        isTrackingActivated,
        isRouteRecordingActive,
    ]);

    /**
     * Refresh location every ${INTERVAL_TO_REFRESH_LOCATION} when geofencing is not active and route tracking is disabled.
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        let interval: NodeJS.Timeout;
        if (
            locationType === locationTypeEnum.WHEN_IN_USE &&
            isOnboardingFinished &&
            !isTrackingActivated &&
            !isRouteRecordingActive
        ) {
            t = setTimeout(() => {
                if (initLocationRef.current) {
                    setLocationWithInterval(true, undefined, true);
                }
            }, 1000);

            interval = setInterval(() => {
                setLocationWithInterval(true, ACCURACY_FOR_LOCATION_UPDATES);
            }, INTERVAL_TO_REFRESH_LOCATION);

            console.log(
                '[=== STATIIC LOCATION PROVIDER -- interval started ===]',
            );
        }

        return () => {
            clearTimeout(t);
            clearInterval(interval);
            console.log(
                '[=== STATIIC LOCATION PROVIDER -- cleanup interval finished ===]',
            );
        };
    }, [
        isOnboardingFinished,
        locationType,
        setLocationWithInterval,
        isTrackingActivated,
        isRouteRecordingActive,
    ]);

    return {
        location:
            currentLocationRef.current /* TODO: remove, other components should read location from globalLocation value (redux) */,
        locationType,
        setLocationWithInterval,
        isTrackingActivated,
        isTrackingActivatedHandler /* TODO: check if this method stil should be used (we keep information about recording status in redux store) */,
    };
};

export default useProviderStaticLocation;
