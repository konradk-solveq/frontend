import {AppThunk} from '../thunk';
import * as actionTypes from './actionTypes';

import {SessionDataType} from '../../interfaces/api';
import {
    registerMobileDevice,
    logInService,
    checkSessionAndRecreateIfNeededService,
} from '../../services';
import {I18n} from '../../../I18n/I18n';
import {setAutorizationHeader, setUserAgentHeader} from '../../api/api';
import {convertToApiError} from '../../utils/apiDataTransform/communicationError';
import {API_URL} from '@env';
import {loggErrorWithScope, sentryLogLevel} from '@sentryLogger/sentryLogger';

export const setAuthError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_AUTH_ERROR,
    error: error,
    statusCode: statusCode,
});

export const clearAuthError = () => ({
    type: actionTypes.CLEAR_AUTH_ERROR,
});

export const setAuthSyncState = (state: boolean) => ({
    type: actionTypes.SET_AUTH_SYNC_STATE,
    state: state,
});

export const setAuthData = (
    userId: string,
    deviceToken: string,
    recoveryCodes: string[],
) => ({
    type: actionTypes.SET_AUTH_DATA,
    userId: userId,
    deviceToken: deviceToken,
    recoveryCodes: recoveryCodes,
});

export const setAuthSessionData = (sessionData: SessionDataType) => ({
    type: actionTypes.SET_AUTH_SESSION_DATA,
    sessionData: sessionData,
});

export const setAuthorizationState = () => ({
    type: actionTypes.SET_AUTH_STATE,
});

export const clearAuthorizationStateState = () => ({
    type: actionTypes.SET_NO_AUTH_STATE,
});

export const register = (): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setAuthSyncState(true));
    try {
        const response = await registerMobileDevice();

        if (response.error || !response.data) {
            dispatch(setAuthError(response.error, response.status));
            return;
        }

        dispatch(clearAuthError());
        dispatch(
            setAuthData(
                response.data.userId,
                response.data.deviceToken,
                response.data.recoveryCodes,
            ),
        );
        dispatch(setAuthSyncState(false));
    } catch (error) {
        console.log(`[register] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'register');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
        dispatch(clearAuthorizationStateState());
    }
};

export const logIn = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setAuthSyncState(true));
    try {
        const {userId, deviceToken} = getState().auth;
        const response = await logInService(userId, deviceToken);

        if (response.error || !response.data) {
            dispatch(setAuthError(response.error, response.status));
            return;
        }

        setUserAgentHeader();
        setAutorizationHeader(response.data.access_token);
        dispatch(clearAuthError());
        dispatch(setAuthSessionData(response.data));
        dispatch(setAuthorizationState());
        dispatch(setAuthSyncState(false));
    } catch (error) {
        console.log(`[logIn] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'logIn');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
        dispatch(clearAuthorizationStateState());
    }
};

export const checkSession = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setAuthSyncState(true));
    try {
        const {isOffline, internetConnectionInfo} = getState().app;
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setAuthSyncState(false));
            return;
        }

        const {userId, deviceToken, sessionData} = getState().auth;
        const token: string = sessionData?.access_token;
        const expirationDate: Date = sessionData?.expiration_date;
        const refreshToken: string = sessionData?.refresh_token;

        if (!token || !expirationDate || !refreshToken) {
            dispatch(logIn());
            return;
        }

        const response = await checkSessionAndRecreateIfNeededService(
            userId,
            deviceToken,
            token,
            expirationDate,
            refreshToken,
        );

        if (response.error || !response.data) {
            /**
             * Registration and login process are silent to user.
             * So there is no way to show error, but maybe it should be
             * kept for future usage.
             */
            // dispatch(setAuthError(response.error, response.status));
            console.log(`[checkSession] - ${response.error}`);
            const error = new Error(
                `[checkSession] - an error occured. Cannot refresh session data or re-login. - ${API_URL}`,
            );

            loggErrorWithScope(
                error,
                'checkSession',
                undefined,
                sentryLogLevel.Log,
            );

            dispatch(setAuthSyncState(false));
            return;
        }

        /* Check if stale */
        if (response.status === 304) {
            dispatch(setAuthSyncState(false));
            return;
        }

        /* Refresh session token if needed */
        if (refreshToken !== response.data?.refresh_token) {
            setUserAgentHeader();
            setAutorizationHeader(response.data.access_token);
            dispatch(clearAuthError());
            dispatch(setAuthSessionData(response.data));
            dispatch(setAuthorizationState());
            dispatch(setAuthSyncState(false));
            return;
        }

        dispatch(setAuthSyncState(false));
    } catch (error) {
        console.log(`[checkSession] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'checkSession');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
    }
};
