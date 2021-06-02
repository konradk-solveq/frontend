import * as actionTypes from './actionTypes';
import {I18n} from '../../../I18n/I18n';
import {AppThunk} from '../thunk';
import {
    editPrivateMapMetadataService,
    getMapsList,
    getPrivateMapsListService,
    removePrivateMapByIdService,
} from '../../services';
import {MapType} from '../../models/map.model';
import logger from '../../utils/crashlytics';
import {ImagesMetadataType, MapPagination} from '../../interfaces/api';
import {getLatLngFromForeground} from '../../utils/geolocation';
import {MapFormDataResult} from '../../interfaces/form';

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

export const setPrivateMapsData = (
    privateMaps: MapType[],
    paginationCoursor: MapPagination,
    refresh: boolean,
) => ({
    type: actionTypes.SET_PRIVATE_MAPS_DATA,
    privateMaps: privateMaps,
    paginationCoursor: paginationCoursor,
    refresh: refresh,
});

export const setPrivateMapId = (mapId: string) => ({
    type: actionTypes.SET_PRIVATE_MAPID_TO_ADD,
    privateMapId: mapId,
});

export const clearPrivateMapId = () => ({
    type: actionTypes.CLEAR_PRIVATE_MAPID_TO_ADD,
});

export const addMapData = (map: MapType, ownerId?: string) => ({
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

export const fetchMapsList = (
    page?: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const {lat, lng} = await getLatLngFromForeground();

        const response = await getMapsList(
            {latitude: lat, longitude: lng},
            page,
        );

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

export const fetchPrivateMapsList = (
    page?: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const {lat, lng} = await getLatLngFromForeground();
        const response = await getPrivateMapsListService(
            {latitude: lat, longitude: lng},
            page,
        );

        if (response.error || !response.data || !response.data.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        dispatch(
            setPrivateMapsData(
                response.data.elements,
                response.data.links,
                refresh,
            ),
        );
    } catch (error) {
        logger.log('[fetchMapsList]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const editPrivateMapMetaData = (
    data: MapFormDataResult,
    images?: ImagesMetadataType,
    publish?: boolean,
    id?: string,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {userName} = getState().user;

        const response = await editPrivateMapMetadataService(
            data,
            userName,
            images,
            !!publish,
            id,
        );

        if (response.error || response.status >= 400) {
            dispatch(setError(response.error, response.status));
            return;
        }

        if (publish) {
            dispatch(fetchMapsList());
        }
        await dispatch(fetchPrivateMapsList());
        dispatch(clearPrivateMapId());
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[editPrivateMapMetaData]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const removePrivateMapMetaData = (
    id: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await removePrivateMapByIdService(id);

        if (response.error || response.status >= 400) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(fetchPrivateMapsList());
        dispatch(fetchMapsList());
        dispatch(clearPrivateMapId());
        dispatch(setLoadingState(false));
    } catch (error) {
        logger.log('[removePrivateMapMetaData]');
        logger.recordError(error);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
