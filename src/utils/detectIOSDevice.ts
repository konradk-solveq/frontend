/**
 * title: Detect iPhone model
 * author: likrot bramish@gmail.com
 * license: MIT
 */
import {Platform, StatusBar, NativeModules} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {StatusBarManager} = NativeModules;
const STATUSBAR_DEFAULT_HEIGHT = 20;

export const deviceId = DeviceInfo.getDeviceId();

export const getStatusBarHeightAsync = (): Promise<number | undefined> => {
    return new Promise(resolve => {
        if (StatusBarManager && StatusBarManager.getHeight) {
            StatusBarManager.getHeight(({height}) => {
                resolve(height);
            });
        } else {
            resolve(StatusBar.currentHeight);
        }
    });
};

const getPureDeviceId = () => {
    if (!deviceId) {
        return 0;
    }
    try {
        return parseFloat(
            deviceId.toLowerCase().replace('iphone', '').replace(',', '.'),
        );
    } catch (error) {
        return deviceId;
    }
};

export const isIPhone8 =
    deviceId === 'iPhone10,1' ||
    deviceId === 'iPhone10,2' ||
    deviceId === 'iPhone10,4' ||
    deviceId === 'iPhone10,5';
export const isIphoneX = deviceId === 'iPhone10,3' || deviceId === 'iPhone10,6';
export const isIphone11 =
    deviceId === 'iPhone12,1' ||
    deviceId === 'iPhone12,3' ||
    deviceId === 'iPhone12,5';
export const isPhone12mini = deviceId === 'iPhone13,1';
export const isIphone12 =
    deviceId === 'iPhone13,2' ||
    deviceId === 'iPhone13,3' ||
    deviceId === 'iPhone13,4';
export const isFutureIphone = getPureDeviceId() >= 13.3;

// iPhone 11 has strange behaviuor with its margin -> seems to be fixed
// const negativeMargin = isIphone11 ? 44 : STATUSBAR_DEFAULT_HEIGHT;

export const getStatusBarHeight = async (skipAndroid: boolean) => {
    const nativeDeviceHeight = await getStatusBarHeightAsync();
    return Platform.select({
        ios: typeof nativeDeviceHeight !== 'undefined' ? nativeDeviceHeight : 0,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0,
    });
};
