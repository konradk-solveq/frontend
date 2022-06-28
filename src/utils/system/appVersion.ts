import DeviceInfo from 'react-native-device-info';

import {API_URL, ENVIRONMENT_TYPE} from '@env';

export const getAppVersion = (full?: boolean) => {
    const appVersion = DeviceInfo.getVersion();
    const appBuildNumber = DeviceInfo.getBuildNumber();
    const serverVersion = API_URL.includes('.pre.') ? ' - serwer testowy' : '';
    const buildType = API_URL.includes('.pre.') ? ` - ${ENVIRONMENT_TYPE}` : '';

    const suffix = !full ? '' : ` ${buildType} ${serverVersion}`;
    return `${appVersion} (${appBuildNumber})${suffix}`;
};
