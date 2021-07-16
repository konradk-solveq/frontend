import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import GetLocation from 'react-native-get-location';

import {LocationDataI} from '../interfaces/geolocation';

import {
    areCoordsSame,
    cleaUpPositionWatcher,
    onPostitionWatch,
    transformGeoloCationData,
} from '../utils/geolocation';
import {useAppSelector} from './redux';
import useOpenGPSSettings from './useOpenGPSSettings';

const isIOS = Platform.OS === 'ios';

const useGeolocation = () => {
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);

    const {isGPSEnabled} = useOpenGPSSettings();
    const [location, setLocation] = useState<LocationDataI | undefined>();
    const [errors, setErrors] = useState<LocationError[]>([]);

    const onLocationHandler = useCallback(
        (data: Location | undefined) => {
            if (!data) {
                return;
            }

            if (areCoordsSame(location, data)) {
                return;
            }

            const loc = transformGeoloCationData(data);

            setLocation(loc);
        },
        [location],
    );

    const onLocationErrorHandler = (error: LocationError) => {
        setErrors(prev => [...prev, error]);
    };

    useEffect(() => {
        if (isIOS || isGPSEnabled) {
            try {
                GetLocation.getCurrentPosition({
                    enableHighAccuracy: false,
                    timeout: 15000,
                }).then(l => {
                    const initLoc: LocationDataI = {
                        coords: {
                            altitude: l.altitude,
                            latitude: l.latitude,
                            longitude: l.longitude,
                            speed: l.speed,
                        },
                        odometer: 0,
                        timestamp: '',
                        uuid: `${l.time}`,
                    };
                    setLocation(initLoc);
                });
            } catch (error) {}
        }
    }, [isGPSEnabled]);

    useEffect(() => {
        if (isIOS || isGPSEnabled) {
            onPostitionWatch(onLocationHandler, onLocationErrorHandler);

            return () => {
                cleaUpPositionWatcher();
            };
        }
    }, [isGPSEnabled, onLocationHandler]);

    return {
        isOnline,
        location,
        errors,
    };
};

export default useGeolocation;
