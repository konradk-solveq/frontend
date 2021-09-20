import {createSelector} from 'reselect';

import {SelectOptionType} from '@models/map.model';
import {FaqType} from '@models/regulations.model';
import {BasicCoordsType} from '@type/coords';
import {RootState} from '@storage/storage';
import {SelectEnumOptionsT} from '@src/models/config.model';

export const syncAppSelector = (state: RootState): boolean => state.app.sync;

export const isOnlineAppStatusSelector = (state: RootState): boolean =>
    !state.app.isOffline;

export const isGoodConnectionQualitySelector = (state: RootState): boolean =>
    state.app.internetConnectionInfo?.goodConnectionQuality;

export const appErrorSelector = (
    state: RootState,
): {message: string; statusCode: number} => ({
    message: state.app.error,
    statusCode: state.app.statusCode,
});

export const appNameSelector = (state: RootState): string =>
    state.app.config.name;

export const appLangSelector = (state: RootState): string =>
    state.app.config.lang;

export const mapTagsConfigSelector = (state: RootState): SelectOptionType[] =>
    state.app.config.tags;

export const mapDifficultiesConfigSelector = (
    state: RootState,
): SelectOptionType[] => state.app.config.difficulties;

export const mapSurfaceConfigSelector = (
    state: RootState,
): SelectOptionType[] => state.app.config.surface;

export const mapOptionsSelector = () => {
    return createSelector(
        mapDifficultiesConfigSelector,
        mapSurfaceConfigSelector,
        (d, s) => ({
            difficulties: d,
            surface: s,
        }),
    );
};

export const mapOptionsAndTagsSelector = (
    state: RootState,
): SelectEnumOptionsT => ({
    difficulties: state.app.config.difficulties,
    reactions: state.app.config.reactions,
    surfaces: state.app.config.surfaces,
    tags: state.app.config.tags,
});

export const faqDataSelector = (state: RootState): FaqType[] => state.app.faq;

export const showedLocationInfoSelector = (state: RootState): boolean =>
    state.app.showedLocationInfo;

export const mapReactionsConfigSelector = (
    state: RootState,
): SelectOptionType[] => state.app.config.reactions;

export const globalLocationSelector = (
    state: RootState,
): BasicCoordsType | undefined => state.app.location;
