import {AppThunk} from '../thunk';
import {batch} from 'react-redux';

import i18next from '@translations/i18next';
import {CurrentRouteI, RoutesI, RoutesState} from '../reducers/routes';
import * as actionTypes from './actionTypes';
import {routesDataToPersist} from '@utils/transformData';
import {LocationDataI} from '@interfaces/geolocation';
import {AppState} from '../reducers/app';
import {MapsState} from '../reducers/maps';
import {removeCeratedRouteIDService} from '@services/routesService';
import {appendRouteDebuggInfoToFIle} from '@storage/actions/app';

import {createNewRouteService, syncRouteData} from '@services/index';
import {fetchPrivateMapsList, setPrivateMapId} from './maps';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {MIN_ROUTE_LENGTH} from '@helpers/global';
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
import {RecordingStateT} from '@storage/reducers/routes';

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

export const setError = (
    error: string,
    statusCode: number,
    routeToShort?: boolean,
) => ({
    type: actionTypes.SET_ROUTES_ERROR,
    error: error,
    statusCode: statusCode,
    routeToShort: routeToShort,
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

export const setRecordingState = (recordingState: RecordingStateT) => ({
    type: actionTypes.SET_RECORDING_STATE,
    recordingState: recordingState,
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
        const {
            isOffline,
            internetConnectionInfo,
            routeDebugMode,
        }: AppState = getState().app;

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
            routeDebugMode,
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

                /* Route debug - start */
                await dispatch(
                    appendRouteDebuggInfoToFIle(
                        routeID,
                        keepCurrentRecording ? 'rerun' : 'start',
                        keepCurrentRecording
                            ? currentRoute
                            : currentRouteToStore,
                        {
                            distance: undefined,
                            routesDataLength: undefined,
                        },
                    ),
                );
                /* Route debug - end */

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

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                routeID,
                keepCurrentRecording ? 'rerun' : 'start',
                keepCurrentRecording ? currentRoute : currentRouteToStore,
                {
                    distance: undefined,
                    routesDataLength: undefined,
                },
            ),
        );
        /* Route debug - end */

        dispatch(setLoadingState(false));

        return {success: startedState, finished: true};
    } catch (error) {
        console.log(`[startRecordingRoute] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'startRecordingRoute');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));

        return {success: false, finished: true};
    }
};

export const stopCurrentRoute = (
    omitPersists?: boolean,
): AppThunk<Promise<ActionAsyncResponseI>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    dispatch(clearError());
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

                    loggErrorMessage(
                        response.error,
                        'stopCurrentRoute',
                        sentryLogLevel.Error,
                    );
                }
            }

            const stoppedState = await stopRecording();

            dispatch(setRouteMapVisibility(false));

            /* Route debug - start */
            await dispatch(
                appendRouteDebuggInfoToFIle(
                    currentRoute.id,
                    'cancel',
                    currentRoute,
                    {
                        distance: undefined,
                        routesDataLength: undefined,
                    },
                ),
            );
            /* Route debug - end */

            dispatch(setLoadingState(false));

            return {success: stoppedState, finished: true};
        }

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            isActive: false,
            endedAt: new Date(),
            recordingState: 'stopped',
        };

        dispatch(setCurrentRoute(currentRouteToEnd));
        dispatch(setRouteMapVisibility(false));

        const stoppedState = await stopRecording();

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                currentRouteToEnd.id,
                'stop',
                currentRouteToEnd,
                {
                    distance: undefined,
                    routesDataLength: undefined,
                },
            ),
        );
        /* Route debug - end */

        /**
         * Added route will be synch with backend in the future.
         * Wait for process to be finished.
         */
        await dispatch(
            addToQueueByRouteIdRouteData(currentRouteToEnd.id, true),
        );

        dispatch(clearError());
        dispatch(setLoadingState(false));
        return {success: stoppedState, finished: true};
    } catch (error) {
        console.log(`[stopCurrentRoute] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'stopCurrentRoute');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));

        return {success: false, finished: true};
    }
};

export const addToQueueByRouteIdRouteData = (
    routeId: string,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {routeDebugMode}: AppState = getState().app;

        const routeData = await routesDataToPersist(routeId, routeDebugMode);

        if (
            routeData?.length >= 2 &&
            routeData?.find(cr => cr?.odometer >= MIN_ROUTE_LENGTH)
        ) {
            await dispatch(addRoutesToSynchQueue(routeId, routeData, true));
        }

        dispatch(clearError());
        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[addToQueueByRouteIdRouteData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'addToQueueByRouteIdRouteData');
        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const addRoutesToSynchQueue = (
    routeId: string,
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

        dispatch(setRouteToSynch(routeId));
        dispatch(
            setRoutesData({
                id: routeId,
                route: routeDataToSynch,
                remoteRouteId: currentRoute?.remoteRouteId,
            }),
        );
        dispatch(clearAverageSpeed());

        dispatch(setError(i18next.t('dataAction.dataSyncError'), 500));

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                currentRoute.id,
                'persist',
                currentRoute,
                {
                    distance:
                        routeDataToSynch?.[routeDataToSynch?.length - 1]
                            ?.odometer || 0,
                    routesDataLength: routeDataToSynch?.length || 0,
                },
                routeDataToSynch,
            ),
        );
        /* Route debug - end */

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[addRoutesToSynchQueue] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'addRoutesToSynchQueue');

        dispatch(clearAverageSpeed());
        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const syncCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    dispatch(clearError());
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

            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
            dispatch(setLoadingState(false));

            /* Route debug - start */
            await dispatch(
                appendRouteDebuggInfoToFIle(
                    currentRoute.id,
                    'synch',
                    currentRoute,
                    {
                        distance:
                            currRoutesDat?.[currRoutesDat?.length - 1]
                                ?.odometer,
                        routesDataLength: currRoutesDat?.length,
                        synchErrorMessage: 'Device was offline',
                    },
                    currRoutesDat,
                ),
            );
            /* Route debug - end */
            return;
        }

        /**
         * Abort sync and clear data when there is no location points
         * (two at least)
         */
        if (!currRoutesDat?.length || currRoutesDat?.length < 2) {
            await dispatch(abortSyncCurrentRouteData(false, false, true));

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

            if (currRoutesDat?.length > 3 && response.status >= 500) {
                console.log(
                    `[syncCurrentRouteData - error during sync] - ${errorMessage} - ${currRoutesDat?.length}`,
                );

                sentryMessager(errorMessage, sentryLogLevel.Error);
            }
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(
                setError(errorMessage, response.status, response?.shortRoute),
            );

            /* Route debug - start */
            await dispatch(
                appendRouteDebuggInfoToFIle(
                    currentRoute.id,
                    'synch',
                    currentRoute,
                    {
                        distance:
                            currRoutesDat?.[currRoutesDat?.length - 1]
                                ?.odometer,
                        routesDataLength: currRoutesDat?.length,
                        synchedDataLength: response?.sentData?.length,
                        synchErrorMessage: response?.rawError,
                    },
                    currRoutesDat,
                    response?.sentData,
                ),
            );
            /* Route debug - end */

            loggErrorMessage(
                response.error,
                'syncCurrentRoute',
                sentryLogLevel.Error,
            );
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

        batch(async () => {
            dispatch(setRoutesToSynch(reducedRoutesToSynch));
            dispatch(setRoutesData(reducedRoutesDataToSynch, true));

            dispatch(setPrivateMapId(response.data.id));
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(clearError());

            /* Route debug - start */
            await dispatch(
                appendRouteDebuggInfoToFIle(
                    currentRoute.id,
                    'synch',
                    currentRoute,
                    {
                        distance:
                            currRoutesDat?.[currRoutesDat?.length - 1]
                                ?.odometer,
                        routesDataLength: currRoutesDat?.length,
                        synchedDataLength: response?.sentData?.length,
                        synchErrorMessage: response?.rawError,
                    },
                    currRoutesDat,
                    response?.sentData,
                ),
            );
            /* Route debug - emd */

            dispatch(fetchPrivateMapsList());
            dispatch(syncRouteDataFromQueue(true));

            dispatch(setLoadingState(false));
        });
    } catch (error) {
        console.log(`[syncCurrentRouteData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'syncCurrentRouteData');

        dispatch(setError(i18next.t('dataAction.dataSyncError'), 500));
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
            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
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

                loggErrorMessage(
                    response.error,
                    'syncRouteFromQueue',
                    sentryLogLevel.Error,
                );
                return;
            }

            if (remoteId && remoteId === currentRoute?.remoteRouteId) {
                dispatch(clearCurrentRoute());
            }
        });

        dispatch(setRoutesToSynch(newRoutesToSync));
        dispatch(setRoutesData(newRoutes, true));
        dispatch(clearError());
        setLoadState(dispatch, true, skipLoadingState);

        /**
         * Refetch private maps after sync
         */
        dispatch(fetchPrivateMapsList());
    } catch (error) {
        console.log(`[syncRouteDataFromQueue] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'syncRouteDataFromQueue');
    }
};

export const abortSyncCurrentRouteData = (
    endDebugFile?: boolean,
    skipFetchingMaps?: boolean,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {currentRoute, currentRouteData}: RoutesState = getState().routes;
        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        let distance = 0;
        if (endDebugFile) {
            distance =
                currentRouteData?.[currentRouteData?.length - 1]?.odometer;
        }

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                currentRoute.id,
                endDebugFile ? 'no-synch' : 'cancel',
                currentRoute,
                {
                    distance: distance,
                    routesDataLength: currentRouteData?.length,
                },
            ),
        );
        /* Route debug - end */

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());

            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
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

        setLoadState(dispatch, false, skipLoadingState);
        if (!skipFetchingMaps) {
            dispatch(fetchPrivateMapsList());
        }
    } catch (error) {
        console.log(`[abortSyncCurrentRouteData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'abortSyncCurrentRouteData');
    }
};
