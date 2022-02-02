import {AppThunk} from '@storage/thunk';
import * as actionTypes from '@storage/actions/actionTypes';

import {getUiTranslationService} from '@services/index';
import i18next from '@translations/i18next';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

import {batch} from 'react-redux';

import {setSyncStatus, setSyncError} from './app';

export const setUiTranslation = (translations: any) => {
    return {
        type: actionTypes.SET_UI_TRANSLATION,
        translations: translations,
    };
};

export const fetchUiTranslation = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    if (!noLoader) {
        dispatch(setSyncStatus(true));
    }
    try {
        const response = await getUiTranslationService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        batch(() => {
            dispatch(setUiTranslation(response.data));
        });

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