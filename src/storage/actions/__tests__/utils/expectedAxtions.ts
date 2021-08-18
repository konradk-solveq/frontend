import * as actionTypes from '../../actionTypes';
import {dataToSynch, endedRoute, startedRoute, stoppedRoute} from './routeData';
import {I18n} from '@translations/I18n';
import {MIN_ROUTE_LENGTH} from '@src/helpers/global';

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

export const startRecordingWhenKeepExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.CLEAR_ROUTES_ERROR,
    },
    {
        type: actionTypes.SET_CURRENT_ROUTE,
        currentRoute: undefined,
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
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
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
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_PRIVATE_MAPS_DATA,
        privateMaps: [],
        paginationCoursor: {},
        totalPrivateMaps: 0,
        refresh: true,
    },
    {
        type: actionTypes.CLEAR_MAPS_ERROR,
    },
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOfflineExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
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
        error: I18n.t('dataAction.dataSyncError'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
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
            remoteRouteId: 'remote-route-test-id',
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
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: I18n.t('dataAction.routeData.updateRouteError'), //read from translation
        statusCode: 400,
    },
    {
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];

export const synchRecordingWhenOnlineWithSuccessOnCreateRemoteRouteIdExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
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
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: true,
    },
    {
        type: actionTypes.SET_ROUTE_TO_SYNC,
        routeId: endedRoute.id,
    },
    {
        type: actionTypes.SET_PRIVATE_MAPS_DATA,
        privateMaps: [],
        paginationCoursor: {},
        totalPrivateMaps: 0,
        refresh: true,
    },
    {
        type: actionTypes.CLEAR_MAPS_ERROR,
    },
    {
        type: actionTypes.SET_MAPS_LOADING_STATE,
        state: false,
    },
];

export const synchRecordingWhenOnlineAndHasNoDataToSynchExpectedActions = [
    {
        state: true,
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
        type: actionTypes.SET_AVERAGE_ROUTE_SPEED,
    },
    {
        type: actionTypes.SET_ROUTES_ERROR,
        error: I18n.t('dataAction.routeData.routeLengthError', {
            value: MIN_ROUTE_LENGTH,
        }), //read from translation
        statusCode: 400,
    },
];

export const synchRecordingWhenOfflineAndHasNoDataToSynchExpectedActions = [
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: true,
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
        error: I18n.t('dataAction.noInternetConnection'),
        statusCode: 500,
    },
    {
        type: actionTypes.SET_ROUTES_LOADING_STATE,
        state: false,
    },
];
