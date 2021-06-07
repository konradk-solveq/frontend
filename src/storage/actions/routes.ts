import {AppThunk} from '../thunk';

import {I18n} from '../../../I18n/I18n';
import {CurrentRouteI, RoutesI, RoutesState} from '../reducers/routes';
import * as actionTypes from './actionTypes';
import {routesDataToPersist} from '../../utils/transformData';
import {LocationDataI} from '../../interfaces/geolocation';

import logger from '../../utils/crashlytics';
import {syncRouteData} from '../../services';
import {fetchPrivateMapsList, setPrivateMapId} from './maps';
import {
    toTimestamp,
} from '../../utils/persistLocationData';

export const clearError = () => ({
    type: actionTypes.CLEAR_ROUTES_ERROR,
});

export const setLoadingState = (state: boolean) => ({
    type: actionTypes.SET_ROUTES_LOADING_STATE,
    state: state,
});

export const setError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_ROUTES_ERROR,
    error: error,
    statusCode: statusCode,
});

export const setCurrentRoute = (currentRoute?: Partial<CurrentRouteI>) => ({
    type: actionTypes.SET_CURRENT_ROUTE,
    currentRoute: currentRoute,
});

export const setCurrentRouteData = (currentRouteData: LocationDataI[]) => ({
    type: actionTypes.SET_CURRENT_ROUTE_DATA,
    currentRouteData: currentRouteData,
});

export const setAverageSpeed = (averageSpeed: number) => ({
    type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    averageSpeed: averageSpeed,
});

export const setRoutesData = (
    routes: RoutesI | RoutesI[],
    refresh?: boolean,
) => ({
    type: actionTypes.SET_ROUTES_DATA,
    routes: routes,
    refresh: refresh,
});

export const setRouteToSynch = (routeId: string) => ({
    type: actionTypes.SET_ROUTE_TO_SYNC,
    routeId: routeId,
});

export const setRoutesToSynch = (routeIds: string[]) => ({
    type: actionTypes.SET_ROUTES_TO_SYNC,
    routeIds: routeIds,
});

export const clearRoutesToSynch = (routeIds: string[]) => ({
    type: actionTypes.CLEAR_ROUTES_TO_SYNC,
    ids: routeIds,
});

export const clearCurrentRouteData = () => ({
    type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
});

export const clearAverageSpeed = () => ({
    type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
});

export const stopCurrentRoute = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute} = getState().routes;

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            isActive: false,
            endedAt: new Date(),
        };

        dispatch(setCurrentRoute(currentRouteToEnd));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[stopCurrentRoute]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const persistCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute, currentRouteData}: RoutesState = getState().routes;

        const currRoutes = await routesDataToPersist(
            toTimestamp(currentRoute.startedAt, true),
            currentRouteData,
            toTimestamp(currentRoute.endedAt),
        );

        if (!currRoutes) {
            dispatch(setError('Error on persisting locations', 500));
        }

        dispatch(setCurrentRouteData(currRoutes));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[persistCurrentRouteData]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const addRoutesToSynchQueue = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute, currentRouteData}: RoutesState = getState().routes;

        /* If fail add to queue. Resolve in different action. */
        dispatch(clearCurrentRouteData());
        dispatch(clearAverageSpeed());
        dispatch(setRouteToSynch(currentRoute.id));
        dispatch(setRoutesData({id: currentRoute.id, route: currentRouteData}));

        dispatch(setError(I18n.t('dataAction.dataSyncError'), 500));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[addRoutesToSynchQueue]');
        logger.recordError(error);
        console.log(error);
        const errorMessage = I18n.t('dataAction.apiError');

        const {currentRoute, currentRouteData}: RoutesState = getState().routes;
        dispatch(clearCurrentRouteData());
        dispatch(clearAverageSpeed());
        dispatch(setRouteToSynch(currentRoute.id));
        dispatch(setRoutesData({id: currentRoute.id, route: currentRouteData}));

        dispatch(setError(errorMessage, 500));
    }
};

export const syncCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRouteData}: RoutesState = getState().routes;

        const response = await syncRouteData(currentRouteData);

        if (response.error || !response?.data?.id) {
            let errorMessage = response.error;

            /* If fail add to queue. Resolve tasks queue in different action. */
            if (
                currentRouteData?.length >= 10 &&
                currentRouteData?.[currentRouteData?.length - 1].odometer >=
                    200 &&
                response.status !== 400
            ) {
                dispatch(addRoutesToSynchQueue());
            } else {
                dispatch(clearCurrentRouteData());
                dispatch(clearAverageSpeed());
            }

            dispatch(setError(errorMessage, response.status));
            return;
        }

        dispatch(setPrivateMapId(response.data.id));
        dispatch(clearCurrentRouteData());
        dispatch(clearAverageSpeed());
        dispatch(setLoadingState(false));
        dispatch(fetchPrivateMapsList());
    } catch (error) {
        logger.log('[syncCurrentRouteData]');
        logger.recordError(error);

        dispatch(addRoutesToSynchQueue());
    }
};

export const syncRouteDataFromQueue = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {routesToSync, routes}: RoutesState = getState().routes;

        if (!routesToSync?.length) {
            dispatch(setLoadingState(false));
            return;
        }

        let newRoutes: RoutesI[] = [...routes];
        let newRoutesToSync: string[] = [...routesToSync];
        routesToSync.forEach(async (id: string) => {
            const routeToSync = routes.find((r: RoutesI) => r.id === id);
            if (!routeToSync || routeToSync?.route?.length < 10) {
                newRoutesToSync = newRoutesToSync.filter(rs => rs !== id);
                return;
            }

            const response = await syncRouteData(routeToSync.route);

            if (response.error || !response?.data?.id) {
                return;
            }

            newRoutesToSync = newRoutesToSync.filter(rs => rs !== id);
            newRoutes = newRoutes.filter(r => r.id !== id);
        });

        dispatch(setRoutesToSynch(newRoutesToSync));
        dispatch(setRoutesData(newRoutes, true));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[syncRouteDataFromQueue]');
        logger.recordError(error);

        dispatch(addRoutesToSynchQueue());
    }
};
