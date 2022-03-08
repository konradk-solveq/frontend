import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackType} from '@type/rootStack';
import * as actionTypes from '@storage/actions/actionTypes';

export interface DeepLinkingState {
    takeActionOnScreen?: keyof RootStackType;
}

const initialState: DeepLinkingState = {
    takeActionOnScreen: undefined,
};

const deepLinkingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_DEEP_LINKING_ACTION_FOR_SCREEN: {
            return {
                ...state,
                takeActionOnScreen: action.takeActionOnScreen,
            };
        }
        case actionTypes.CLEAR_DEEP_LINKING_ACTION_FOR_SCREEN: {
            return {
                ...state,
                takeActionOnScreen: undefined,
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialState};
        }
    }

    return state;
};

const persistConfig = {
    key: 'deepLinking',
    storage: AsyncStorage,
    timeout: 20000,
};

export default persistReducer(persistConfig, deepLinkingReducer);
