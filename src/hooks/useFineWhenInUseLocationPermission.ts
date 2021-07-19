import {useEffect, useState} from 'react';

import {askFineLocationPermission} from '../utils/geolocation';
import useOpenGPSSettings from './useOpenGPSSettings';

const useFineWhenInUseLocationPermission = () => {
    const {openLocationSettings} = useOpenGPSSettings(true);

    const [permissionResult, setPermissionResult] = useState<string>('');

    useEffect(() => {
        if (permissionResult === 'granted') {
            const t = setTimeout(() => {
                openLocationSettings();
            }, 500);

            return () => {
                clearTimeout(t);
            };
        }
    }, [permissionResult, openLocationSettings]);

    useEffect(() => {
        const perm = async () => {
            const resp = await askFineLocationPermission();
            setPermissionResult(resp);
        };

        perm();
    }, []);

    return {permissionResult, openLocationSettings};
};

export default useFineWhenInUseLocationPermission;
