import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockPermissions from 'react-native-permissions/mock';
import mockDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mockCompasHeding from 'react-native-compass-heading/__mocks__/react-native-compass-heading';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import '@testing-library/jest-dom';
// import mockCrashlytics from '@react-native-firebase/';

/** https://stackoverflow.com/a/50793993 */
jest.useFakeTimers();

// https://github.com/invertase/react-native-firebase/issues/2475#issuecomment-669256625
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

/** https://react-native-async-storage.github.io/async-storage/docs/advanced/jest */
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

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

/**
 * Not working from external file
 */
jest.mock('react-native-fs', () => ({
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
}));

jest.mock('expo-secure-store', () => ({
    getItemAsync: jest.fn(),
    setItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));
