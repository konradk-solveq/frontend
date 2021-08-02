import * as actionTypes from '../../actionTypes';
import {startedRoute, stoppedRoute} from './routeData';

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
        state: false,
        type: actionTypes.SET_ROUTES_LOADING_STATE,
    },
];
