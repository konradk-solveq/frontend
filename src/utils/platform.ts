import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const SYSTEM_VERSION = DeviceInfo.getSystemVersion();
export const ANDROID_VERSION_10 =
    SYSTEM_VERSION >= '10' && SYSTEM_VERSION < '11';
