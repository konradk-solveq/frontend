import {getUiTranslation, getLanguagesList} from '@api';
import {translationsT, languagesListT} from '@src/models/uiTranslation.models';

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
        data: <translationsT>response.data,
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
