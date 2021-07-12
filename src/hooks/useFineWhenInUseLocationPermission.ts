import {useEffect, useState} from 'react';
import {askFineLocationPermission} from '../utils/geolocation';

const useFineWhenInUseLocationPermission = () => {
    const [permissionResult, setPermissionResult] = useState<string>('');

    useEffect(() => {
        const perm = async () => {
            const resp = await askFineLocationPermission();
            setPermissionResult(resp);
        };

        perm();
    }, []);

    return permissionResult;
};

export default useFineWhenInUseLocationPermission;
