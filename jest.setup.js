import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockPermissions from 'react-native-permissions/mock';
import mockDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mockCompasHeding from 'react-native-compass-heading/__mocks__/react-native-compass-heading';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
// import mockCrashlytics from '@react-native-firebase/';

/** https://stackoverflow.com/a/50793993 */
jest.useFakeTimers();

// https://github.com/invertase/react-native-firebase/issues/2475#issuecomment-669256625
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

/** https://react-native-async-storage.github.io/async-storage/docs/advanced/jest */
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-community/masked-view', () => ({}));

/** https://reactnavigation.org/docs/testing */
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};

    return Reanimated;
});
// Silence the warning: Animated: `useNativeDriver` is not supported
// because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-permissions', () => mockPermissions);

jest.mock('react-native-device-info', () => mockDeviceInfo);

jest.mock('react-native-compass-heading', () => mockCompasHeding);

/**
 * https://github.com/react-native-netinfo/react-native-netinfo/issues/357#issuecomment-627854645
 */
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-background-geolocation-android/src/NativeModule');
