import {PersistedState} from 'redux-persist/es/types';

import {AuthDataState} from '@storage/reducers/authData';
import {authDataMock} from './authenticationData';

export const mockedInitStateMock: PersistedState & AuthDataState = {
    _persist: {rehydrated: true, version: 0},
    deviceToken: '',
    recoveryCodes: [],
    sessionData: {
        access_token: '',
        refresh_token: '',
        expiration_date: undefined,
        expires_in: null,
        user: {
            id: '',
            email: '',
        },
    },
    userId: '',
};

export const mockedStateMock: PersistedState & AuthDataState = {
    ...authDataMock,
    _persist: {rehydrated: true, version: 0},
};
