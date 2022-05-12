import {AppThunk} from '@storage/thunk';
import * as actionTypes from '@storage/actions/actionTypes';

import {AppState} from '@storage/reducers/app';
import {UiTranslationState} from '@storage/reducers/uiTranslation';
import {checkIfControlSumChanged} from '@storage/actions/utils/app';
import {UserStateI} from '@storage/reducers/user';
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

export const setControlSum = (controlSum: string) => ({
    type: actionTypes.SET_TRANSLATION_CONTROL_SUM,
    translationControlSum: controlSum,
});

export const clearControlSum = () => ({
    type: actionTypes.CLEAR_TRANSLATION_CONTROL_SUM,
});

export const fetchUiTranslation = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const {config}: AppState = getState().app;
        const {controlSum}: UiTranslationState = getState().uiTranslation;
        const {language}: UserStateI = getState().user;

        const controlSumChanged = checkIfControlSumChanged(
            config.uiTranslations.controlSums,
            language ||
                config.lang /* In the first place take language from 'user' reducer wich is set from local data */,
            controlSum,
        );

        if (!controlSumChanged) {
            if (!noLoader) {
                dispatch(setSyncStatus(false));
            }
            return;
        }

        const response = await getUiTranslationService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        const code: string = response?.data?.code;
        const {translations}: UiTranslationState = getState().uiTranslation;

        const newTranslations = convertTranslations(
            code,
            response.data,
            translations,
        );

        /**
         * Set translation controSUm which will be used
         * to check if translation should be updated.
         */
        dispatch(setControlSum(response.data.controlSum));
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

const setLanguagesList = (languagesList: languagesListT) => ({
    type: actionTypes.SET_TRANSLATION_LANGUAGES_LIST,
    languagesList,
});

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

        dispatch(setLanguagesList(response.data));

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
