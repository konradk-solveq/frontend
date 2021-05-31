import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import * as actionTypes from '../actions/actionTypes';

import {AppConfigI} from '../../models/config.model';

export interface AppState {
    isOffline: boolean;
    sync: boolean;
    error: string;
    statusCode: number;
    config: AppConfigI;
}

const initialState: AppState = {
    isOffline: false,
    sync: false,
    error: '',
    statusCode: 200,
    config: {
        name: '',
        lang: '',
        langs: {name: '', displayName: ''},
        difficulties: [],
        surfaces: [],
        tags: [],
    },
};

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_APP_NETWORK_STATUS:
            return {
                ...state,
                isOffline: action.status,
            };
        case actionTypes.SET_APP_CONFIG:
            return {
                ...state,
                config: action.config,
            };
        case actionTypes.SET_SYNC_APP_DATA_STATUS:
            return {
                ...state,
                sync: action.status,
            };
        case actionTypes.SET_SYNC_APP_SYNC_ERROR:
            return {
                ...state,
                sync: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        case actionTypes.CLEAR_APP_ERROR:
            return {
                ...state,
                sync: false,
                error: '',
                statusCode: 200,
            };
    }
    return state;
};

const persistConfig = {
    key: 'app',
    storage: AsyncStorage,
    whitelist: ['config'],
    timeout: 20000,
};

export default persistReducer(persistConfig, appReducer);
