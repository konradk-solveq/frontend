import {useCallback, useEffect, useState} from 'react';

import {openGPSModule} from '@utils/geolocation';
import BackgroundGeolocation from 'react-native-background-geolocation-android';

const useOpenGPSSettings = () => {
    const [isGPSEnabled, setIsGPSEnabled] = useState<boolean>();

    useEffect(() => {
        BackgroundGeolocation.onProviderChange(event => {
            setIsGPSEnabled(event.gps);
        });
    }, []);

    const openLocationSettings = useCallback(async () => {
        const res = await openGPSModule();
        if (res === 'enabled' || res === 'already-enabled') {
            setIsGPSEnabled(true);
            return;
        }
        setIsGPSEnabled(false);
    }, []);

    return {
        isGPSEnabled,
        openLocationSettings,
        isGPSStatusRead: typeof isGPSEnabled !== 'undefined',
    };
};

export default useOpenGPSSettings;
