import {AppThunk} from '../thunk';
import * as actionTypes from './actionTypes';
import {
    fetchGenericBikeData,
    setBikesListByFrameNumbers,
    fetchMapsList,
    syncRouteDataFromQueue,
} from './index';

import logger from '../../utils/crashlytics';
import {I18n} from '../../../I18n/I18n';

export const setAppStatus = (status: boolean) => ({
    type: actionTypes.SET_APP_NETWORK_STATUS,
    isOffline: status,
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

export const appSyncData = (): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setSyncStatus(true));
    try {
        await dispatch(fetchGenericBikeData());
        await dispatch(setBikesListByFrameNumbers());
        await dispatch(fetchMapsList());
        await dispatch(syncRouteDataFromQueue());

        dispatch(setSyncStatus(false));
    } catch (error) {
        logger.log('[appSyncData]');
        logger.recordError(error);
        console.log(error);
        const errorMessage = I18n.t('dataAction.apiError');

        dispatch(setSyncError(errorMessage, 500));
    }
};
