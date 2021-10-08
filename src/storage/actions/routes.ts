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
import {AppDispatch} from '@hooks/redux';
import {
    loggErrorMessage,
    loggErrorWithScope,
    sentryLogLevel,
    sentryMessager,
} from '@sentryLogger/sentryLogger';
import {startCurrentRoute} from '@hooks/utils/localizationTracker';
import {
    getNextRouteNumber,
    startRecording,
    stopRecording,
} from './utils/routes';

export interface ActionAsyncResponseI {
    success: boolean;
    finished: boolean;
}

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

export const setRouteMapVisibility = (isMapVisible: boolean) => ({
    type: actionTypes.SET_ROUTE_MAP_VISIBILITY,
    isMapVisible: isMapVisible,
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

const setLoadState = (
    dispatch: AppDispatch,
    state: boolean,
    skip?: boolean,
) => {
    if (!skip) {
        dispatch(setLoadingState(state));
    }
};

/**
 * Creates route ID in first step, because actions are asynch on backend side
 */
export const startRecordingRoute = (
    routeIdToFollow?: string,
): AppThunk<Promise<ActionAsyncResponseI>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute}: RoutesState = getState().routes;
        const {totalPrivateMaps}: MapsState = getState().maps;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        const currentRouteToStore: CurrentRouteI = await startCurrentRoute(
            routeIdToFollow,
        );
        const keepCurrentRecording = currentRoute.isActive;
        const routeID = keepCurrentRecording
            ? currentRoute.id
            : currentRouteToStore.id;

        const startedState = await startRecording(
            routeID,
            keepCurrentRecording,
        );

        if (
            (!keepCurrentRecording || !currentRoute?.remoteRouteId) &&
            !isOffline &&
            internetConnectionInfo?.goodConnectionQuality
        ) {
            const response = await createNewRouteService(
                getNextRouteNumber(totalPrivateMaps),
            );

            if (response.error || !response?.data?.id) {
                let errorMessage = response.error;

                dispatch(setError(errorMessage, response.status));

                dispatch(
                    setCurrentRoute(
                        keepCurrentRecording ? undefined : currentRouteToStore,
                    ),
                );

                dispatch(setLoadingState(false));
                return {success: startedState, finished: true};
            }

            currentRouteToStore.remoteRouteId = response.data.id;
        }

        dispatch(clearError());
        dispatch(
            setCurrentRoute(
                keepCurrentRecording ? undefined : currentRouteToStore,
            ),
        );
        dispatch(setLoadingState(false));

        return {success: startedState, finished: true};
    } catch (error) {
        console.log(`[startRecordingRoute] - ${error}`);
        logger.log(`[startRecordingRoute] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'startRecordingRoute');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));

        return {success: false, finished: true};
    }
};

export const stopCurrentRoute = (
    omitPersists?: boolean,
): AppThunk<Promise<ActionAsyncResponseI>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute}: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (omitPersists) {
            const currRouteID = currentRoute.remoteRouteId;
            dispatch(clearCurrentRoute());
            dispatch(clearCurrentRouteData(true));
            dispatch(clearAverageSpeed());

            if (
                currRouteID &&
                !isOffline &&
                internetConnectionInfo?.goodConnectionQuality
            ) {
                const response = await removeCeratedRouteIDService(currRouteID);
                if (response.error) {
                    console.log(`[stopCurrentRoute] - ${response.error}`);
                    logger.log(`[stopCurrentRoute] - ${response.error}`);
                    const err = convertToApiError(response.error);
                    logger.recordError(err);

                    loggErrorMessage(
                        response.error,
                        'stopCurrentRoute',
                        sentryLogLevel.Log,
                    );
                }
            }

            const stoppedState = await stopRecording();

            dispatch(setRouteMapVisibility(false));
            dispatch(setLoadingState(false));
            return {success: stoppedState, finished: true};
        }

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            isActive: false,
            endedAt: new Date(),
        };

        dispatch(setCurrentRoute(currentRouteToEnd));
        dispatch(setRouteMapVisibility(false));

        const stoppedState = await stopRecording();
        /**
         * Added route will be synch with backend in the future.
         */
        dispatch(addToQueueByRouteIdRouteData(currentRouteToEnd.id, true));

        dispatch(clearError());
        dispatch(setLoadingState(false));
        return {success: stoppedState, finished: true};
    } catch (error) {
        console.log(`[stopCurrentRoute] - ${error}`);
        logger.log(`[stopCurrentRoute] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'stopCurrentRoute');

        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));

        return {success: false, finished: true};
    }
};

export const addToQueueByRouteIdRouteData = (
    routeId: string,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async dispatch => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const routeData = await routesDataToPersist(routeId);

        if (
            routeData?.length >= 2 &&
            routeData?.find(cr => cr?.odometer >= MIN_ROUTE_LENGTH)
        ) {
            await dispatch(addRoutesToSynchQueue(routeData, true));
        }

        dispatch(clearError());
        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[addToQueueByRouteIdRouteData] - ${error}`);
        logger.log(`[addToQueueByRouteIdRouteData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'addToQueueByRouteIdRouteData');
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const addRoutesToSynchQueue = (
    routeDataToSynch: LocationDataI[],
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        if (!routeDataToSynch?.length) {
            dispatch(clearError());
            setLoadState(dispatch, false, skipLoadingState);
            return;
        }

        const {currentRoute}: RoutesState = getState().routes;

        dispatch(setRouteToSynch(currentRoute.id));
        dispatch(
            setRoutesData({
                id: currentRoute.id,
                route: routeDataToSynch,
                remoteRouteId: currentRoute?.remoteRouteId,
            }),
        );
        dispatch(clearAverageSpeed());

        dispatch(setError(I18n.t('dataAction.dataSyncError'), 500));
        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[addRoutesToSynchQueue] - ${error}`);
        logger.log(`[addRoutesToSynchQueue] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'addRoutesToSynchQueue');

        dispatch(clearAverageSpeed());
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const syncCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {
            currentRoute,
            routes,
            routesToSync,
        }: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        const currRoutesDat =
            routes?.find(r => r.id === currentRoute.id)?.route || [];

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());

            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            dispatch(setLoadingState(false));
            return;
        }

        const {totalPrivateMaps}: MapsState = getState().maps;

        const response = await syncRouteData(
            currRoutesDat,
            currentRoute?.remoteRouteId,
            getNextRouteNumber(totalPrivateMaps),
        );

        if ((response.error && response.status >= 400) || !response?.data?.id) {
            let errorMessage = response.error;

            if (currentRoute?.remoteRouteId) {
                await removeCeratedRouteIDService(currentRoute.remoteRouteId);
            }

            if (currRoutesDat?.length > 3) {
                console.log(
                    `[syncCurrentRouteData - error during sync] - ${errorMessage} - ${currRoutesDat?.length}`,
                );
                logger.log(
                    `[syncCurrentRouteData - error during sync] - ${errorMessage} - ${currRoutesDat?.length}`,
                );
                const err = convertToApiError(errorMessage);
                logger.recordError(err);

                sentryMessager(errorMessage, sentryLogLevel.Log);
            }
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(setError(errorMessage, response.status));
            return;
        }

        /**
         * If success remove data from synch queue.
         */
        const reducedRoutesToSynch = routesToSync?.filter(
            r => r !== currentRoute.id,
        );

        const reducedRoutesDataToSynch = routes?.filter(
            r => r.id !== currentRoute.id,
        );
        dispatch(setRoutesToSynch(reducedRoutesToSynch));
        dispatch(setRoutesData(reducedRoutesDataToSynch, true));

        dispatch(setPrivateMapId(response.data.id));
        dispatch(clearCurrentRouteData());
        dispatch(clearCurrentRoute());
        dispatch(clearAverageSpeed());
        dispatch(clearError());
        dispatch(setLoadingState(false));

        await dispatch(fetchPrivateMapsList());
        syncRouteDataFromQueue(true);
    } catch (error) {
        console.log(`[syncCurrentRouteData] - ${error}`);
        logger.log(`[syncCurrentRouteData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'syncCurrentRouteData');
    }
};

export const syncRouteDataFromQueue = (
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {
            routesToSync,
            routes,
            currentRoute,
        }: RoutesState = getState().routes;

        if (!routesToSync?.length) {
            setLoadState(dispatch, true, skipLoadingState);
            return;
        }

        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            setLoadState(dispatch, true, skipLoadingState);
            return;
        }

        const {totalPrivateMaps}: MapsState = getState().maps;

        let newRoutes: RoutesI[] = [];
        let newRoutesToSync: string[] = [];
        routesToSync.forEach(async (id: string, idx: number) => {
            const routeToSync = routes.find((r: RoutesI) => r.id === id);
            if (!routeToSync || routeToSync?.route?.length < 2) {
                return;
            }

            const remoteId =
                routeToSync.id === currentRoute.id
                    ? currentRoute?.remoteRouteId
                    : routeToSync?.remoteRouteId;
            const routeNumber = getNextRouteNumber(totalPrivateMaps, idx);

            const response = await syncRouteData(
                routeToSync.route,
                remoteId,
                routeNumber,
            );

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
        setLoadState(dispatch, true, skipLoadingState);
    } catch (error) {
        console.log(`[syncRouteDataFromQueue] - ${error}`);
        logger.log(`[syncRouteDataFromQueue] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'syncRouteDataFromQueue');
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
        console.log(`[abortSyncCurrentRouteData] - ${error}`);
        logger.log(`[abortSyncCurrentRouteData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);

        loggErrorWithScope(err, 'abortSyncCurrentRouteData');
    }
};
