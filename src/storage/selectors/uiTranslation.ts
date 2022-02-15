import {RootState} from '@storage/storage';
import {translationsT, languagesListT} from '@models/uiTranslation.models';

export const translationsSelector = (state: RootState): translationsT =>
    state.uiTranslation.translations;

export const languagesListSelector = (state: RootState): languagesListT =>
    state.uiTranslation.languagesList;
