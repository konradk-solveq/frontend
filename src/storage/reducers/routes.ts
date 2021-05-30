import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {LocationDataI} from '../../interfaces/geolocation';

export interface CurrentRouteI {
    id: string;
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
    averageSpeed: number | undefined;
    error: string;
    loading: boolean;
    statusCode: number;
}

const initialStateList: RoutesState = {
    currentRoute: {
        id: '',
        isActive: false,
        startedAt: undefined,
        endedAt: undefined,
    },
    currentRouteData: [],
    routes: [],
    routesToSync: [],
    averageSpeed: undefined,
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
        case actionTypes.SET_AVERAGE_ROUTE_SPEED: {
            return {
                ...state,
                averageSpeed: action.averageSpeed,
            };
        }
        case actionTypes.SET_ROUTES_DATA: {
            let newRoutes = [...state.routes, action.routes];
            if (action?.refresh) {
                newRoutes = action.routes;
            }

            return {
                ...state,
                routes: newRoutes,
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
                currentRoute: route,
            };
        }
        case actionTypes.SET_ROUTE_TO_SYNC: {
            return {
                ...state,
                routesToSync: [...state.routesToSync, action.routeId],
            };
        }
        case actionTypes.SET_ROUTES_TO_SYNC: {
            return {
                ...state,
                routesToSync: action.routeIds,
            };
        }
        case actionTypes.SET_CURRENT_ROUTE_DATA: {
            return {
                ...state,
                currentRouteData: action.currentRouteData,
            };
        }
        case actionTypes.CLEAR_CURRENT_ROUTE_DATA: {
            const removeFromRoutes = [...state.routes].filter(
                r => r.id !== state.currentRoute.id,
            );
            const removeFromRoutesToSynch = [...state.routesToSync].filter(
                s => s !== state.currentRoute.id,
            );

            return {
                ...state,
                routes: removeFromRoutes,
                routesToSync: removeFromRoutesToSynch,
                currentRoute: {...initialStateList.currentRoute},
                currentRouteData: [],
            };
        }
        case actionTypes.CLEAR_ROUTES_TO_SYNC: {
            const removeFromRoutes = [...state.routes].filter(
                r => !action.ids.includes(r.id),
            );
            const removeFromRoutesToSynch = [...state.routesToSync].filter(
                s => !action.ids.includes(s),
            );

            return {
                ...state,
                routes: removeFromRoutes,
                routesToSync: removeFromRoutesToSynch,
            };
        }
        case actionTypes.CLEAR_AVERAGE_ROUTE_SPEED: {
            return {
                ...state,
                averageSpeed: undefined,
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
    whitelist: [
        'currentRoute, currentRouteData, routes, routesToSync, averageSpeed',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, routesReducer);
