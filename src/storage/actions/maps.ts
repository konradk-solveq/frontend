import * as actionTypes from './actionTypes';
import {I18n} from '../../../I18n/I18n';
import {AppThunk} from '../thunk';
import {getMapsList} from '../../services';
import {Map} from '../../models/map.model';
import logger from '../../utils/crashlytics';

export const setMapsData = (maps: Map[]) => ({
    type: actionTypes.SET_MAPS_DATA,
    maps: maps,
});

export const addMapData = (map: Map, ownerId?: string) => ({
    type: actionTypes.SET_MAPS_DATA,
    map: map,
    ownerId: ownerId,
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

export const fetchMapsList = (): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getMapsList();

        if (response.error || !response.data) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(setMapsData(response.data));
    } catch (error) {
        logger.log('[fetchMapsList]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
