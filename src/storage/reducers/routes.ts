import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {LocationDataI} from '../../interfaces/geolocation';

export interface CurrentRouteI {
    id: string | undefined;
    isActive: boolean;
    startedAt: Date | undefined;
    endedAt: Date | undefined;
}

export interface RoutesI {
    id: string;
    route: LocationDataI[];
}

export interface RoutesState {
    currentRoute: CurrentRouteI;
    currentRouteData: LocationDataI[];
    routes: RoutesI[];
    routesToSync: string[] /* uuids */;
    error: string;
    loading: boolean;
    statusCode: number;
}

const initialStateList: RoutesState = {
    currentRoute: {
        id: undefined,
        isActive: false,
        startedAt: undefined,
        endedAt: undefined,
    },
    currentRouteData: [],
    routes: [],
    routesToSync: [],
    error: '',
    loading: false,
    statusCode: 200,
};

const routesReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.SET_ROUTES_LOADING_STATE: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.SET_ROUTES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        }
        case actionTypes.SET_ROUTES_DATA: {
            return {
                ...state,
                loading: false,
                maps: action.routes,
                statusCode: 200,
            };
        }
        case actionTypes.SET_CURRENT_ROUTE: {
            let route = action.currentRoute;
            if (!route) {
                route = {
                    ...state.currentRoute,
                    isActive: true,
                };
            }

            return {
                ...state,
                loading: false,
                currentRoute: route,
            };
        }
        case actionTypes.SET_CURRENT_ROUTE_DATA: {
            return {
                ...state,
                loading: false,
                currentRouteData: action.currentRouteData,
            };
        }
        case actionTypes.CLEAR_CURRENT_ROUTE_DATA: {
            return {
                ...state,
                loading: false,
                currentRoute: {...initialStateList.currentRoute},
                currentRouteData: [],
            };
        }
        case actionTypes.CLEAR_ROUTES_ERROR: {
            return {
                ...state,
                loading: false,
                error: '',
            };
        }
        case actionTypes.LOGOUT: {
            return initialStateList;
        }
    }

    return state;
};

const persistConfig = {
    key: 'routes',
    storage: AsyncStorage,
    whitelist: ['currentRoute, currentRouteData, routes, routesToSync'],
};

export default persistReducer(persistConfig, routesReducer);
