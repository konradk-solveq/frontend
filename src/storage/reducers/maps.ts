import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {FeaturedMapType, MapType} from '../../models/map.model';
import {MapPagination, NestedPaginationType} from '../../interfaces/api';
import {RouteMapType} from '../../models/places.model';
import {updateReactionsInMap} from '@utils/mapsData';
import {NestedTotalMapsType} from '@src/type/maps';

export interface MapsState {
    maps: MapType[];
    totalMaps: number | null;
    privateMaps: MapType[];
    totalPrivateMaps: number | null;
    totalFeaturedMaps: NestedTotalMapsType[];
    plannedMaps: MapType[];
    featuredMaps: FeaturedMapType[];
    paginationCoursor: MapPagination;
    mapToAddId: string;
    paginationCoursorPrivate: MapPagination;
    paginationCoursorPlanned: MapPagination;
    paginationCoursorFeatured: NestedPaginationType[];
    favourites: string[];
    ownes: string[];
    error: string;
    loading: boolean;
    statusCode: number;
    refresh: boolean;
}

const initialStateList: MapsState = {
    maps: [],
    totalMaps: null,
    privateMaps: [],
    totalPrivateMaps: null,
    totalFeaturedMaps: [],
    plannedMaps: [],
    featuredMaps: [],
    paginationCoursor: {},
    paginationCoursorPrivate: {},
    paginationCoursorPlanned: {},
    paginationCoursorFeatured: [],
    mapToAddId: '',
    favourites: [],
    ownes: [],
    error: '',
    loading: false,
    statusCode: 200,
    refresh: false,
};

const mapsReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.SET_MAPS_LOADING_STATE: {
            return {
                ...state,
                refresh: false,
                loading: action.state,
            };
        }
        case actionTypes.SET_MAPS_ERROR: {
            return {
                ...state,
                loading: false,
                refresh: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        }
        case actionTypes.CLEAR_MAPS_ERROR: {
            return {
                ...state,
                loading: false,
                refresh: false,
                error: '',
                statusCode: 200,
            };
        }
        case actionTypes.SET_MAPS_DATA: {
            let newMaps = [...state.maps];
            if (action.refresh) {
                newMaps = action.maps;
            }

            if (!action.refresh || !newMaps?.length) {
                newMaps = [...newMaps, ...action.maps];
            }
            return {
                ...state,
                loading: false,
                maps: newMaps,
                paginationCoursor: action.paginationCoursor,
                totalMaps: action.totalMaps,
                statusCode: 200,
                refresh: action.refresh,
            };
        }
        case actionTypes.SET_PRIVATE_MAPS_DATA: {
            let newPrivateMaps = [...state.privateMaps];
            if (action.refresh && action.privateMaps) {
                newPrivateMaps = action.privateMaps;
            }

            if (!action.refresh || !newPrivateMaps?.length) {
                newPrivateMaps = [...newPrivateMaps, ...action.privateMaps];
            }
            return {
                ...state,
                loading: false,
                privateMaps: newPrivateMaps,
                paginationCoursorFeatured: action.paginationCoursor,
                totalPrivateMaps: action.totalPrivateMaps,
                statusCode: 200,
                refresh: action.refresh,
            };
        }
        case actionTypes.SET_PLANNED_MAPS_DATA: {
            let newPlannedMaps = [...state.plannedMaps];
            if (action.refresh) {
                newPlannedMaps = action.plannedMaps;
            }

            if (!action.refresh || !newPlannedMaps?.length) {
                newPlannedMaps = [...newPlannedMaps, ...action.plannedMaps];
            }
            return {
                ...state,
                loading: false,
                plannedMaps: newPlannedMaps,
                paginationCoursorPlanned: action.paginationCoursor,
                statusCode: 200,
                refresh: action.refresh,
            };
        }
        case actionTypes.SET_FEATURED_MAPS_DATA: {
            let newFeaturedMaps = [...state.featuredMaps];
            if (action.refresh) {
                newFeaturedMaps = action.featuredMaps;
            }

            if (!action.refresh || !newFeaturedMaps?.length) {
                newFeaturedMaps = [...newFeaturedMaps, ...action.featuredMaps];
            }

            const paginationCoursorFeatured: NestedPaginationType[] = [];
            const totalFeaturedMaps: NestedTotalMapsType[] = [];

            newFeaturedMaps.forEach(c => {
                paginationCoursorFeatured.push({
                    id: c?.section?.id,
                    pagination: c?.routes?.links,
                });

                totalFeaturedMaps.push({
                    id: c?.section?.id,
                    value: c?.routes?.total || 0,
                });
            });

            return {
                ...state,
                loading: false,
                featuredMaps: newFeaturedMaps,
                paginationCoursorFeatured: paginationCoursorFeatured,
                totalFeaturedMaps: totalFeaturedMaps,
                statusCode: 200,
                refresh: action.refresh,
            };
        }
        case actionTypes.SET_MAP_DATA: {
            const o = [...state.ownes];
            if (action.ownerId) {
                o.push(action.ownerId);
            }

            return {
                ...state,
                loading: false,
                maps: [...state.maps, action.map],
                ownes: o,
                statusCode: 200,
            };
        }
        case actionTypes.SET_PRIVATE_MAPID_TO_ADD: {
            return {
                ...state,
                loading: false,
                mapToAddId: action.privateMapId,
            };
        }
        case actionTypes.CLEAR_PRIVATE_MAPID_TO_ADD: {
            return {
                ...state,
                loading: false,
                mapToAddId: initialStateList.mapToAddId,
            };
        }
        case actionTypes.ADD_MAP_TO_FAVOURITES: {
            let newFavs = [...state.favourites];
            if (!state.favourites.includes(action.mapID)) {
                newFavs = [...newFavs, action.mapID];
            }
            return {
                ...state,
                loading: false,
                refresh: false,
                favourites: newFavs,
            };
        }
        case actionTypes.REMOVE_MAP_FROM_FAVOURITES: {
            const newFavs = [...state.plannedMaps].filter(
                m => m.id !== action.mapID,
            );
            return {
                ...state,
                plannedMaps: newFavs,
            };
        }
        case actionTypes.REMOVE_MAP_FROM_PRIVATES: {
            const newPriv = [...state.privateMaps].filter(
                m => m.id !== action.mapID,
            );
            return {
                ...state,
                privateMaps: newPriv,
            };
        }
        case actionTypes.ADD_MAPS_DATA: {
            let newMaps: any = {maps: [...state.maps, action.map]};
            if (action.mapType === RouteMapType.MY_ROUTES) {
                newMaps = {privateMaps: [...state.privateMaps, action.map]};
            }

            if (action.mapType === RouteMapType.PLANNING) {
                newMaps = {plannedMaps: [...state.plannedMaps, action.map]};
            }

            return {
                ...state,
                ...newMaps,
                statusCode: 200,
            };
        }
        case actionTypes.MODIFY_MAP_REACTIONS: {
            const modifiedMaps = updateReactionsInMap(
                state.maps,
                action.mapIdToModify,
                action.reaction,
            );

            return {
                ...state,
                maps: modifiedMaps,
                statusCode: 200,
            };
        }
        case actionTypes.LOGOUT: {
            return initialStateList;
        }
    }

    return state;
};

const persistConfig = {
    key: 'maps',
    storage: AsyncStorage,
    whitelist: [
        'maps, favourites, ownes, privateMaps, plannedMaps, paginationCoursorPrivate, paginationCoursorPlanned, totalMaps, totalPrivateMaps',
    ],
    timeout: 20000,
};

export default persistReducer(persistConfig, mapsReducer);
