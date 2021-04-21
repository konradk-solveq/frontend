import * as actionTypes from './actionTypes';

export const setAppStatus = (status: boolean) => ({
    type: actionTypes.SET_APP_NETWORK_STATUS,
    isOffline: status,
});
