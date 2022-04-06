import {RootState} from '@storage/storage';
import {translationsT, languagesListT} from '@models/uiTranslation.models';
import {ControlSumsType, LangsType} from '@models/config.model';

export const translationsSelector = (state: RootState): translationsT =>
    state.uiTranslation?.translations;

export const languagesListSelector = (state: RootState): languagesListT =>
    state.uiTranslation?.languagesList;

export const codesListSelector = (state: RootState): LangsType[] =>
    state.app.config.langs;

export const translationsControlSumsSelector = (
    state: RootState,
): ControlSumsType[] => state.app.config?.uiTranslations?.controlSums || [];

export const translationsCodesSelector = (state: RootState): string[] =>
    state.app.config?.uiTranslations?.codes;
