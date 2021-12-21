import DeviceInfo from 'react-native-device-info';

export const getIsNewVersion = (shopAppVersion: string) => {
    const splited = DeviceInfo.getVersion().split('-');
    const currentVersion = splited[0];

    const res = shopAppVersion > currentVersion;
    return res;
};
