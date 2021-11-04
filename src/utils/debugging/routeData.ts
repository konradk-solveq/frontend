import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as RNFS from 'react-native-fs';

import {GeneralDeviceT} from '@type/debugRoute';

const platformName = Platform.OS === 'ios' ? 'IOS' : 'Android';

export const generalDeviceInfo = (): GeneralDeviceT => {
    const airplaneMode = DeviceInfo.isAirplaneModeSync();
    const appUsedMemory = DeviceInfo.getUsedMemorySync();
    const baseOS = DeviceInfo.getBaseOsSync() || platformName;
    const deviceMemory = DeviceInfo.getTotalMemorySync();
    const freeDiskStorage = DeviceInfo.getFreeDiskStorageSync();
    const locationProviders = DeviceInfo.getAvailableLocationProvidersSync();
    const powerState = DeviceInfo.getPowerStateSync();

    return {
        airplaneMode,
        appUsedMemory,
        baseOS,
        deviceMemory,
        freeDiskStorage,
        locationProviders,
        powerState,
    };
};

const DOCUMENT_DIR_PATH =
    Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath
        : RNFS.DocumentDirectoryPath;

const FILES_DIR = 'myKROSS_debug';

const FILES_PATH = `${DOCUMENT_DIR_PATH}/${FILES_DIR}`;

export const checkFileExists = () => {};

export const appendDataToFile = async (
    fileName: string,
    data: any,
    withComma?: boolean,
    prefix?: string,
    suffix?: string,
) => {
    let dataToWrite = data || '';

    try {
        if (typeof data !== 'string') {
            dataToWrite = JSON.stringify(data);
        }

        if (withComma) {
            dataToWrite += ',';
        }

        if (prefix) {
            dataToWrite = prefix + dataToWrite;
        }

        if (suffix) {
            dataToWrite = dataToWrite + suffix;
        }

        await RNFS.write(
            `${FILES_PATH}/${fileName}.json`,
            dataToWrite,
            undefined,
            'utf8',
        );
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - appendDataToFile ===]', error);
    }
};

export const removeFile = async (fileName: string) => {
    try {
        const filepath = `${FILES_PATH}/${fileName}.json`;
        await RNFS.unlink(filepath);
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - removeFile ===]', error);
    }
};

export const createRootDir = async () => {
    await RNFS.mkdir(FILES_PATH);
};

export const getISODateString = () => {
    return new Date().toISOString();
};
