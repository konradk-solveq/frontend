import * as actionTypes from '@storage/actions/actionTypes';
import i18next from '@translations/i18next';
import {legalDocuments} from '@components/documents/__mocks__/legalDocuments';

export const getLegalDocumentsWhenOfflineExpectedActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_SYNC_APP_SYNC_ERROR,
        error: i18next.t('dataAction.noInternetConnection'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: false,
    },
];

export const getLegalDocumentsWhenOnlineAndErrorExpectedActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_SYNC_APP_SYNC_ERROR,
        error: i18next.t('dataAction.apiError'),
        statusCode: 500,
    },
];

export const getLegalDocumentsWhenOnlineAndNoDataExpectedActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_SYNC_APP_SYNC_ERROR,
        error: i18next.t('error'),
        statusCode: 200,
    },
];

export const getLegalDocumentsWhenOnlineAndSuccessExpectedActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_APP_REGULATION,
        regulation: legalDocuments.regulations,
    },
    {
        type: actionTypes.SET_APP_POLICY,
        policy: legalDocuments.policy,
    },
];
