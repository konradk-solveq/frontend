import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '@storage/actions/actionTypes';
import {LocationDataI} from '@interfaces/geolocation';
export type RecordingStateT =
    | 'not-started'
    | 'recording'
    | 'paused'
    | 'stopped';
export interface CurrentRouteI {
    id: string;
    isActive: boolean;
    recordingState: RecordingStateT;
    startedAt: Date | undefined;
    endedAt: Date | undefined;
    pauseTime: number;
    routeId?: string | undefined;
    remoteRouteId?: string | undefined;
}

export interface RoutesI {
    id: string;
    route: LocationDataI[];
    remoteRouteId?: string;
}

export interface RoutesState {
    currentRoute: CurrentRouteI;
    isMapVisible: boolean;
    currentRouteData: LocationDataI[];
    routes: RoutesI[];
    routesToSync: string[] /* uuids */;
    averageSpeed: number | undefined;
    error: string;
    loading: boolean;
    statusCode: number;
    routeToShort: boolean;
}

const initialStateList: RoutesState = {
    currentRoute: {
        id: '',
        isActive: false,
        recordingState: 'not-started',
        startedAt: undefined,
        endedAt: undefined,
        pauseTime: 0,
        routeId: undefined,
        remoteRouteId: undefined,
    },
    isMapVisible: false,
    currentRouteData: [],
    routes: [],
    routesToSync: [],
    averageSpeed: undefined,
    error: '',
    loading: false,
    statusCode: 200,
    routeToShort: false,
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
                routeToShort: action?.routeToShort || false,
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
                    recordingState: 'recording',
                };
            }

            return {
                ...state,
                currentRoute: route,
            };
        }
        case actionTypes.SET_CURRENT_ROUTE_PAUSE_TIME: {
            return {
                ...state,
                currentRoute: {
                    ...state.currentRoute,
                    pauseTime: action.pauseTime,
                },
            };
        }
        case actionTypes.SET_REMOTE_ROUTE_ID: {
            return {
                ...state,
                currentRoute: {
                    ...state.currentRoute,
                    remoteRouteId: action.remoteRouteId,
                },
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
        case actionTypes.SET_ROUTE_MAP_VISIBILITY: {
            return {
                ...state,
                isMapVisible: action.isMapVisible,
            };
        }
        case actionTypes.SET_RECORDING_STATE: {
            return {
                ...state,
                currentRoute: {
                    ...state.currentRoute,
                    recordingState: action.recordingState,
                },
            };
        }
        case actionTypes.CLEAR_CURRENT_ROUTE: {
            if (!action.keepId) {
                return {
                    ...state,
                    currentRoute: initialStateList.currentRoute,
                };
            }
            return {
                ...state,
                currentRoute: {
                    ...initialStateList.currentRoute,
                    id: state.currentRoute.id,
                },
            };
        }
        case actionTypes.CLEAR_CURRENT_ROUTE_DATA: {
            let removeFromRoutes = [...state.routes];
            let removeFromRoutesToSynch = [...state.routesToSync];
            if (action.removeDuplicates) {
                removeFromRoutes = [...state.routes].filter(
                    r => r.id !== state.currentRoute.id,
                );
                removeFromRoutesToSynch = [...state.routesToSync].filter(
                    s => s !== state.currentRoute.id,
                );
            }

            return {
                ...state,
                routes: removeFromRoutes,
                routesToSync: removeFromRoutesToSynch,
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
                error: '',
                statusCode: 200,
                routeToShort: false,
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialStateList};
        }
    }

    return state;
};

const persistConfig = {
    key: 'routes',
    storage: AsyncStorage,
    whitelist: [
        'currentRoute',
        'currentRouteData',
        'routes',
        'routesToSync',
        'averageSpeed',
        'isMapVisible',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, routesReducer);
