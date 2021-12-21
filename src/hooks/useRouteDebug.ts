import {useEffect} from 'react';
import {Platform} from 'react-native';

import {ROUTE_DEBUG_MODE} from '@env';
import {askFilePermissionsOnAndroid} from '@utils/writeFilePermission';

const useRouteDebug = () => {
    useEffect(() => {
        if (ROUTE_DEBUG_MODE !== 'true') {
            return;
        }

        if (Platform.OS === 'android') {
            askFilePermissionsOnAndroid();
        }
    }, []);
};

export default useRouteDebug;
