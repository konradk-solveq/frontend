import {AppThunk} from '@storage/thunk';
import * as actionTypes from '@storage/actions/actionTypes';

import {
    getUiTranslationService,
    getLanguagesListService,
} from '@services/index';
import i18next from '@translations/i18next';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

import {setSyncStatus, setSyncError} from './app';
import {languagesListT, translationsT} from '@models/uiTranslation.models';
import {convertTranslations} from '@helpers/uiTranslation';

export const setUiTranslation = (translations: translationsT) => {
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

        const code: string = response?.data?.code;
        const oldTranslations = getState().uiTranslation.translations;

        const newTranslations = convertTranslations(
            code,
            response.data,
            oldTranslations,
        );

        dispatch(setUiTranslation(newTranslations));

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

const getLanguagesList = (languagesList: languagesListT) => {
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
