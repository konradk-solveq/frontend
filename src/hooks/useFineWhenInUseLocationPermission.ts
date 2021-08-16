import {useEffect, useState} from 'react';

import useOpenGPSSettings from '@hooks/useOpenGPSSettings';
import {askFineLocationPermission} from '@utils/geolocation';

const useFineWhenInUseLocationPermission = (omitCheck?: boolean) => {
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

        if (!omitCheck) {
            perm();
        }
    }, [omitCheck]);

    return {permissionResult, openLocationSettings};
};

export default useFineWhenInUseLocationPermission;
