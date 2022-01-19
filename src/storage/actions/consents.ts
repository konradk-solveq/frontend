import i18next from '@translations/i18next';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {getConsentsList, putConsentsList} from '@services';
import {Consent} from '@models/consents.model';
import {PutUserConsentsDataT} from '@services/consentsService';

export const setConsentsData = (consents: Consent[]) => {
    return {
        type: actionTypes.SET_CONSENTS_DATA,
        consents: consents,
    };
};

const setLoadingState = (state: boolean) => ({
    type: actionTypes.LOADING_CONSENTS_DATA,
    state: state,
});

export const setError = (error: string) => ({
    type: actionTypes.SET_CONSENTS_ERROR,
    error: error,
});

export const fetchConsentsData = (): AppThunk<void> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getConsentsList();
        if (response.error || !response.data) {
            dispatch(setError(response.error));
        } else {
            dispatch(setConsentsData(response.data));
        }
    } catch (error) {
        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage));
    }
};

export const putConsentsData = (data: PutUserConsentsDataT): AppThunk<void> => {
    return async dispatch => {
        dispatch(setLoadingState(true));
        try {
            const response = await putConsentsList(data);
            if (response.error || !response.data) {
                dispatch(setError(response.error));
            } else {
                dispatch(setConsentsData(response.data));
            }
        } catch (error) {
            const errorMessage = i18next.t('dataAction.apiError');
            dispatch(setError(errorMessage));
        }
    };
};
