import * as actionTypes from '@storage/actions/actionTypes';
import {SessionDataType} from '@interfaces/api';

export const setAuthDataSessionData = (sessionData: SessionDataType) => ({
    type: actionTypes.SET_AUTHENTICATION_SESSION_DATA,
    sessionData: sessionData,
});

export const setAuthData = (
    userId: string,
    deviceToken: string,
    recoveryCodes: string[],
) => ({
    type: actionTypes.SET_AUTHENTICATION_DATA,
    userId: userId,
    deviceToken: deviceToken,
    recoveryCodes: recoveryCodes,
});

export const clearAuthDataSessionData = () => ({
    type: actionTypes.CLEAR_AUTHENTICATION_SESSION_DATA,
});
