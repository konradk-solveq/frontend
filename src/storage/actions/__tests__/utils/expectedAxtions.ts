import * as actionTypes from '../../actionTypes';
import {endedRoute, startedRoute, stoppedRoute} from './routeData';
import i18next from '@translations/i18next';
import {MIN_ROUTE_LENGTH} from '@helpers/global';
import recordedRoutesData from '../mocks/recordedRoutesData';

export const startRecordingExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.SET_CURRENT_ROUTE,
        currentRoute: startedRoute,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        remoteRouteId: 'remote-route-test-id',
        type: actionTypes.SET_REMOTE_ROUTE_ID,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const startRecordingWhenKeepExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_CURRENT_ROUTE,
        currentRoute: undefined,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const stopRecordingExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_CURRENT_ROUTE,
        currentRoute: stoppedRoute,
    },
    {
        isMapVisible: false,
        type: actionTypes.SET_ROUTE_MAP_VISIBILITY,
    },
    {
        type: actionTypes.SET_ROUTE_TO_SYNC,
        routeId: stoppedRoute.id,
    },
    {
        type: actionTypes.SET_ROUTES_DATA,
        routes: {
            id: stoppedRoute.id,
            route: recordedRoutesData,
            remoteRouteId: stoppedRoute.remoteRouteId,
        },
        refresh: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const synchRecordingExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_PRIVATE_MAPID_TO_ADD,
        privateMapId: endedRoute.remoteRouteId,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOfflineExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: i18next.t('dataAction.noInternetConnection'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: i18next.t('dataAction.routeData.routeLengthError', {
            value: MIN_ROUTE_LENGTH,
        }),
        statusCode: 400,
        routeToShort: true,
    },
];

export const synchRecordingWhenOfflineAndErrorOnApiRequestExpectedActionsB = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: i18next.t('dataAction.routeData.updateRouteError', {
            value: MIN_ROUTE_LENGTH,
        }),
        statusCode: 400,
    },
];

export const synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_PRIVATE_MAPID_TO_ADD,
        privateMapId: endedRoute.remoteRouteId,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: 'Route cannot be empty',
        statusCode: 404,
        routeToShort: undefined,
    },
];

export const synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE_DATA,
        removeDuplicates: undefined,
    },
    {
        type: actionTypes.CLEAR_CURRENT_ROUTE,
        keepId: undefined,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: i18next.t('dataAction.noInternetConnection'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
    },
];
