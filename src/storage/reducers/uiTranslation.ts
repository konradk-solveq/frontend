import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';

export interface UiTranslationState {
    translations: {};
    languagesList: [];
}

const initialState: UiTranslationState = {
    translations: {},
    languagesList: [],
};

const uiTranslationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_UI_TRANSLATION:
            return {
                ...state,
                translations: action.translations,
            };
        case actionTypes.GET_LANGUAGES_LIST:
            return {
                ...state,
                languagesList: action.languagesList,
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
