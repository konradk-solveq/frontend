import * as actionTypes from '@storage/actions/actionTypes';
import i18next from '@translations/i18next';

jest.mock('../../../../../I18n/i18next', () => ({
    t: (str: string) => {
        return `${str}`;
    },
}));

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
        // error: i18next.t('Profile.auth.error'),
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
        // error: i18next.t('Profile.auth.error'),
        statusCode: 400,
    },
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: false,
    },
];
