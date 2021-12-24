import * as actionTypes from '@storage/actions/actionTypes';
import {I18n} from '@translations/I18n';

export const authenticateUserWhenOfflineAndExpectedActions = [
    {
        type: actionTypes.SET_AUTH_SYNC_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_AUTH_ERROR,
        error: I18n.t('dataAction.noInternetConnection'),
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
        error: I18n.t('Profile.auth.error'),
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
