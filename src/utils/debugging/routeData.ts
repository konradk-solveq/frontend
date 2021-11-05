import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
    mkdir,
    unlink,
    write,
    DownloadDirectoryPath,
    DocumentDirectoryPath,
} from 'react-native-fs';

import {GeneralDeviceT, RouteActionT} from '@type/debugRoute';
import {appendRouteDebuggInfoToFIle} from '@src/storage/actions/app';
import {AppDispatch} from '@src/storage/storage';

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
    Platform.OS === 'android' ? DownloadDirectoryPath : DocumentDirectoryPath;

const FILES_DIR = 'myKROSS_debug';

const FILES_PATH = `${DOCUMENT_DIR_PATH}/${FILES_DIR}`;

export const appendDataToFile = async (
    fileName: string,
    data: any,
    withComma?: boolean,
    prefix?: string,
    suffix?: string,
) => {
    if (!data) {
        return;
    }

    let dataToWrite = data;

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

        await write(
            `${FILES_PATH}/${fileName}.json`,
            dataToWrite,
            undefined,
            'utf8',
        );

        return dataToWrite;
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - appendDataToFile ===]', error);
    }
};

export const removeFile = async (fileName: string) => {
    try {
        const filepath = `${FILES_PATH}/${fileName}.json`;
        await unlink(filepath);
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - removeFile ===]', error);
    }
};

export const createRootDir = async () => {
    await mkdir(FILES_PATH);
};

export const getISODateString = () => {
    return new Date().toISOString();
};

/**
 * Fire route debug action to store data in json file
 *
 * @param dispatch
 * @param actionType
 * @param currentRouteId
 */
export const dispatchRouteDebugAction = (
    dispatch: AppDispatch,
    actionType: RouteActionT,
    currentRouteId?: string,
) => {
    if (currentRouteId) {
        dispatch(appendRouteDebuggInfoToFIle(currentRouteId, actionType));
    }
};
