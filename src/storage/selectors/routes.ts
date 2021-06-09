import {createSelector} from 'reselect';
import {LocationDataI} from '../../interfaces/geolocation';
import {RoutesI} from '../reducers/routes';
import {RootState} from '../storage';

export const trackerFollowedRouteIdSelector = (
    state: RootState,
): string | undefined => state.routes.currentRoute.routeId;

export const trackerActiveSelector = (state: RootState): boolean =>
    state.routes.currentRoute.isActive;

export const trackerStartTimeSelector = (state: RootState): Date =>
    new Date(state.routes.currentRoute.startedAt);

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
