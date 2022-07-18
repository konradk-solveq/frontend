import {useEffect, useState} from 'react';

import {askFineLocationPermission} from '@utils/geolocation';
import useAppState from '@hooks/useAppState';

const useFineWhenInUseLocationPermission = (omitCheck?: boolean) => {
    const [permissionResult, setPermissionResult] = useState<string>('');

    const {appIsActive} = useAppState();

    useEffect(() => {
        if (appIsActive) {
            const perm = async () => {
                const resp = await askFineLocationPermission();
                setPermissionResult(resp);
            };

            if (!omitCheck) {
                perm();
            }
        }
    }, [omitCheck, appIsActive]);

    return {permissionResult};
};

export default useFineWhenInUseLocationPermission;
