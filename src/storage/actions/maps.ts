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
import {MapFormDataResult, PickedFilters} from '../../interfaces/form';
import {convertToApiError} from '../../utils/apiDataTransform/communicationError';
import {
    addPlannedMapsListService,
    getMapsByTypeAndId,
    getPlannedMapsListService,
    removePlannedMapByIdService,
} from '../../services/mapsService';
import {AppState} from '../reducers/app';
import {MapsState} from '../reducers/maps';
import {RouteMapType} from '../../models/places.model';
import {checkMapExists} from '../../utils/checkMapExists';

export const setMapsData = (
    maps: MapType[],
    paginationCoursor: MapPagination,
    total: number,
    refresh: boolean,
) => ({
    type: actionTypes.SET_MAPS_DATA,
    maps: maps,
    paginationCoursor: paginationCoursor,
    totalMaps: total,
    refresh: refresh,
});

export const setPrivateMapsData = (
    privateMaps: MapType[],
    paginationCoursor: MapPagination,
    total: number,
    refresh: boolean,
) => ({
    type: actionTypes.SET_PRIVATE_MAPS_DATA,
    privateMaps: privateMaps,
    paginationCoursor: paginationCoursor,
    totalPrivateMaps: total,
    refresh: refresh,
});

export const setPlannedMapsData = (
    plannedMaps: MapType[],
    paginationCoursor: MapPagination,
    refresh: boolean,
) => ({
    type: actionTypes.SET_PLANNED_MAPS_DATA,
    plannedMaps: plannedMaps,
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

export const addMapData = (map: MapType, mapType?: RouteMapType) => ({
    type: actionTypes.ADD_MAPS_DATA,
    map: map,
    mapType: mapType,
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
    type: actionTypes.REMOVE_MAP_FROM_FAVOURITES,
    mapID: mapID,
});

export const removeMapFromPrivates = (mapID: string) => ({
    type: actionTypes.REMOVE_MAP_FROM_PRIVATES,
    mapID: mapID,
});

export const fetchMapsList = (
    page?: string,
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const {lat, lng} = await getLatLngFromForeground();
        if (!lat || !lng) {
            const message = I18n.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getMapsList(
            {latitude: lat, longitude: lng},
            page,
            filters,
        );

        if (response.error || !response.data || !response.data.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        dispatch(
            setMapsData(
                response.data.elements,
                response.data.links,
                response.data.total,
                refresh,
            ),
        );
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[fetchMapsList] - ${error}`);
        logger.log(`[fetchMapsList] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const fetchPrivateMapsList = (
    page?: string,
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const {lat, lng} = await getLatLngFromForeground();
        if (!lat || !lng) {
            const message = I18n.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getPrivateMapsListService(
            {latitude: lat, longitude: lng},
            page,
            filters,
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
                response.data.total,
                refresh,
            ),
        );
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[fetchPrivateMapsList] - ${error}`);
        logger.log(`[fetchPrivateMapsList] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
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
        const {isOffline, internetConnectionInfo}: AppState = getState().app;
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(I18n.t('dataAction.noInternetConnection'), 500));
            dispatch(setLoadingState(false));
            return;
        }

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
            dispatch(setLoadingState(false));
            return;
        }

        await dispatch(fetchPrivateMapsList());
        if (publish) {
            dispatch(fetchMapsList());
        }
        dispatch(clearPrivateMapId());
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[editPrivateMapMetaData] - ${error}`);
        logger.log(`[editPrivateMapMetaData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
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

        dispatch(removeMapFromPrivates(id));
        dispatch(fetchPrivateMapsList());
        dispatch(fetchMapsList());
        dispatch(clearPrivateMapId());
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[removePrivateMapMetaData] - ${error}`);
        logger.log(`[removePrivateMapMetaData] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const fetchPlannedMapsList = (
    page?: string,
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        /* TODO: move to global listener - locaiton */
        const {lat, lng} = await getLatLngFromForeground();
        if (!lat || !lng) {
            const message = I18n.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getPlannedMapsListService(
            {latitude: lat, longitude: lng},
            page,
            filters,
        );

        if (response.error || !response.data || !response.data?.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        dispatch(
            setPlannedMapsData(
                response.data.elements,
                response.data.links,
                refresh,
            ),
        );
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[fetchPlannedMapsList] - ${error}`);
        logger.log(`[fetchPlannedMapsList] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const addPlannedMap = (
    id: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await addPlannedMapsListService(id);

        if (response.error || response.status >= 400) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(fetchPlannedMapsList());
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[addPlannedMap] - ${error}`);
        logger.log(`[addPlannedMap] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const removePlanendMap = (
    id: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await removePlannedMapByIdService(id);

        if (response.error || response.status >= 400) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(removeMapFromFavourite(id));
        dispatch(fetchPlannedMapsList());
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[removePlanendMap] - ${error}`);
        logger.log(`[removePlanendMap] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const fetchMapIfNotExistsLocally = (
    mapId: string,
    mapType?: RouteMapType,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));
    try {
        const {maps, privateMaps, plannedMaps}: MapsState = getState().maps;

        const mapExists = checkMapExists(
            mapId,
            maps,
            privateMaps,
            plannedMaps,
            mapType,
        );

        if (mapExists) {
            dispatch(setLoadingState(false));
            return;
        }

        const {lat, lng} = await getLatLngFromForeground();
        if (!lat || !lng) {
            const message = I18n.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getMapsByTypeAndId(
            {latitude: lat, longitude: lng},
            mapId,
        );

        if (response.error || !response.data || !response.data) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(addMapData(response.data, mapType));
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[fetchMapIfNotExistsLocally] - ${error}`);
        logger.log(`[fetchMapIfNotExistsLocally] - ${error}`);
        const err = convertToApiError(error);
        logger.recordError(err);
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
