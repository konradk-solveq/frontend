import {
    getConfig,
    getFaq,
    checkInternetConnectionQuality,
    getLegalDocuments,
    getAppNotification,
} from '@api';
import {AppConfigI} from '@models/config.model';
import {
    AppVersionType,
} from '../models/regulations.model';
import i18next from '@translations/i18next';
import TimeoutError from '@utils/apiDataTransform/timeoutError';
import {getNewAppVersion} from '@src/api';

export const checkInternetConnectionQualityService = async () => {
    try {
        const resp = await checkInternetConnectionQuality();

        return {
            data: '',
            status: resp.status === 204 ? 204 : 408,
            error: new Error(i18next.t('dataAction.noInternetConnection')),
        };
    } catch (error) {
        return {
            data: '',
            status: error instanceof TimeoutError ? 408 : 500,
            error: error,
        };
    }
};

export const getAppConfigService = async () => {
    const response = await getConfig();

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <AppConfigI>response.data,
        status: response.status,
        error: '',
    };
};

export const getLegalDocumentsService = async () => {
    const response = await getLegalDocuments();

    if (
        !response?.data ||
        response.data?.statusCode >= 400 ||
        response.status >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.status,
        error: '',
    };
};

export const getAppNotificationService = async (notificationDate?: Date) => {
    const response = await getAppNotification(notificationDate);

    if (
        !response?.data ||
        response.data?.statusCode >= 400 ||
        response.status >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.status,
        error: '',
    };
};

export const getFaqService = async () => {
    const response = await getFaq();

    if (
        !response?.data ||
        response.data?.statusCode >= 400 ||
        response.status >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {faq: response.data},
        status: response.status,
        error: '',
    };
};

export const getNewAppVersionService = async () => {
    const response = await getNewAppVersion();

    if (
        !response?.data ||
        response.data?.statusCode >= 400 ||
        response.status >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {appVersion: <AppVersionType>response.data},
        status: response.status,
        error: '',
    };
};
