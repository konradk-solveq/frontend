import {AppThunk} from '../thunk';

import {I18n} from '../../../I18n/I18n';
import {CurrentRouteI, RoutesI, RoutesState} from '../reducers/routes';
import * as actionTypes from './actionTypes';
import {routesDataToPersist} from '../../utils/transformData';
import {LocationDataI} from '../../interfaces/geolocation';

import logger from '../../utils/crashlytics';
import {syncRouteData} from '../../services';
import {addMapData} from './maps';

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

export const setRoutesData = (routes: RoutesI) => ({
    type: actionTypes.SET_ROUTES_DATA,
    routes: routes,
});

export const setRouteToSynch = (routeId: string) => ({
    type: actionTypes.SET_ROUTE_TO_SYNC,
    routeId: routeId,
});

export const clearRoutesToSynch = (routeIds: string[]) => ({
    type: actionTypes.CLEAR_ROUTES_TO_SYNC,
    ids: routeIds,
});

export const clearCurrentRouteData = () => ({
    type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
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
        const {currentRouteData}: RoutesState = getState().routes;

        const lastDate =
            currentRouteData?.[currentRouteData.length - 1]?.timestamp;
        const lastTimestamp = lastDate ? Date.parse(lastDate) : 0;
        const currRoutes = await routesDataToPersist(
            lastTimestamp,
            currentRouteData,
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
            if (!response?.data?.id) {
                errorMessage = I18n.t('dataAction.dataSyncError');
            }

            /* If fail add to queue. Resolve tasks queue in different action. */
            dispatch(addRoutesToSynchQueue());

            dispatch(setError(errorMessage, response.status));
            return;
        }

        dispatch(addMapData(response.data, response.data.id));
        dispatch(clearCurrentRouteData());
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[syncCurrentRouteData]');
        logger.recordError(error);

        dispatch(addRoutesToSynchQueue());
    }
};
