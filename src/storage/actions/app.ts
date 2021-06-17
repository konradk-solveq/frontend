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
import { fetchPlannedMapsList } from './maps';

export const setAppStatus = (status: boolean) => ({
    type: actionTypes.SET_APP_NETWORK_STATUS,
    isOffline: status,
});

export const setAppConfig = (config: AppConfigI) => ({
    type: actionTypes.SET_APP_CONFIG,
    config: config,
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

export const appSyncData = (): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setSyncStatus(true));
    try {
        await dispatch(fetchAppConfig(true));

        await dispatch(fetchMapsList());
        dispatch(fetchPrivateMapsList());
        dispatch(fetchPlannedMapsList());
        dispatch(fetchGenericBikeData());
        dispatch(setBikesListByFrameNumbers());
        dispatch(syncRouteDataFromQueue());

        dispatch(setSyncStatus(false));
    } catch (error) {
        logger.log('[appSyncData]');
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');

        dispatch(setSyncError(errorMessage, 500));
    }
};
