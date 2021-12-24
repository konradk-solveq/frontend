import {batch} from 'react-redux';
import {AppThunk} from '@storage/thunk';
import * as actionTypes from '@storage/actions/actionTypes';

import {
    registerMobileDevice,
    logInMobileService,
    checkSessionAndRecreateIfNeededService,
    logOutService,
    logInService,
} from '@services';
import {I18n} from '@translations/I18n';
import {setAutorizationHeader, setUserAgentHeader} from '@api/api';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {API_URL} from '@env';
import {loggErrorWithScope, sentryLogLevel} from '@sentryLogger/sentryLogger';
import {AppDispatch} from '@hooks/redux';
import {AuthState} from '@storage/reducers/auth';
import {AppState} from '@storage/reducers/app';
import {setAuthData, setAuthDataSessionData} from './authData';
import {AuthDataState} from '@storage/reducers/authData';
import {UserAuthStateT} from '@type/auth';
import {LoginFormDataResult} from '@interfaces/form';

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

export const setAuthorizationState = (
    authState?: UserAuthStateT,
    isAuth?: boolean,
) => ({
    type: actionTypes.SET_AUTH_STATE,
    authState: authState,
    isAuth: isAuth,
});

export const clearAuthorizationStateState = () => ({
    type: actionTypes.SET_NO_AUTH_STATE,
});

export const setLogoutUser = () => ({
    type: actionTypes.LOGOUT_USER,
});

const setSyncState = (
    dispatch: AppDispatch,
    state: boolean,
    skip?: boolean,
) => {
    if (!skip) {
        dispatch(setAuthSyncState(state));
    }
};

export const register = (
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    setSyncState(dispatch, true, skipLoadingState);
    try {
        const response = await registerMobileDevice();

        if (response.error || !response.data) {
            dispatch(setAuthError(response.error, response.status));
            return;
        }

        batch(() => {
            dispatch(clearAuthError());
            dispatch(
                setAuthData(
                    response.data.userId,
                    response.data.deviceToken,
                    response.data.recoveryCodes,
                ),
            );
            dispatch(setAuthorizationState('mobile', false));
        });

        setSyncState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[register] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'register');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
        dispatch(clearAuthorizationStateState());
    }
};

export const logIn = (
    data: LoginFormDataResult,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    setSyncState(dispatch, true, skipLoadingState);
    try {
        const response = await logInService(
            data.email.trim(),
            data.password.trim(),
        );
        if (response.error || !response.data) {
            dispatch(setAuthError(response.error, response.status));
            return;
        }

        setUserAgentHeader();
        setAutorizationHeader(response.data.access_token);

        batch(() => {
            dispatch(clearAuthError());
            dispatch(setAuthDataSessionData(response.data)); // change to store in secure datas
            dispatch(setAuthorizationState('authenticated'));
        });

        setSyncState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[logIn] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'logIn');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
        dispatch(clearAuthorizationStateState());
    }
};

export const mobileLogIn = (
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setSyncState(dispatch, true, skipLoadingState);
    try {
        const {userId, deviceToken}: AuthDataState = getState().authData;
        const response = await logInMobileService(userId, deviceToken);

        if (response.error || !response.data) {
            dispatch(setAuthError(response.error, response.status));
            return;
        }

        setUserAgentHeader();
        setAutorizationHeader(response.data.access_token);

        batch(() => {
            dispatch(clearAuthError());
            dispatch(setAuthDataSessionData(response.data));
            dispatch(setAuthorizationState());
        });

        setSyncState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[mobileLogIn] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'mobileLogIn');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
        dispatch(clearAuthorizationStateState());
    }
};

export const checkSession = (
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setSyncState(dispatch, true, skipLoadingState);
    try {
        const {isOffline, internetConnectionInfo} = getState().app;
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        const {userAuthState}: AuthState = getState().auth;
        const {
            userId,
            deviceToken,
            sessionData,
        }: AuthDataState = getState().authData;
        const token: string = sessionData?.access_token;
        const expirationDate = sessionData?.expiration_date;
        const refreshToken: string = sessionData?.refresh_token;

        if (!token || !expirationDate || !refreshToken) {
            if (userAuthState === 'mobile') {
                dispatch(mobileLogIn());
                return;
            }
        }

        const response = await checkSessionAndRecreateIfNeededService(
            userId,
            deviceToken,
            token,
            expirationDate,
            refreshToken,
            userAuthState !== 'mobile',
        );

        if (response.error || !response.data) {
            /**
             * Mobile registration and login process are silent to user.
             * Error can be shown conditionally
             */
            if (userAuthState === 'authenticated') {
                dispatch(setAuthError(response.error, response.status));
            }
            console.error(`[checkSession] - ${response.error}`);
            const error = new Error(
                `[checkSession] - an error occured. Cannot refresh session data or re-login. - ${API_URL}`,
            );

            loggErrorWithScope(
                error,
                'checkSession',
                undefined,
                sentryLogLevel.Log,
            );

            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        /* Check if stale */
        if (response.status === 304) {
            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        /* Refresh session token if needed */
        if (refreshToken !== response.data?.refresh_token) {
            setUserAgentHeader();
            setAutorizationHeader(response.data.access_token);

            batch(() => {
                dispatch(clearAuthError());
                dispatch(setAuthDataSessionData(response.data));
                dispatch(setAuthorizationState());
            });
            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        setSyncState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[checkSession] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'checkSession');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
    }
};

export const logOut = (
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setSyncState(dispatch, true, skipLoadingState);
    try {
        const {isOffline, internetConnectionInfo}: AppState = getState().app;
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setAuthError(I18n.t('dataAction.noInternetConnection'), 500),
            );
            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        const {userAuthState}: AuthState = getState().auth;
        if (userAuthState === 'uknown' || userAuthState === 'loggedout') {
            setSyncState(dispatch, false, skipLoadingState);
            return;
        }

        const response = await logOutService();

        if (response.error) {
            const trans: any = I18n.t('Profile.auth');
            dispatch(setAuthError(trans.error, response.status));
            loggErrorWithScope(response.error, 'logOut');
            return;
        }

        dispatch(setLogoutUser());

        setSyncState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[logOut] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'logOut');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setAuthError(errorMessage, 500));
    }
};
