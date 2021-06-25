import {AppThunk} from '../thunk';
import * as actionTypes from './actionTypes';
import {
    fetchGenericBikeData,
    setBikesListByFrameNumbers,
    fetchMapsList,
    syncRouteDataFromQueue,
    fetchPrivateMapsList,
} from './index';
import {AppConfigI} from '../../models/config.model';

import logger from '../../utils/crashlytics';
import {I18n} from '../../../I18n/I18n';
import {getAppConfigService} from '../../services';
import {convertToApiError} from '../../utils/apiDataTransform/communicationError';
import {fetchPlannedMapsList} from './maps';
import {
    RegulationType,
    TermsAndConditionsType,
} from '../../models/regulations.model';
import {
    getAppTermsAndConditionsService,
    getNewRegulationsService,
} from '../../services';
import {AppState} from '../reducers/app';

export const setAppStatus = (status: boolean) => ({
    type: actionTypes.SET_APP_NETWORK_STATUS,
    isOffline: status,
});

export const setAppConfig = (config: AppConfigI) => ({
    type: actionTypes.SET_APP_CONFIG,
    config: config,
});

export const setAppTerms = (terms: TermsAndConditionsType[]) => ({
    type: actionTypes.SET_APP_TERMS,
    terms: terms,
});

export const setAppShowedRegulationsNumber = (showedRegulations: number) => ({
    type: actionTypes.SET_APP_SHOWED_TERMS_VERSION,
    showedRegulations: showedRegulations,
});

export const setAppCurrentTerms = (currentTerms: TermsAndConditionsType) => ({
    type: actionTypes.SET_APP_CURRENT_TERMS,
    currentTerms: currentTerms,
});

export const setAppRegulation = (regulation: {
    regulation1: RegulationType | null;
    regulation2: RegulationType | null;
}) => {
    return {
        type: actionTypes.SET_APP_REGULATION,
        regulation: regulation,
    };
};

export const setAppPolicy = (policy: {
    policy1: RegulationType | null;
    policy2: RegulationType | null;
}) => ({
    type: actionTypes.SET_APP_POLICY,
    policy: policy,
});

export const setSyncStatus = (status: boolean) => ({
    type: actionTypes.SET_SYNC_APP_DATA_STATUS,
    status: status,
});

export const setSyncError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_SYNC_APP_SYNC_ERROR,
    error: error,
    statusCode: statusCode,
});

export const clearAppError = () => ({
    type: actionTypes.CLEAR_APP_ERROR,
});

export const fetchAppConfig = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    if (!noLoader) {
        dispatch(setAppStatus(true));
    }
    try {
        const response = await getAppConfigService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }

        dispatch(setAppConfig(response.data));
        dispatch(clearAppError());
        if (!noLoader) {
            dispatch(setAppStatus(false));
        }
    } catch (error) {
        logger.log('[fetchAppConfig]');
        const err = convertToApiError(error);
        logger.recordError(err);

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};

export const appSyncData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setSyncStatus(true));
    try {
        const {showedRegulations} = getState().app;
        const {sessionData} = getState().auth;
        const {onboardingFinished} = getState().user;

        await dispatch(fetchAppRegulations(true));
        await dispatch(fetchAppConfig(true));

        if (onboardingFinished && showedRegulations) {
            await dispatch(fetchMapsList());
        }

        if (sessionData?.access_token) {
            dispatch(fetchPrivateMapsList());
            dispatch(fetchPlannedMapsList());
        }

        if (onboardingFinished) {
            dispatch(fetchGenericBikeData());
            dispatch(setBikesListByFrameNumbers());
        }

        if (sessionData?.access_token) {
            dispatch(syncRouteDataFromQueue());
        }

        dispatch(setSyncStatus(false));
    } catch (error) {
        logger.log('[appSyncData]');
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');

        dispatch(setSyncError(errorMessage, 500));
    }
};

export const fetchAppRegulations = (
    noLoader?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    if (!noLoader) {
        dispatch(setAppStatus(true));
    }
    try {
        const {terms, currentTerms} = getState().app;
        const response = await getAppTermsAndConditionsService();

        if (response.error || response.status >= 400 || !response.data) {
            dispatch(setSyncError(response.error, response.status));
            return;
        }
        dispatch(setAppTerms(response.data));

        const newTerms = response.data;
        let currVersion =
            currentTerms.version || terms?.[terms?.length - 2]?.version;

        /* TODO: temp solution */
        if (!currVersion) {
            currVersion = newTerms?.[newTerms?.length - 2]?.version;
        }

        const newestVersion =
            newTerms?.[newTerms?.length - 1]?.version ||
            terms?.[terms?.length - 1]?.version;

        if (currVersion && newestVersion) {
            const newRegulations = await getNewRegulationsService(
                currVersion,
                newestVersion,
            );
            if (
                newRegulations.error?.trim() ||
                newRegulations.status >= 400 ||
                !newRegulations.data?.regulation?.regulation1 ||
                !newRegulations.data?.policy?.policy1
            ) {
                dispatch(
                    setSyncError(newRegulations.error, newRegulations.status),
                );
                return;
            }

            dispatch(setAppRegulation(newRegulations.data.regulation));
            dispatch(setAppPolicy(newRegulations.data.policy));
        }

        dispatch(clearAppError());
        if (!noLoader) {
            dispatch(setAppStatus(false));
        }
    } catch (error) {
        logger.log('[fetchAppRegulations]');
        console.log('fetchAppRegulations', error);
        const err = convertToApiError(error);
        logger.recordError(err);

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setSyncError(errorMessage, 500));
    }
};
