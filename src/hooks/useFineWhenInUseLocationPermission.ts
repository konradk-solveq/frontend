import {useEffect, useState} from 'react';

import {askFineLocationPermission} from '@utils/geolocation';
import useAppState from '@hooks/useAppState';

const useFineWhenInUseLocationPermission = (omitCheck?: boolean) => {
    const [permissionResult, setPermissionResult] = useState<string>('');

    const {appStateVisible} = useAppState();

    useEffect(() => {
        if (appStateVisible === 'active' && !omitCheck) {
            const perm = async () => {
                const resp = await askFineLocationPermission();
                setPermissionResult(resp);
            };

            perm();
        }
    }, [omitCheck, appStateVisible]);

    return {permissionResult};
};

export default useFineWhenInUseLocationPermission;
