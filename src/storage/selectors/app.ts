import {createSelector} from 'reselect';
import {OptionType} from '../../interfaces/form';
import {SelectOptionType} from '../../models/map.model';
import {FaqType} from '../../models/regulations.model';
import {RootState} from '../storage';

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

export const mapOptionsAndTagsSelector = (state: RootState): OptionType => ({
    tags: state.app.config.tags,
    difficulties: state.app.config.difficulties,
    surfaces: state.app.config.surfaces,
});

export const faqDataSelector = (state: RootState): FaqType[] => state.app.faq;

export const showedLocationInfoSelector = (state: RootState): boolean =>
    state.app.showedLocationInfo;
