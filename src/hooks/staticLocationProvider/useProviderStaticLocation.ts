import {useEffect, useState, useCallback, useRef} from 'react';
import {Platform} from 'react-native';

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
    onboardingFinishedSelector,
    trackerActiveSelector,
} from '@storage/selectors';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {
    IDENTIFIER,
    shouldOmit,
    transfromToProperFormat,
} from '@src/providers/staticLocationProvider/utils/geofenceData';

const isIOS = Platform.OS === 'ios';
const intervalToRefreshLocation = __DEV__ ? 12000 : 120000;

const useProviderStaticLocation = () => {
    const dispatch = useAppDispatch();
    const initLocationRef = useRef(false);

    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const isRouteRecordingActive = useAppSelector(trackerActiveSelector);
    const locationDialogHasBeenShown = useAppSelector(
        showedLocationInfoSelector,
    );

    const {locationType, permissionGranted} = useCheckLocationType();

    const [location, setLocation] = useState<BasicCoordsType | undefined>();
    const [isTrackingActivated, setIsTrackingActivated] = useState(false);

    /**
     * Get initial location with low accuracy
     */
    useEffect(() => {
        if (
            !initLocationRef.current &&
            isOnboardingFinished &&
            permissionGranted
        ) {
            const getLocation = async () => {
                const loc = await getLocationWithLowAccuracy();
                if (loc?.coords) {
                    const l: BasicCoordsType = {
                        latitude: loc?.coords?.latitude,
                        longitude: loc?.coords?.longitude,
                    };
                    setLocation(l);
                    dispatch(setGlobalLocation(l));
                }
            };

            getLocation();

            initLocationRef.current = true;
        }

        return () => {
            initLocationRef.current = false;
        };
    }, [dispatch, permissionGranted, isOnboardingFinished]);

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

    const storeCurrentLocation = useCallback(
        (loc: BasicCoordsType) => {
            if (!initLocationRef.current) {
                return;
            }
            setLocation(loc);
            dispatch(setGlobalLocation(loc));
        },
        [dispatch],
    );

    const setGofenceToMonitor = useCallback(
        (event?: GeofenceEvent) => {
            const setLoc = async () => {
                if (
                    event?.action === 'EXIT' ||
                    (!event?.action && initLocationRef.current)
                ) {
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
                        omit,
                    );

                    if (loc) {
                        storeCurrentLocation(loc);
                    }
                }
            };

            setLoc();
        },
        [storeCurrentLocation],
    );

    const setLocationWithInterval = useCallback(async () => {
        if (!initLocationRef.current) {
            return;
        }

        const loc = await getLatLngFromForeground();

        if (loc) {
            storeCurrentLocation(loc);
        }
    }, [storeCurrentLocation]);

    const setInitLocationWithInterval = useCallback(async () => {
        if (!location && initLocationRef.current) {
            setLocationWithInterval();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    }, [isTrackingActivated, isRouteRecordingActive, setGofenceToMonitor]);

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

    useEffect(() => {
        let t: NodeJS.Timeout;
        if (
            locationType === locationTypeEnum.ALWAYS &&
            isOnboardingFinished &&
            !isTrackingActivated
        ) {
            startGeofenceMonitoring();
            /**
             * BackgroundGeolocation plugin returns Promise.resolved even it still shuts down.
             * Sometimes this generates an error that stops the plugin after starting geofence monitoring.
             *
             * This is workoround for this issue.
             */
            t = setTimeout(() => {
                startGeofenceMonitoring();
            }, 15000);
        }

        return () => {
            if (locationType === locationTypeEnum.ALWAYS) {
                clearTimeout(t);
                stopGeofenceMonitoring();
                console.log(
                    '[=== STATIIC LOCATION PROVIDER -- cleanup geofence finished ===]',
                );
            }
        };
    }, [
        isOnboardingFinished,
        locationType,
        startGeofenceMonitoring,
        stopGeofenceMonitoring,
        isTrackingActivated,
    ]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        let interval: NodeJS.Timeout;
        if (
            locationType === locationTypeEnum.WHEN_IN_USE &&
            isOnboardingFinished &&
            !isTrackingActivated
        ) {
            t = setTimeout(() => {
                setInitLocationWithInterval();
            }, 1000);

            interval = setInterval(async () => {
                await setLocationWithInterval();
            }, intervalToRefreshLocation);
        }

        return () => {
            if (locationType === locationTypeEnum.WHEN_IN_USE) {
                clearTimeout(t);
                clearInterval(interval);
                console.log(
                    '[=== STATIIC LOCATION PROVIDER -- cleanup interval finished ===]',
                );
            }
        };
    }, [
        isOnboardingFinished,
        locationType,
        setLocationWithInterval,
        setInitLocationWithInterval,
        isTrackingActivated,
    ]);

    return {
        location,
        locationType,
        setLocationWithInterval,
        isTrackingActivated,
        isTrackingActivatedHandler,
    };
};

export default useProviderStaticLocation;
