import * as actionTypes from './actionTypes';
import {I18n} from '../../../I18n/I18n';
import {AppThunk} from '../thunk';
import {getMapsList} from '../../services';
import {MapType} from '../../models/map.model';
import logger from '../../utils/crashlytics';
import {MapPagination} from '../../interfaces/api';
import {getLatLng} from '../../utils/geolocation';

export const setMapsData = (
    maps: MapType[],
    paginationCoursor: MapPagination,
    refresh: boolean,
) => ({
    type: actionTypes.SET_MAPS_DATA,
    maps: maps,
    paginationCoursor: paginationCoursor,
    refresh: refresh,
});

export const clearError = () => ({
    type: actionTypes.CLEAR_MAPS_ERROR,
});

export const setLoadingState = (state: boolean) => ({
    type: actionTypes.SET_MAPS_LOADING_STATE,
    state: state,
});

export const setError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_MAPS_ERROR,
    error: error,
    statusCode: statusCode,
});

export const addMapToFavourite = (mapID: string) => ({
    type: actionTypes.ADD_MAP_TO_FAVOURITES,
    mapID: mapID,
});

export const removeMapFromFavourite = (mapID: string) => ({
    type: actionTypes.REMOVE_MAP_TO_FAVOURITES,
    mapID: mapID,
});

export const fetchMapsList = (
    page?: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const {lat, lng} = await getLatLng();

        const response = await getMapsList({latitude: lat, longitude: lng});

        if (response.error || !response.data || !response.data.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        dispatch(
            setMapsData(response.data.elements, response.data.links, refresh),
        );
    } catch (error) {
        logger.log('[fetchMapsList]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
