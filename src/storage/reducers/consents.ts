import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {Consent} from '@models/consents.model';

interface ConsentsState {
    consents: Consent[];
    error: string;
    loading: boolean;
}

const initialStateList: ConsentsState = {
    consents: [],
    error: '',
    loading: false,
};

const consentsReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.LOADING_CONSENTS_DATA: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.SET_CONSENTS_DATA: {
            return {
                ...state,
                error: '',
                consents: action.consents,
                loading: false,
            };
        }
        case actionTypes.SET_CONSENTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialStateList};
        }
    }

    return state;
};

const persistConfig = {
    key: 'consents',
    storage: AsyncStorage,
    whitelist: ['consents'],
    timeout: 20000,
};

export default persistReducer(persistConfig, consentsReducer);
