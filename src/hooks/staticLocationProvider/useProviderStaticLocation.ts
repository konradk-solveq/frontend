import {useEffect, useState, useCallback} from 'react';
import {Platform} from 'react-native';

import {GeofenceEvent} from '@interfaces/geolocation';
import {BasicCoordsType} from '@type/coords';
import {locationTypeEnum} from '@type/location';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {setGlobalLocation} from '@storage/actions/app';
import {
    cleanUpListener,
    getLatLngFromForeground,
    onGeofenceChangeListener,
    removeGeofence,
    setGeofenceFromCurrentLocation,
    stopBackgroundGeolocationPlugin,
} from '@utils/geolocation';
import useFineWhenInUseLocationPermission from '@hooks/useFineWhenInUseLocationPermission';
import {
    onboardingFinishedSelector,
    trackerActiveSelector,
} from '@src/storage/selectors';
import useCheckLocationType from '@src/hooks/staticLocationProvider/useCheckLocationType';
import {
    IDENTIFIER,
    shouldOmit,
    transfromToProperFormat,
} from '@src/providers/staticLocationProvider/utils/geofenceData';

const isIOS = Platform.OS === 'ios';
const intervalToRefreshLocation = __DEV__ ? 12000 : 120000;

const useProviderStaticLocation = () => {
    const dispatch = useAppDispatch();

    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const isRouteRecordingActive = useAppSelector(trackerActiveSelector);

    useFineWhenInUseLocationPermission(!isOnboardingFinished);

    const {locationType} = useCheckLocationType();

    const [location, setLocation] = useState<BasicCoordsType | undefined>();
    const [isTrackingActivated, setIsTrackingActivated] = useState(false);

    const storeCurrentLocation = useCallback(
        (loc: BasicCoordsType) => {
            setLocation(loc);
            dispatch(setGlobalLocation(loc));
        },
        [dispatch],
    );

    const setGofenceToMonitor = useCallback(
        (event?: GeofenceEvent) => {
            const setLoc = async () => {
                if (event?.action === 'EXIT' || !event?.action) {
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
        const loc = await getLatLngFromForeground();

        if (loc) {
            storeCurrentLocation(loc);
        }
    }, [storeCurrentLocation]);

    const setInitLocationWithInterval = useCallback(async () => {
        if (!location) {
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
        if (locationType === locationTypeEnum.ALWAYS && isOnboardingFinished) {
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
    ]);

    useEffect(() => {
        let t: NodeJS.Timeout;
        let interval: NodeJS.Timeout;
        if (
            locationType === locationTypeEnum.WHEN_IN_USE &&
            isOnboardingFinished
        ) {
            t = setTimeout(() => {
                setInitLocationWithInterval();
            }, 1000);

            interval = setInterval(async () => {
                setLocationWithInterval();
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
    ]);

    return {
        location,
        setLocationWithInterval,
        isTrackingActivated,
        isTrackingActivatedHandler,
    };
};

export default useProviderStaticLocation;
