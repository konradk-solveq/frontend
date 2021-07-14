import {useCallback, useEffect, useState} from 'react';
import {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';

import {LocationDataI} from '../interfaces/geolocation';

import {
    areCoordsSame,
    cleaUpPositionWatcher,
    onPostitionWatch,
    transformGeoloCationData,
} from '../utils/geolocation';
import {useAppSelector} from './redux';
import useOpenGPSSettings from './useOpenGPSSettings';

const useGeolocation = () => {
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);

    const {isGPSEnabled} = useOpenGPSSettings();
    const [location, setLocation] = useState<LocationDataI | undefined>();
    const [errors, setErrors] = useState<LocationError[]>([]);

    const onLocationHandler = useCallback(
        (data: Location) => {
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
        if (isGPSEnabled) {
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
