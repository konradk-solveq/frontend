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
import {
    getMapsListCount,
    getPrivateMapsListCount,
    getPlannedMapsListCount,
} from '@services/mapsService';
import {defaultLocation} from '@utils/constants/location';

const TEST_ENV = process.env.JEST_WORKER_ID;

const getTotalNumber = (totalNumber?: string | number) => {
    if (!totalNumber) {
        return 0;
    }

    if (typeof totalNumber === 'number') {
        return totalNumber;
    }

    const total = parseInt(totalNumber, 10);
    if (isNaN(total)) {
        return 0;
    }

    return total;
};

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

export const setMapsCount = (total: number) => ({
    type: actionTypes.SET_MAPS_COUNT,
    total,
});
export const setMapsListError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_MAPS_LIST_ERROR,
    error,
    statusCode,
});
export const clearMapsListError = () => ({
    type: actionTypes.CLEAR_MAPS_LIST_ERROR,
});
export const setPrivateMapsCount = (total: number) => ({
    type: actionTypes.SET_PRIVATE_MAPS_COUNT,
    total,
});
export const setPlannedMapsCount = (total: number) => ({
    type: actionTypes.SET_PLANNED_MAPS_COUNT,
    total,
});

export const resetMapsCount = () => ({
    type: actionTypes.RESET_MAPS_COUNT,
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

export const setPrivateMapsListError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_PRIVATE_MAPS_LIST_ERROR,
    error,
    statusCode,
});

export const clearPrivateMapsListError = () => ({
    type: actionTypes.CLEAR_PRIVATE_MAPS_LIST_ERROR,
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

export const setPlannedMapsListError = (error: string, statusCode: number) => ({
    type: actionTypes.SET_PLANNED_MAPS_LIST_ERROR,
    error,
    statusCode,
});

export const clearPlannedMapsListError = () => ({
    type: actionTypes.CLEAR_PLANNED_MAPS_LIST_ERROR,
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

export const modifyPlannedMapReactions = (mapID: string, reaction: string) => ({
    type: actionTypes.MODIFY_PLANNED_MAP_REACTIONS,
    mapIdToModify: mapID,
    reaction: reaction,
});

export const modifyPrivateMapReactions = (mapID: string, reaction: string) => ({
    type: actionTypes.MODIFY_PRIVATE_MAP_REACTIONS,
    mapIdToModify: mapID,
    reaction: reaction,
});

export const removeMapFromPrivates = (mapID: string) => ({
    type: actionTypes.REMOVE_MAP_FROM_PRIVATES,
    mapID: mapID,
});

export const setMapIsFavouriteState = (
    mapID: string,
    isFavourite: boolean,
) => ({
    type: actionTypes.SET_MAP_IS_FAVOURITED_STATE,
    mapIdToModify: mapID,
    isFavourite: isFavourite,
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

export const setMapsAppliedFilters = (
    mapMode: string,
    isFiltersApplied: boolean,
) => ({
    type: actionTypes.SET_MAPS_FILTERS_ACTIVE,
    mapMode: mapMode,
    isFiltersApplied: isFiltersApplied,
});

export const fetchMapsList = (
    page?: string,
    filters?: PickedFilters,
    skipLoadingState?: boolean,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const {loading}: MapsState = getState().maps;
    if (loading) {
        setLoadState(dispatch, false, skipLoadingState);
        return;
    }

    setLoadState(dispatch, true, skipLoadingState);
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setMapsListError(
                    i18next.t('dataAction.noInternetConnection'),
                    500,
                ),
            );
            return;
        }
        const response = await getMapsList(
            location || defaultLocation,
            page,
            filters,
        );
        if (response.error || !response.data || !response.data.elements) {
            dispatch(setMapsListError(response.error, response.status));
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
            dispatch(clearMapsListError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setMapsListError(errorMessage, 500));
    }
};

export const fetchMapsCount = (
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            return;
        }

        const response = await getMapsListCount(location, filters);

        if (response.error || !response.data || !response.data.total) {
            return;
        }
        const total = parseInt(response.data.total, 10);
        if (isNaN(total)) {
            return;
        }
        dispatch(setMapsCount(total));
    } catch (error) {
        console.log(`[fetchMapsCount] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapsList');
    }
};
export const fetchPrivateMapsCount = (
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            return;
        }

        const response = await getPrivateMapsListCount(location, filters);

        if (response.error || !response.data || !response.data.total) {
            return;
        }
        const total = parseInt(response.data.total, 10);
        if (isNaN(total)) {
            return;
        }

        dispatch(setPrivateMapsCount(total));
    } catch (error) {
        console.log(`[fetchPrivateMapsCount] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapsList');
    }
};
export const fetchPlannedMapsCount = (
    filters?: PickedFilters,
): AppThunk<Promise<void>> => async (dispatch, getState) => {
    try {
        const {
            location,
            isOffline,
            internetConnectionInfo,
        }: AppState = getState().app;
        if (!location?.latitude || !location.longitude) {
            return;
        }

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            return;
        }

        const response = await getPlannedMapsListCount(location, filters);

        if (response.error || !response.data || !response.data.total) {
            return;
        }
        const total = parseInt(response.data.total, 10);
        if (isNaN(total)) {
            return;
        }

        dispatch(setPlannedMapsCount(total));
    } catch (error) {
        console.log(`[fetchPlannedMapsCount] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchMapsList');
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
        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setPrivateMapsListError(
                    i18next.t('dataAction.noInternetConnection'),
                    500,
                ),
            );
            return;
        }

        const response = await getPrivateMapsListService(
            location || defaultLocation,
            page,
            filters,
        );

        if (response?.error || !response?.data || !response?.data?.elements) {
            dispatch(setPrivateMapsListError(response.error, response.status));
            return;
        }

        const refresh = !page;
        batch(() => {
            dispatch(
                setPrivateMapsData(
                    response.data?.elements,
                    response.data?.links,
                    getTotalNumber(response.data?.total),
                    refresh,
                ),
            );
            dispatch(clearError());
            dispatch(clearPrivateMapsListError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchPrivateMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchPrivateMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setPrivateMapsListError(errorMessage, 500));
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
            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
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

        batch(() => {
            dispatch(fetchPrivateMapsList());
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
    const {isOffline, internetConnectionInfo}: AppState = getState().app;
    try {
        const {location}: AppState = getState().app;

        if (isOffline || !internetConnectionInfo?.goodConnectionQuality) {
            dispatch(
                setPlannedMapsListError(
                    i18next.t('dataAction.noInternetConnection'),
                    500,
                ),
            );
            return;
        }

        const response = await getPlannedMapsListService(
            location || defaultLocation,
            page,
            filters,
        );

        if (response.error || !response.data || !response.data?.elements) {
            dispatch(setPlannedMapsListError(response.error, response.status));
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
            dispatch(clearPlannedMapsListError());
        });

        setLoadState(dispatch, false, skipLoadingState);
    } catch (error) {
        console.log(`[fetchPlannedMapsList] - ${error}`);
        const err = convertToApiError(error);

        loggErrorWithScope(err, 'fetchPlannedMapsList');

        const errorMessage = i18next.t('dataAction.apiError');
        dispatch(setPlannedMapsListError(errorMessage, 500));
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

        /**
         * TODO: have issue with batching nested async dispatch action
         * jest environment
         */
        if (TEST_ENV) {
            dispatch(setMapIsFavouriteState(id, true));
            await dispatch(fetchPlannedMapsList(undefined, undefined, true));
            dispatch(clearError());

            dispatch(setLoadingState(false));
        } else {
            batch(async () => {
                dispatch(setMapIsFavouriteState(id, true));
                await dispatch(
                    fetchPlannedMapsList(undefined, undefined, true),
                );
                dispatch(clearError());

                dispatch(setLoadingState(false));
            });
        }
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

        /**
         * TODO: have issue with batching nested async dispatch action
         * jest environment
         */
        if (TEST_ENV) {
            dispatch(setMapIsFavouriteState(id, false));
            dispatch(removeMapFromFavourite(id));
            await dispatch(fetchPlannedMapsList(undefined, undefined, true));
            dispatch(clearError());

            dispatch(setLoadingState(false));
        } else {
            batch(async () => {
                dispatch(setMapIsFavouriteState(id, false));
                dispatch(removeMapFromFavourite(id));
                await dispatch(fetchPlannedMapsList());
                dispatch(clearError());

                dispatch(setLoadingState(false));
            });
        }
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
    withPath?: boolean,
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

        const response = await getMapsByTypeAndId(mapId, location, withPath);

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
        /**
         * Call redux update before http request to reflect changes in UI imidietly
         */
        batch(() => {
            dispatch(modifyMapReactions(routeId, reaction, sectionId));
            dispatch(modifyPlannedMapReactions(routeId, reaction));
            dispatch(modifyPrivateMapReactions(routeId, reaction));
            dispatch(clearError());
        });

        const response = !remove
            ? await modifyReactionService(routeId, reaction)
            : await removeReactionService(routeId);

        if (response.error || !response.data) {
            dispatch(setError(response.error, response.status));
            /* Revert changes on error */
            dispatch(modifyMapReactions(routeId, reaction, sectionId));
            return;
        }

        dispatch(setLoadingState(false));
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
            dispatch(
                setError(i18next.t('dataAction.noInternetConnection'), 500),
            );
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
