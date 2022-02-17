import {RootState} from '@storage/storage';
import {translationsT, languagesListT} from '@models/uiTranslation.models';
import {ControlSumsT, LangsT} from '@models/config.model';

export const translationsSelector = (state: RootState): translationsT =>
    state.uiTranslation.translations;

export const languagesListSelector = (state: RootState): languagesListT =>
    state.uiTranslation.languagesList;

export const codesListSelector = (state: RootState): LangsT[] =>
    state.app.config.langs;

export const translationsControlSumsSelector = (
    state: RootState,
): ControlSumsT[] => state.app.config.uiTranslations.controlSums;

export const translationsCodesSelector = (state: RootState): string[] =>
    state.app.config.uiTranslations.codes;
