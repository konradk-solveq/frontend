import {createSelector} from 'reselect';

import {SessionDataType} from '@interfaces/api';
import {RootState} from '@storage/storage';

export const isRegisteredSelector = (state: RootState): boolean =>
    !!state.authData.deviceToken && !!state.authData.userId;

export const userIdSelector = (state: RootState): string =>
    state.authData.userId;

export const authSessionDataSelector = (state: RootState): SessionDataType =>
    state.authData.sessionData;

export const authTokenSelector = createSelector(
    authSessionDataSelector,
    s => s.access_token,
);
