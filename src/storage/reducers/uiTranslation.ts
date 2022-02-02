import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';

export interface UiTranslationState {
    translations: {};
}

const initialState: UiTranslationState = {
    translations: {},
};

const uiTranslationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_UI_TRANSLATION:
            return {
                ...state,
                translations: action.translations,
            };
        case actionTypes.GET_UI_TRANSLATION:
            return {
                ...state,
            };
    }
    return state;
};

const persistConfig = {
    key: 'uiTranslation',
    storage: AsyncStorage,
    whitelist: ['translations'],
    timeout: 20000,
};

export default persistReducer(persistConfig, uiTranslationReducer);
