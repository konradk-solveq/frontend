import {useEffect, useState} from 'react';
import {
    Location,
    LocationError,
} from 'react-native-background-geolocation-android';
import {LocationDataI} from '../interfaces/geolocation';

import {
    cleaUpPositionWatcher,
    onPostitionWatch,
    transformGeoloCationData,
} from '../utils/geolocation';
import {useAppSelector} from './redux';

const useGeolocation = () => {
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);

    const [locations, setLocations] = useState<LocationDataI[]>([]);
    const [errors, setErrors] = useState<LocationError[]>([]);

    const onLocationHandler = (data: Location) => {
        const location = transformGeoloCationData(data);

        setLocations(prev => [...prev, location]);
    };
    const onLocationErrorHandler = (error: LocationError) => {
        setErrors(prev => [...prev, error]);
    };

    useEffect(() => {
        onPostitionWatch(onLocationHandler, onLocationErrorHandler);

        return () => {
            cleaUpPositionWatcher();
        };
    }, []);

    return {
        isOnline,
        locations,
        errors,
    };
};

export default useGeolocation;
