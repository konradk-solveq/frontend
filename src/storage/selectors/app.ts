import {createSelector} from 'reselect';

import {SelectOptionType} from '@models/map.model';
import {FaqType} from '@models/regulations.model';
import {BasicCoordsType} from '@type/coords';
import {RootState} from '@storage/storage';
import {InternetConnectionInfoType} from '@interfaces/internetConnection';
import {AppState} from '@storage/reducers/app';

export const appSelector = (state: RootState): AppState => state.app;

export const syncAppSelector = (state: RootState): boolean => state.app.sync;

export const isOnlineAppStatusSelector = (state: RootState): boolean =>
    !state.app.isOffline;

export const internetConnectionInfoSelector = (
    state: RootState,
): InternetConnectionInfoType => state.app.internetConnectionInfo;

export const isGoodConnectionQualitySelector = createSelector(
    internetConnectionInfoSelector,
    connection => connection.goodConnectionQuality,
);

export const appErrorMessageSelector = (state: RootState): string =>
    state.app.error;

export const appStatusCodeSelector = (state: RootState): string =>
    state.app.statusCode;

export const appErrorSelector = createSelector(
    appErrorMessageSelector,
    appStatusCodeSelector,
    (message, statusCode) => ({
        message,
        statusCode,
    }),
);

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

export const faqDataSelector = (state: RootState): FaqType[] => state.app.faq;

export const showedLocationInfoSelector = (state: RootState): boolean =>
    state.app.showedLocationInfo;

export const mapReactionsConfigSelector = (
    state: RootState,
): SelectOptionType[] => state.app.config.reactions;

export const globalLocationSelector = (
    state: RootState,
): BasicCoordsType | undefined => state.app.location;

export const routeDebugModeSelector = (state: RootState): boolean =>
    state.app.routeDebugMode;

export const isInitMapsDataSynchedSelector = (state: RootState): boolean =>
    state.app.initMapsDataSynched;

export const apiAuthHeaderStateSelector = (state: RootState): boolean =>
    state.app.apiAuthHeaderState;

export const appConfigSelector = createSelector(appSelector, a => a.config);

export const regulationsDataSelector = createSelector(
    appSelector,
    app => app.regulation,
);

export const privacyPolicyDataSelector = createSelector(
    appSelector,
    app => app.policy,
);

export const notificationDataSelector = createSelector(
    appSelector,
    app => app.notifications,
);

export const notificationDateSelector = createSelector(
    appSelector,
    app => app.notificationDate,
);

export const focusedOnRecordingScreenSelector = createSelector(
    appSelector,
    app => app.focusedOnRecordingScreen,
);

export const mapOptionsAndTagsSelector = createSelector(
    appConfigSelector,
    config => ({
        difficulties: config.difficulties,
        reactions: config.reactions,
        surfaces: config.surfaces,
        tags: config.tags,
    }),
);

export const heavyTaskProcessingSelector = createSelector(
    appSelector,
    app => app.heavyTaskProcessing,
);
