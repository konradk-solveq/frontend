import {batch} from 'react-redux';
import * as actionTypes from '@storage/actions/actionTypes';
import {AppThunk} from '@storage/thunk';
import {FeaturedMapType, MapType} from '@models/map.model';
import {AppState} from '@storage/reducers/app';
import {MapsState} from '@storage/reducers/maps';
import {RouteMapType} from '@models/places.model';
import {ImagesMetadataType, MapPagination} from '@interfaces/api';
import {MapFormDataResult, PickedFilters} from '@interfaces/form';
import {
    addPlannedMapsListService,
    editPrivateMapMetadataService,
    getFeaturedMapsListService,
    getMapsByTypeAndId,
    getMapsList,
    getPlannedMapsListService,
    getPrivateMapsListService,
    modifyReactionService,
    removePlannedMapByIdService,
    removePrivateMapByIdService,
    removeReactionService,
} from '@services/index';

import i18next from '@translations/i18next';
import {convertToApiError} from '@utils/apiDataTransform/communicationError';
import {checkMapExists} from '@utils/checkMapExists';
import {loggErrorMessage, loggErrorWithScope} from '@sentryLogger/sentryLogger';
import {AppDispatch} from '@hooks/redux';

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

export const setFeaturedMapsData = (
    featuredMaps: FeaturedMapType[],
    refresh: boolean,
) => ({
    type: actionTypes.SET_FEATURED_MAPS_DATA,
    featuredMaps: featuredMaps,
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

export const modifyMapReactions = (
    mapID: string,
    reaction: string,
    sectionID?: string,
) => ({
    type: actionTypes.MODIFY_MAP_REACTIONS,
    mapIdToModify: mapID,
    reaction: reaction,
    sectionID: sectionID,
});

export const removeMapFromPrivates = (mapID: string) => ({
    type: actionTypes.REMOVE_MAP_FROM_PRIVATES,
    mapID: mapID,
});

const setLoadState = (
    dispatch: AppDispatch,
    state: boolean,
    skip?: boolean,
) => {
    if (!skip) {
        dispatch(setLoadingState(state));
    }
};

export const fetchMapsList = (
    page?: string,
    filters?: PickedFilters,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            const message = i18next.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(i18next.t('dataAction.noInternetConnection'), 500));
            setLoadState(dispatch, true, skipLoadingState);
            return;
        }

        const response = await getMapsList(location, page, filters);
        if (response.error || !response.data || !response.data.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;

        batch(() => {
            dispatch(
                setMapsData(
                    response.data.elements,
                    response.data.links,
                    response.data.total,
                    refresh,
                ),
            );
            dispatch(clearError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const fetchPrivateMapsList = (
    page?: string,
    filters?: PickedFilters,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            const message = i18next.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(i18next.t('dataAction.noInternetConnection'), 500));
            return;
        }

        const response = await getPrivateMapsListService(
            location,
            page,
            filters,
        );

        if (response?.error || !response?.data || !response?.data?.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        batch(() => {
            dispatch(
                setPrivateMapsData(
                    response.data?.elements,
                    response.data?.links,
                    response.data?.total,
                    refresh,
                ),
            );
            dispatch(clearError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchPrivateMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchPrivateMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
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
            dispatch(setError(i18next.t('dataAction.noInternetConnection'), 500));
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

        batch(async () => {
            await dispatch(fetchPrivateMapsList());
            if (publish) {
                dispatch(fetchMapsList());
            }
            dispatch(clearPrivateMapId());
            dispatch(clearError());

            dispatch(setLoadingState(false));
        });
    } catch (error) {
        console.log(`[editPrivateMapMetaData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'editPrivateMapMetaData');

        const errorMessage = i18next.t('dataAction.apiError');
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

        batch(() => {
            dispatch(removeMapFromPrivates(id));
            dispatch(fetchPrivateMapsList());
            dispatch(fetchMapsList());
            dispatch(clearPrivateMapId());
            dispatch(clearError());
        });

        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[removePrivateMapMetaData] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'removePrivateMapMetaData');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const fetchPlannedMapsList = (
    page?: string,
    filters?: PickedFilters,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {location}: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            const message = i18next.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getPlannedMapsListService(
            location,
            page,
            filters,
        );

        if (response.error || !response.data || !response.data?.elements) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        batch(() => {
            dispatch(
                setPlannedMapsData(
                    response.data.elements,
                    response.data.links,
                    refresh,
                ),
            );
            dispatch(clearError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchPlannedMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchPlannedMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
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

        batch(async () => {
            await dispatch(fetchPlannedMapsList());
            dispatch(clearError());

            dispatch(setLoadingState(false));
        });
    } catch (error) {
        console.log(`[addPlannedMap] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'addPlannedMap');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const removePlannedMap = (
    id: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await removePlannedMapByIdService(id);

        if (response.error || response.status >= 400) {
            dispatch(setError(response.error, response.status));
            return;
        }

        batch(async () => {
            dispatch(removeMapFromFavourite(id));
            await dispatch(fetchPlannedMapsList());
            dispatch(clearError());

            dispatch(setLoadingState(false));
        });
    } catch (error) {
        console.log(`[removePlannedMap] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'removePlannedMap');

        const errorMessage = i18next.t('dataAction.apiError');
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

        const {location}: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            const message = i18next.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        const response = await getMapsByTypeAndId(location, mapId);

        if (response.error || !response.data || !response.data) {
            dispatch(setError(response.error, response.status));
            return;
        }

        dispatch(addMapData(response.data, mapType));
        dispatch(clearError());
        dispatch(setLoadingState(false));
    } catch (error) {
        console.log(`[fetchMapIfNotExistsLocally] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapIfNotExistsLocally');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};

export const modifyReaction = (
    routeId: string,
    reaction: string,
    remove?: boolean,
    sectionId?: string,
): AppThunk<Promise<void>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = !remove
            ? await modifyReactionService(routeId, reaction)
            : await removeReactionService(routeId);

        if (response.error || !response.data) {
            dispatch(setError(response.error, response.status));
            return;
        }

        batch(() => {
            dispatch(modifyMapReactions(routeId, reaction, sectionId));
            dispatch(clearError());
        });

        dispatch(setLoadingState(false));
        dispatch(fetchPrivateMapsList());
    } catch (error) {
        loggErrorMessage(error, 'modifyReaction');
    }
};

export const fetchFeaturedMapsList = (
    page?: string,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            const message = i18next.t(
                'dataAction.locationData.readSQLDataFailure',
            );
            dispatch(setError(message, 400));
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(setError(i18next.t('dataAction.noInternetConnection'), 500));
            setLoadState(dispatch, false, skipLoadingState);
            return;
        }

        const response = await getFeaturedMapsListService(location, page);

        if (response.error || !response.data) {
            dispatch(setError(response.error, response.status));
            return;
        }

        const refresh = !page;
        batch(() => {
            dispatch(setFeaturedMapsData(response.data, refresh));
            dispatch(clearError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchFeaturedMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchFeaturedMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setError(errorMessage, 500));
    }
};
