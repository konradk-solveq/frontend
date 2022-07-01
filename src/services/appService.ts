import {
    getConfig,
    getTermsAndConditions,
    getRegulation,
    getPolicy,
    getFaq,
    checkInternetConnectionQuality,
} from '@api';
import {AppConfigI} from '@models/config.model';
import {
    AppVersionType,
    RegulationType,
    TermsAndConditionsType,
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

export const getAppTermsAndConditionsService = async () => {
    const response = await getTermsAndConditions();

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <TermsAndConditionsType[]>response.data,
        status: response.status,
        error: '',
    };
};

export const getRegulationService = async (regulationVersion: string) => {
    const response = await getRegulation(regulationVersion);

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
        data: <RegulationType>response.data,
        status: response.status,
        error: '',
    };
};

export const getPolicyService = async (policyVersion: string) => {
    const response = await getPolicy(policyVersion);

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
        data: <RegulationType>response.data,
        status: response.status,
        error: '',
    };
};

export const getNewRegulationsService = async (
    currentVersion: string,
    newestVersion: string,
) => {
    const responseRegulation1 = await getRegulationService(currentVersion);

    let status = responseRegulation1?.status;
    let errorMessage = responseRegulation1.error;

    const responseRegulation2 = await getRegulationService(newestVersion);
    status = responseRegulation2.status;
    errorMessage += ` ${responseRegulation2.error}`;

    const responsePolicy1 = await getPolicyService(currentVersion);
    status = responsePolicy1.status;
    errorMessage += ` ${responsePolicy1.error}`;

    const responsePolicy2 = await getPolicyService(newestVersion);
    status = responsePolicy2.status;
    errorMessage += ` ${responsePolicy2.error}`;

    return {
        data: {
            regulation: {
                regulation1: responseRegulation1.data,
                regulation2: responseRegulation2.data,
            },
            policy: {
                policy1: responsePolicy1.data,
                policy2: responsePolicy2.data,
            },
        },
        status: status,
        error: errorMessage,
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
