import * as actionTypes from '../../actionTypes';
import {dataToSynch, endedRoute, startedRoute, stoppedRoute} from './routeData';
import {I18n} from '@translations/I18n';

export const startRecordingExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_CURRENT_ROUTE,
        currentRoute: startedRoute,
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
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const synchRecordingExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
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
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const synchRecordingWhenOfflineExpectedActions = [
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        state: true,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
    {
        type: actionTypes.SET_ROUTE_TO_SYNC,
        routeId: endedRoute.id,
    },
    {
        type: actionTypes.SET_ROUTES_DATA,
        routes: {
            id: endedRoute.id,
            remoteRouteId: undefined,
            route: dataToSynch,
        },
        refresh: undefined,
    },
    {
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: I18n.t('dataAction.dataSyncError'), //read from translation
        statusCode: 500,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
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
        error: I18n.t('dataAction.noInternetConnection'), //read from translation
        statusCode: 500,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];
