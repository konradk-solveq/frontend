import {getUiTranslation, getLanguagesList, getControlSum} from '@api';
import {
    translationsResponseT,
    languagesListT,
    controlSumT,
} from '@models/uiTranslation.models';

export const getUiTranslationService = async () => {
    const response = await getUiTranslation();

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
        data: <translationsResponseT>response.data,
        status: response.status,
        error: '',
    };
};

export const getLanguagesListService = async () => {
    const response = await getLanguagesList();

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
        data: <languagesListT>response.data,
        status: response.status,
        error: '',
    };
};

export const getControlSumService = async () => {
    const response = await getControlSum();

    if (response.data?.statusCode >= 400 || response.status >= 400) {
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
        /** for no error and no data */
        data: response?.data
            ? <controlSumT>response.data
            : {controlSum: 'no_controlSum'},
        status: response.status,
        error: '',
    };
};
