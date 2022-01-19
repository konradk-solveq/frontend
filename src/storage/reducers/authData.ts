import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';
import {authMigration} from '@storage/migration/migrateAuthToAuthDataInSecureStore';
import {SessionDataType} from '@interfaces/api';
import SecureStorage from '@utils/secureStorage/SecureStorage';

export interface AuthDataState {
    userId: string;
    deviceToken: string;
    recoveryCodes: string[];
    sessionData: SessionDataType;
}

const initialState: AuthDataState = {
    userId: '',
    deviceToken: '',
    recoveryCodes: [],
    sessionData: {
        access_token: '',
        refresh_token: '',
        expiration_date: undefined,
        expires_in: null,
        user: {id: '', email: ''},
    },
};

const authDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATION_DATA: {
            return {
                ...state,
                userId: action.userId,
                deviceToken: action.deviceToken,
                recoveryCodes: action.recoveryCodes,
            };
        }
        case actionTypes.SET_AUTHENTICATION_SESSION_DATA: {
            return {
                ...state,
                sessionData: action.sessionData,
            };
        }
        case actionTypes.CLEAR_AUTHENTICATION_SESSION_DATA: {
            return {
                ...state,
                sessionData: {...initialState.sessionData},
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialState};
        }
    }

    return state;
};

const persistConfig = {
    key: 'authData',
    storage: SecureStorage,
    version: 1,
    whitelist: ['userId', 'deviceToken', 'recoveryCodes', 'sessionData'],
    timeout: 20000,
    migrate: async (state: any) => {
        const newState = await authMigration(state);
        if (newState) {
            return Promise.resolve(newState);
        }
        return Promise.resolve(state);
    },
};

export default persistReducer(persistConfig, authDataReducer);
