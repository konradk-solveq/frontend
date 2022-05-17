import * as actionTypes from '@storage/actions/actionTypes';

export const missingControlSumActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_TRANSLATION_CONTROL_SUM,
        translationControlSum: 'controlSum',
    },
    {
        translations: {
            code: {
                controlSum: 'controlSum',
                translation: {},
                version: 'version',
            },
        },
        type: 'SET_UI_TRANSLATION',
    },
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: false,
    },
];

export const theSameControlSumsActions = [
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: true,
    },
    {
        type: actionTypes.SET_SYNC_APP_DATA_STATUS,
        status: false,
    },
];
