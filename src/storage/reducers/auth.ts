import * as actionTypes from '../actions/actionTypes';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SessionDataType} from '../../interfaces/api';

interface AuthState {
    userId: string;
    deviceToken: string;
    recoveryCodes: string[];
    isAuth: boolean;
    sessionData: SessionDataType;
    error: string;
    statusCode: number;
    loading: boolean;
}

const initialState: AuthState = {
    userId: '',
    deviceToken: '',
    recoveryCodes: [],
    isAuth: false,
    sessionData: {
        access_token: '',
        refresh_token: '',
        expiration_date: undefined,
        expires_in: null,
        user: {id: '', email: ''},
    },
    error: '',
    statusCode: 200,
    loading: false,
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        }
        case actionTypes.CLEAR_AUTH_ERROR: {
            return {
                ...state,
                loading: false,
                error: '',
                statusCode: 200,
            };
        }
        case actionTypes.SET_AUTH_SYNC_STATE: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.SET_AUTH_DATA: {
            return {
                ...state,
                userId: action.userId,
                deviceToken: action.deviceToken,
                recoveryCodes: action.recoveryCodes,
            };
        }
        case actionTypes.SET_AUTH_SESSION_DATA: {
            return {
                ...state,
                sessionData: action.sessionData,
            };
        }
        case actionTypes.SET_AUTH_STATE: {
            return {
                ...state,
                isAuth: true,
            };
        }
        case actionTypes.SET_NO_AUTH_STATE: {
            return {
                ...state,
                isAuth: false,
            };
        }
    }

    return state;
};

const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: [
        'userId',
        'deviceToken',
        'recoveryCodes',
        'isAuth',
        'sessionData',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, authReducer);
