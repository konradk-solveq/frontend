import DeviceInfo from 'react-native-device-info';

export const getUserAgent = () => {
    try {
        const appVersion = DeviceInfo.getVersion();
        const appBuildNumber = DeviceInfo.getBuildNumber();
        const systemVersion = DeviceInfo.getSystemVersion();
        const osName = DeviceInfo.getSystemName();
        const appName = DeviceInfo.getApplicationName();
        const uaString = `${appName}/${appVersion}-${appBuildNumber} ${osName}/${systemVersion}`;

        return uaString;
    } catch (error) {
        return undefined;
    }
};
