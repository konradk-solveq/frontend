import * as actionTypes from '@storage/actions/actionTypes';
import i18next from '@translations/i18next';

export const authenticateUserWhenOfflineAndExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_AUTH_ERROR,
        error: i18next.t('dataAction.noInternetConnection'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];

export const authenticateUserWhenOnlineAndExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_AUTH_ERROR,
        error: i18next.t('Profile.auth.error'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];

export const authenticateUserWhenOnlineSecondCaseExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.LOGOUT_USER,
    },
];

export const authenticateUserWhenOnlineThirdCaseExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];

export const authenticateUserWhenOnlineFourthCaseExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_AUTH_ERROR,
        error: i18next.t('Profile.auth.error'),
        statusCode: 400,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];

export const userRegistrationFirstCaseExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_AUTH_ERROR,
    },
    {
        type: actionTypes.SET_AUTH_STATE,
        authState: 'mobile',
        isAuth: false,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];

export const userRegistrationSecondCaseExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_AUTH_ERROR,
    },
    {
        type: actionTypes.SET_AUTHENTICATION_DATA,
        userId: 'test-user-id',
        deviceToken: 'test-device-token',
        recoveryCodes: ['1', '2', '3'],
    },
    {
        type: actionTypes.SET_AUTH_STATE,
        authState: 'mobile',
        isAuth: false,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];
