import {AppThunk} from '../thunk';
import {batch} from 'react-redux';

import i18next from '@translations/i18next';
import {CurrentRouteI, RoutesI, RoutesState} from '../reducers/routes';
import * as actionTypes from './actionTypes';
import {getTimeInUTCSeconds, routesDataToPersist} from '@utils/transformData';
import {
    LocationDataI,
    RecordTimeAction,
    RecordTimeI,
} from '@interfaces/geolocation';
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
    sentryMessager,
} from '@sentryLogger/sentryLogger';
import {startCurrentRoute} from '@hooks/utils/localizationTracker';
import {
    checkIfDataLengthAreDifferent,
    getNextRouteNumber,
    getRecordTimesFromDatesWhenEmpty,
    startRecording,
    stopRecording,
} from './utils/routes';
import {RecordingStateT} from '@storage/reducers/routes';
import {parseStringToDate} from '@src/utils/dateTime';

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

export const setCurrentRouteRecordTime = (recordTime: RecordTimeI) => ({
    type: actionTypes.SET_CURRENT_ROUTE_RECORD_TIME,
    recordTime: recordTime,
});

export const setCurrentRouteRecordTimes = (recordTimes: RecordTimeI[]) => ({
    type: actionTypes.SET_CURRENT_ROUTE_RECORD_TIMES,
    recordTimes: recordTimes,
});

export const clearCurrentRouteRecordTime = () => ({
    type: actionTypes.CLEAR_CURRENT_ROUTE_RECORD_TIME,
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
        /**
         * If the recording is active (this can occur when the application is restarted),
         * do not overwrite the identifier to avoid losing information about collected data
         */
        const keepCurrentRecording = currentRoute.isActive;
        /**
         * Creates entry data
         */
        const currentRouteToStore: CurrentRouteI = await startCurrentRoute(
            routeIdToFollow,
        );

        /**
         * Set state for new recording route
         */
        dispatch(
            setCurrentRoute(
                keepCurrentRecording ? undefined : currentRouteToStore,
            ),
        );

        /**
         * Add initialize a tab with start route event
         */
        if (keepCurrentRecording && currentRoute.recordingState === 'paused') {
            dispatch(
                setCurrentRouteRecordTime({
                    action: RecordTimeAction.END_PAUSE,
                    time: getTimeInUTCSeconds(new Date().toISOString()),
                }),
            );
        }

        const routeID = keepCurrentRecording
            ? currentRoute.id
            : currentRouteToStore.id;

        /**
         * Fires BacgkgroundGeolocation plugin
         */
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
        /**
         * Update state for remoteRouteId
         */
        if (!keepCurrentRecording && currentRouteToStore.remoteRouteId) {
            dispatch(setRemoteRouteId(currentRouteToStore.remoteRouteId));
        }

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

        /**
         * Clear the data that has been already recorded
         */
        if (omitPersists) {
            const currRouteID = currentRoute.remoteRouteId;

            batch(() => {
                dispatch(clearCurrentRoute());
                dispatch(clearCurrentRouteData(true));
                dispatch(clearAverageSpeed());
            });

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
                        'error',
                    );
                }
            }

            /**
             * Stops BackgroundGeolocation plugin
             */
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

        const recordTimes = [...currentRoute.recordTimes];
        const currentTime = getTimeInUTCSeconds(new Date().toISOString());
        if (currentRoute.recordingState === 'paused') {
            recordTimes.push({
                action: RecordTimeAction.END_PAUSE,
                time: currentTime,
            });
        }
        /**
         * Add end route event
         */
        recordTimes.push({
            action: RecordTimeAction.END,
            time: currentTime,
        });

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            recordTimes,
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
            setLoadState(dispatch, false, skipLoadingState);
            return;
        }

        const {currentRoute}: RoutesState = getState().routes;

        batch(() => {
            dispatch(setRouteToSynch(routeId));
            dispatch(
                setRoutesData({
                    id: routeId,
                    route: routeDataToSynch,
                    recordTimes: getRecordTimesFromDatesWhenEmpty(
                        currentRoute.recordTimes,
                        [currentRoute.startedAt, currentRoute.endedAt],
                    ),
                    remoteRouteId: currentRoute?.remoteRouteId,
                }),
            );
            dispatch(clearAverageSpeed());
        });

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                routeId,
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
        if (!currRoutesDat?.length || currRoutesDat?.length <= 2) {
            await dispatch(abortSyncCurrentRouteData(false, true, true));

            sentryMessager(
                'syncCurrentRouteData -route path was to short',
                'log',
            );
            dispatch(setLoadingState(false));
            return;
        }

        const {totalPrivateMaps}: MapsState = getState().maps;

        const response = await syncRouteData(
            currRoutesDat,
            getRecordTimesFromDatesWhenEmpty(currentRoute.recordTimes, [
                currentRoute.startedAt,
                currentRoute.endedAt,
            ]),
            currentRoute?.remoteRouteId,
            getNextRouteNumber(totalPrivateMaps),
        );

        if ((response.error && response.status >= 400) || !response?.data?.id) {
            let errorMessage = response.error;

            if (currRoutesDat?.length > 3 && response.status >= 500) {
                console.log(
                    `[syncCurrentRouteData - error during sync] - ${errorMessage} - ${currRoutesDat?.length}`,
                );

                sentryMessager(errorMessage, 'error');
            }

            batch(() => {
                dispatch(clearCurrentRouteData());
                dispatch(clearCurrentRoute());
                dispatch(clearAverageSpeed());
            });
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

            loggErrorMessage(response.error, 'syncCurrentRoute', 'error');
            dispatch(setLoadingState(false));
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

        batch(() => {
            if (
                checkIfDataLengthAreDifferent(
                    reducedRoutesToSynch,
                    routesToSync,
                )
            ) {
                dispatch(setRoutesToSynch(reducedRoutesToSynch));
            }
            if (
                checkIfDataLengthAreDifferent(reducedRoutesDataToSynch, routes)
            ) {
                dispatch(setRoutesData(reducedRoutesDataToSynch, true));
            }
            dispatch(setPrivateMapId(response.data.id));
        });

        batch(() => {
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(clearError());
        });

        /* Route debug - start */
        await dispatch(
            appendRouteDebuggInfoToFIle(
                currentRoute.id,
                'synch',
                currentRoute,
                {
                    distance:
                        currRoutesDat?.[currRoutesDat?.length - 1]?.odometer,
                    routesDataLength: currRoutesDat?.length,
                    synchedDataLength: response?.sentData?.length,
                    synchErrorMessage: response?.rawError,
                },
                currRoutesDat,
                response?.sentData,
            ),
        );
        /* Route debug - emd */

        batch(() => {
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
            setLoadState(dispatch, false, skipLoadingState);
            return;
        }

        const {isOffline, internetConnectionInfo}: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
            setLoadState(dispatch, false, skipLoadingState);
            return;
        }

        const {totalPrivateMaps}: MapsState = getState().maps;

        let newRoutes: RoutesI[] = [];
        let newRoutesToSync: string[] = [];
        routesToSync.forEach(async (id: string, idx: number) => {
            const routeToSync = routes.find((r: RoutesI) => r.id === id);
            const routesLength = routeToSync?.route?.length;
            if (!routeToSync || !routesLength || routesLength <= 2) {
                return;
            }

            const remoteId =
                routeToSync.id === currentRoute.id
                    ? currentRoute?.remoteRouteId
                    : routeToSync?.remoteRouteId;
            const routeNumber = getNextRouteNumber(totalPrivateMaps, idx);

            const firstTime = parseStringToDate(
                routeToSync.route[0]?.timestamp,
            );

            const lastTime = parseStringToDate(
                routeToSync.route?.[routesLength - 1]?.timestamp,
            );
            const response = await syncRouteData(
                routeToSync.route,
                getRecordTimesFromDatesWhenEmpty(routeToSync.recordTimes, [
                    firstTime,
                    lastTime,
                ]),
                remoteId,
                routeNumber,
            );

            if (response.error || !response?.data?.id) {
                newRoutesToSync.push(id);
                newRoutes.push(routeToSync);

                /* TODO: in the future we could add error messages to stack, to inform user about failures */
                loggErrorMessage(response.error, 'syncRouteFromQueue', 'error');
                return;
            }

            if (remoteId && remoteId === currentRoute?.remoteRouteId) {
                dispatch(clearCurrentRoute());
            }
        });

        batch(() => {
            dispatch(setRoutesToSynch(newRoutesToSync));
            dispatch(setRoutesData(newRoutes, true));
            dispatch(clearError());
        });

        setLoadState(dispatch, false, skipLoadingState);
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
            /**
             * Remove route entry from backend
             */
            await removeCeratedRouteIDService(currentRoute.remoteRouteId);
        }

        batch(() => {
            dispatch(clearCurrentRouteData());
            dispatch(clearCurrentRoute());
            dispatch(clearAverageSpeed());
            dispatch(clearError());
        });

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
