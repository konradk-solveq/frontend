import {LocationDataI} from '@interfaces/geolocation';
import {RoutesI} from '@storage/reducers/routes';
import {RootState} from '@storage/storage';

export const trackerFollowedRouteIdSelector = (state: RootState): string =>
    state.routes.currentRoute.routeId;

export const trackerRouteIdSelector = (state: RootState): string | undefined =>
    state.routes.currentRoute.id;

export const trackerActiveSelector = (state: RootState): boolean =>
    state.routes.currentRoute.isActive;

export const trackerStartTimeSelector = (state: RootState): Date | undefined =>
    state.routes.currentRoute.startedAt
        ? new Date(state.routes.currentRoute.startedAt)
        : undefined;

export const trackerPauseTimeSelector = (state: RootState): number =>
    state.routes.currentRoute.pauseTime;

export const trackerLoadingSelector = (state: RootState): boolean =>
    state.routes.loading;

export const trackerErrorSelector = (
    state: RootState,
): {message: string; statusCode: number} => ({
    message: state.routes.error,
    statusCode: state.routes.statusCode,
});

export const trackerRoutesToSyncSelector = (state: RootState): string[] =>
    state.routes.routesToSync;

export const trackerRoutesDataSelector = (state: RootState): RoutesI[] =>
    state.routes.routes;

export const trackerCurrentRoutesDataSelector = (
    state: RootState,
): LocationDataI[] => state.routes.currentRouteData;

export const trackerCurrentRouteAverrageSpeedSelector = (
    state: RootState,
): number => state.routes.averageSpeed;

export const trackerMapVisibilitySelector = (state: RootState): boolean =>
    state.routes.isMapVisible;
