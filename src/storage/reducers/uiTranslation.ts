import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import * as actionTypes from '@storage/actions/actionTypes';
import {translationsT, languagesListT} from '@src/models/uiTranslation.models';

export interface UiTranslationState {
    translations: translationsT;
    languagesList: languagesListT;
    controlSum: string | undefined;
}

const initialState: UiTranslationState = {
    translations: {},
    languagesList: [],
    controlSum: undefined,
};

const uiTranslationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_UI_TRANSLATION:
            return {
                ...state,
                translations: action.translations,
            };
        case actionTypes.SET_TRANSLATION_LANGUAGES_LIST:
            return {
                ...state,
                languagesList: action.languagesList,
            };
        case actionTypes.SET_TRANSLATION_CONTROL_SUM:
            return {
                ...state,
                controlSum: action.translationControlSum,
            };
        case actionTypes.CLEAR_TRANSLATION_CONTROL_SUM:
            return {
                ...state,
                controlSum: undefined,
            };
    }
    return state;
};

const persistConfig = {
    key: 'uiTranslation',
    storage: AsyncStorage,
    whitelist: ['translations', 'languagesList', 'controlSum'],
    timeout: 20000,
};

export default persistReducer(persistConfig, uiTranslationReducer);
