import {AppThunk} from '@storage/thunk';
import * as actionTypes from '@storage/actions/actionTypes';

import {
    getUiTranslationService,
    getLanguagesListService,
} from '@services/index';
import i18next from '@translations/i18next';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

import {batch} from 'react-redux';

import {setSyncStatus, setSyncError} from './app';

const setUiTranslation = (translations: any) => {
    return {
        type: actionTypes.SET_UI_TRANSLATION,
        translations,
    };
};

export const fetchUiTranslation = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const response = await getUiTranslationService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        const newTranslations: any = {};
        const lang = response?.data?.code // reductor
            ? response?.data?.code
            : response?.data?.language;
        if (lang) {
            newTranslations[lang] = response?.data?.translation;
            newTranslations[lang].ForApplication = {
                version: response?.data?.version,
            };
        }

        const oldTranslations = getState().uiTranslation.translations;
        for (const key in newTranslations) {
            oldTranslations[key] = newTranslations[key];
        }

        dispatch(setUiTranslation(oldTranslations));

        if (!noLoader) {
            dispatch(setSyncStatus(false));
        }
    } catch (error) {
        console.log(`[fetchUiTranslation] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchUiTranslation');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};

const getLanguagesList = (languagesList: any) => {
    return {
        type: actionTypes.GET_LANGUAGES_LIST,
        languagesList,
    };
};

export const fetchLanguagesList = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const response = await getLanguagesListService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        // console.log('Languages List', response.data);
        dispatch(getLanguagesList(response.data));

        if (!noLoader) {
            dispatch(setSyncStatus(false));
        }
    } catch (error) {
        console.log(`[fetchLanguagesList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchLanguagesList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};
