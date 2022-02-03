import {getUiTranslation, getLanguagesList} from '@api';

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

    const obj: any = {};
    obj[response.data.language] = response.data.translation;

    return {
        data: obj,
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
        data: response.data,
        status: response.status,
        error: '',
    };
};
