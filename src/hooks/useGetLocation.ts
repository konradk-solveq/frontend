import {useEffect, useState} from 'react';

import {cleanUp, getCurrentLocation} from '../utils/geolocation';

interface LocationI {
    lat: number;
    lon: number;
}

const useGetLocation = () => {
    const [location, setLocation] = useState<LocationI>();

    useEffect(() => {
        getCurrentLocation().then(d => {
            if (d.coords) {
                setLocation({
                    lat: d.coords.latitude,
                    lon: d.coords.longitude,
                });
            }
        });

        return () => {
            cleanUp();
        };
    }, []);

    return {
        location,
        setLocation,
    };
};

export default useGetLocation;
