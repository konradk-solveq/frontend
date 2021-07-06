import {useEffect, useState} from 'react';

import {cleanUp, getCurrentLocation} from '../utils/geolocation';

interface LocationI {
    lat: number;
    lon: number;
    heading: number;
}

const useGetLocation = () => {
    const [location, setLocation] = useState<LocationI>();

    useEffect(() => {
        getCurrentLocation().then(d => {
            if (d.coords) {
                setLocation({
                    lat: d.coords.latitude,
                    lon: d.coords.longitude,
                    heading: d.coords.heading || 0,
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
