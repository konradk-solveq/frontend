import {Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
    mkdir,
    unlink,
    write,
    writeFile,
    DownloadDirectoryPath,
    DocumentDirectoryPath,
} from 'react-native-fs';

import {GeneralDeviceT, RouteActionT} from '@type/debugRoute';
import {appendRouteDebuggInfoToFIle} from '@storage/actions/app';
import {AppDispatch} from '@storage/storage';
import {I18n} from '@translations/I18n';
import {getGeolocationLogs} from '../geolocation';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

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

const appName = DeviceInfo.getApplicationName();
const FILES_DIR = appName ? `${appName}_debug` : 'myKROSS_debug';

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
    try {
        await mkdir(FILES_PATH);
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - createRootDir ===]', error);
    }
};

export const removeDebugDir = async () => {
    try {
        await unlink(FILES_PATH);
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - removeDebugDir ===]', error);
    }
};

export const getISODateString = (date?: Date | string) => {
    let d = new Date().toISOString();

    try {
        if (date) {
            if (typeof date === 'string') {
                const nD = new Date(date);
                d = nD.toISOString();
            } else if (date instanceof Date) {
                d = date.toISOString();
            } else {
                d = `${date}`;
            }
        }
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - getISODateString ===]', error);
    } finally {
        return d;
    }
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

export const showRemoveFileAlert = async (
    rightActionCallback?: () => Promise<void>,
) => {
    const trans: any = I18n.t('DebugRoute.removeDirAlert');

    Alert.alert(trans.title, trans.message, [
        {
            text: trans.leftButton,
            onPress: () => {},
        },
        {
            text: trans.rightButton,
            onPress: async () =>
                rightActionCallback
                    ? await rightActionCallback()
                    : await removeDebugDir(),
        },
    ]);
};

export const getTitle = (data?: string) => {
    if (!data || typeof data !== 'string') {
        return;
    }

    const reg = new RegExp(':', 'g');
    return data?.replace(reg, '-');
};

const getTimeStringWithoutMilliseconds = (dateTime?: string) => {
    if (!dateTime) {
        return '';
    }

    let t = dateTime;
    try {
        const dt = dateTime?.split('.');
        if (dt?.[0]) {
            t = dt[0];
        }
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - getDateIOSString ===]', error);
    } finally {
        return t;
    }
};

export const getDateIOSStringAsTitle = (date?: Date | string) => {
    if (!date) {
        return '';
    }

    let t = '';
    try {
        if (typeof date === 'string') {
            t = getTimeStringWithoutMilliseconds(date);
        } else {
            const withoutMilliseconds = getTimeStringWithoutMilliseconds(
                date?.toISOString(),
            );
            if (withoutMilliseconds) {
                t = withoutMilliseconds;
            }
        }

        if (t) {
            t = getTitle(t) || '';
        }
    } catch (error) {
        console.error('[=== ROUTE DATA UTILS - getDateIOSString ===]', error);
    } finally {
        return t;
    }
};

/**
 * Add plugin logs into separate file
 */
export const writeGeolocationLogsToFileToFile = async (
    fileName: string,
    dates: {
        start?: Date;
        end?: Date;
    },
) => {
    const start = dates.start ? getISODateString(dates.start) : undefined;
    const end = getISODateString(dates.end);

    let dataToWrite = await getGeolocationLogs(start, end);

    if (!dataToWrite) {
        dataToWrite = `No data between dates [start]${dates.start} and [end]${dates.end}`;
    }

    try {
        if (typeof dataToWrite !== 'string') {
            dataToWrite = JSON.stringify(dataToWrite);
        }

        await writeFile(
            `${FILES_PATH}/logs_${fileName}.log`,
            dataToWrite,
            'utf8',
        );

        return dataToWrite;
    } catch (e) {
        console.error(
            '[=== ROUTE DATA UTILS - writeGeolocationLogsToFileToFile ===]',
            e,
        );

        loggErrorWithScope(
            e,
            'ROUTE DATA UTILS - writeGeolocationLogsToFileToFile',
        );
    }
};
