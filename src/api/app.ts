import {axiosGet} from './api';
import {convertToTimeoutError} from '../utils/apiDataTransform/timeoutError';

export const checkInternetConnectionQuality = async () => {
    return await axiosGet('https://clients3.google.com/generate_204', {
        timeout: 3000,
    }).catch(e => {
        return Promise.reject(convertToTimeoutError(e));
    });
};

export const getConfig = async () => {
    return await axiosGet('/application/config');
};

export const getFaq = async () => await axiosGet('/application/faq');

export const getLegalDocuments = async () =>
    await axiosGet('/publications/localized');

export const getAppNotification = async (lastNotificationDate?: Date) => {
    return await axiosGet(
        `/notifications/localized?lastLoginDate=${
            lastNotificationDate || new Date()
        }`,
    );
};

export const getNewAppVersion = async () => await axiosGet('/app-version');
