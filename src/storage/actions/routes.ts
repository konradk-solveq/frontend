import {AppThunk} from '../thunk';

import {I18n} from '../../../I18n/I18n';
import {CurrentRouteI} from '../reducers/routes';
import * as actionTypes from './actionTypes';

import logger from '../../utils/crashlytics';
import {LocationDataI} from '../../interfaces/geolocation';
import {getLocations} from '../../utils/geolocation';

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

export const setCurrentRouteData = (currentRouteData: LocationDataI[]) => ({
    type: actionTypes.SET_CURRENT_ROUTE_DATA,
    currentRouteData: currentRouteData,
});

export const stopCurrentRoute = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRoute} = getState().routes;

        const currentRouteToEnd: CurrentRouteI = {
            ...currentRoute,
            isActive: false,
            endedAt: new Date(),
        };

        dispatch(setCurrentRoute(currentRouteToEnd));
    } catch (error) {
        logger.log('[fetchMapsList]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const persistCurrentRouteData = (): AppThunk<Promise<void>> => async (
    dispatch,
    getState,
) => {
    dispatch(setLoadingState(true));
    try {
        const {currentRouteData} = getState().routes;

        //         "timestamp":     [Date],     // <-- Javascript Date instance
        //    "event":         [String],    // <-- motionchange|geofence|heartbeat
        //    "is_moving":     [Boolean],  // <-- The motion-state when location was recorded.
        //    "uuid":          [String],   // <-- Universally unique identifier
        //    "coords": {
        //        "latitude":  [Double],
        //        "longitude": [Double],
        //        "accuracy":  [Double],
        //        "speed":     [Double],
        //        "heading":   [Double],
        //        "altitude":  [Double]
        //    },
        //    "activity": {
        //        "type": [still|on_foot|walking|running|in_vehicle|on_bicycle],
        //        "confidence": [0-100%]
        //    },
        //    "battery": {
        //        "level": [Double],
        //        "is_charging": [Boolean]
        //    },
        //    "odometer": [Double/meters]

        // uuid: string;
        // timestamp: string;
        // coords: {
        //     latitude: number;
        //     longitude: number;
        //     altitude: number | undefined;
        //     speed: number | undefined;
        // };
        // odomenter: number;
        const locations = await getLocations();
        if (!locations) {
            dispatch(setError('Error on presisting locations', 500));
        }

        /* TODO: presist data */
        console.log('[persisting action]');

        // dispatch(setCurrentRouteData(currentRouteToEnd));
    } catch (error) {
        logger.log('[fetchMapsList]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
