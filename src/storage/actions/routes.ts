import {AppThunk} from '../thunk';

import {I18n} from '../../../I18n/I18n';
import {CurrentRouteI, RoutesI, RoutesState} from '../reducers/routes';
import * as actionTypes from './actionTypes';
import {routesDataToPersist} from '../../utils/transformData';
import {LocationDataI} from '../../interfaces/geolocation';
import {AppState} from '../reducers/app';
import {MapsState} from '../reducers/maps';
import {removeCeratedRouteIDService} from '../../services/routesService';

import logger from '../../utils/crashlytics';
import {createNewRouteService, syncRouteData} from '../../services';
import {fetchPrivateMapsList, setPrivateMapId} from './maps';
import {convertToApiError} from '../../utils/apiDataTransform/communicationError';
import {MIN_ROUTE_LENGTH} from '../../helpers/global';

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

export const setRemoteRouteId = (id: string) => ({
    type: actionTypes.SET_REMOTE_ROUTE_ID,
    remoteRouteId: id,
});

export const setCurrentRouteData = (currentRouteData: LocationDataI[]) => ({
    type: actionTypes.SET_CURRENT_ROUTE_DATA,
    currentRouteData: currentRouteData,
});

export const setCurrentRoutePauseTime = (pauseTime: number) => ({
    type: actionTypes.SET_CURRENT_ROUTE_PAUSE_TIME,
    pauseTime: pauseTime,
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

export const clearCurrentRouteData = (removeDuplicates?: boolean) => ({
    type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
    removeDuplicates: removeDuplicates,
});

export const clearCurrentRoute = (keepId?: boolean) => ({
    type: actionTypes.CLEAR_CURRENT_ROUTE,
    keepId: keepId,
});

export const clearAverageSpeed = () => ({
    type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
});

/**
 * Creates route ID in first step, because actions are asynch on backend side
 */
export const startRecordingRoute = (
    currRoute: CurrentRouteI,
    keep?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute} = getState().routes;
        const {totalPrivateMaps}: MapsState = getState().maps;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;
        let currentRouteToStore = {...currRoute};

        if (
            (!keep || !currentRoute?.remoteRouteId) &&
            !isOffline &&
            internetConnectionInfo?.goodConnectionQuality
        ) {
            const response = await createNewRouteService(totalPrivateMaps);

            if (response.error || !response?.data?.id) {
                let errorMessage = response.error;

                dispatch(setError(errorMessage, response.status));
                if (!response?.data?.id) {
                    currentRouteToStore = {
                        ...currentRouteToStore,
                        remoteRouteId: currRoute.id,
                    };
                    dispatch(
                        setCurrentRoute(keep ? undefined : currentRouteToStore),
                    );
                    dispatch(setLoadingState(false));
                }
                return;
            }
            currentRouteToStore = {
                ...currentRouteToStore,
                remoteRouteId: response.data.id,
            };
        }

        dispatch(clearError());
        dispatch(setCurrentRoute(keep ? undefined : currentRouteToStore));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[stopCurrentRoute]');
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const stopCurrentRoute = (
    omitPersists?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute}: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (omitPersists) {
            if (
                currentRoute.remoteRouteId &&
                !isOffline &&
                internetConnectionInfo?.goodConnectionQuality
            ) {
                const response = await removeCeratedRouteIDService(
                    currentRoute.remoteRouteId,
                );
                if (response.error) {
                    logger.log('[stopCurrentRoute]');
                    const err = convertToApiError(response.error);
                    logger.recordError(err);
                }
            }
            dispatch(clearCurrentRouteData(true));
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(setLoadingState(false));
            return;
        }

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            isActive: false,
            endedAt: new Date(),
        };

        dispatch(clearError());
        dispatch(setCurrentRoute(currentRouteToEnd));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[stopCurrentRoute]');
        const err = convertToApiError(error);
        logger.recordError(err);
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
            currentRoute.id,
            currentRouteData,
        );

        if (!currRoutes) {
            dispatch(setError('Error on persisting locations', 500));
        }

        dispatch(clearError());
        dispatch(setCurrentRouteData(currRoutes));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[persistCurrentRouteData]');
        const err = convertToApiError(error);
        logger.recordError(err);
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
        dispatch(setRouteToSynch(currentRoute.id));
        dispatch(
            setRoutesData({
                id: currentRoute.id,
                route: currentRouteData,
                remoteRouteId: currentRoute?.remoteRouteId,
            }),
        );
        dispatch(clearAverageSpeed());

        dispatch(setError(I18n.t('dataAction.dataSyncError'), 500));
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[addRoutesToSynchQueue]');
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');

        const {currentRoute, currentRouteData}: RoutesState = getState().routes;
        dispatch(setRouteToSynch(currentRoute.id));
        dispatch(setRoutesData({id: currentRoute.id, route: currentRouteData}));
        dispatch(clearAverageSpeed());

        dispatch(setError(errorMessage, 500));
    }
};

export const syncCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRouteData, currentRoute}: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;
        const {totalPrivateMaps}: MapsState = getState().maps;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            if (
                currentRouteData?.length >= 2 &&
                currentRouteData?.find(cr => cr?.odometer >= MIN_ROUTE_LENGTH)
            ) {
                dispatch(addRoutesToSynchQueue());
            }
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());

            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            dispatch(setLoadingState(false));
            return;
        }

        const currRoutesDat = await routesDataToPersist(
            currentRoute.id,
            currentRouteData,
        );

        const response = await syncRouteData(
            currRoutesDat,
            currentRoute?.remoteRouteId,
            totalPrivateMaps,
        );

        if ((response.error && response.status >= 400) || !response?.data?.id) {
            let errorMessage = response.error;

            /* If fail add to queue. Resolve tasks queue in different action. */
            if (
                currentRouteData?.length >= 2 &&
                currentRouteData?.find(
                    cr => cr?.odometer >= MIN_ROUTE_LENGTH,
                ) &&
                response.status !== 406
            ) {
                dispatch(addRoutesToSynchQueue());

                if (currentRoute?.remoteRouteId) {
                    await removeCeratedRouteIDService(
                        currentRoute.remoteRouteId,
                    );
                }
            }

            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(setError(errorMessage, response.status));
            return;
        }

        dispatch(setPrivateMapId(response.data.id));
        dispatch(clearCurrentRouteData());
        dispatch(clearCurrentRoute());
        dispatch(clearAverageSpeed());
        dispatch(clearError());
        dispatch(setLoadingState(false));
        dispatch(fetchPrivateMapsList());
    } catch (error) {
        logger.log('[syncCurrentRouteData]');
        const err = convertToApiError(error);
        logger.recordError(err);

        dispatch(addRoutesToSynchQueue());
    }
};

export const syncRouteDataFromQueue = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {
            routesToSync,
            routes,
            currentRoute,
        }: RoutesState = getState().routes;

        if (!routesToSync?.length) {
            dispatch(setLoadingState(false));
            return;
        }

        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            dispatch(setLoadingState(false));
            return;
        }

        let newRoutes: RoutesI[] = [];
        let newRoutesToSync: string[] = [];
        routesToSync.forEach(async (id: string) => {
            const routeToSync = routes.find((r: RoutesI) => r.id === id);
            if (!routeToSync || routeToSync?.route?.length < 2) {
                return;
            }

            const remoteId =
                routeToSync.id === currentRoute.id
                    ? currentRoute?.remoteRouteId
                    : routeToSync?.remoteRouteId;

            const response = await syncRouteData(routeToSync.route, remoteId);

            if (response.error || !response?.data?.id) {
                newRoutesToSync.push(id);
                newRoutes.push(routeToSync);
                return;
            }

            if (remoteId) {
                dispatch(clearCurrentRoute());
            }
        });

        dispatch(setRoutesToSynch(newRoutesToSync));
        dispatch(setRoutesData(newRoutes, true));
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[syncRouteDataFromQueue]');
        const err = convertToApiError(error);
        logger.recordError(err);
    }
};

export const abortSyncCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute}: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());

            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            dispatch(setLoadingState(false));
            return;
        }

        if (currentRoute?.remoteRouteId) {
            await removeCeratedRouteIDService(currentRoute.remoteRouteId);
        }

        dispatch(clearCurrentRouteData());
        dispatch(clearCurrentRoute());
        dispatch(clearAverageSpeed());
        dispatch(clearError());
        dispatch(setLoadingState(false));
        dispatch(fetchPrivateMapsList());
    } catch (error) {
        logger.log('[syncCurrentRouteData]');
        const err = convertToApiError(error);
        logger.recordError(err);
    }
};
