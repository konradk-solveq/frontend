import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {MapType} from '../../models/map.model';
import {MapPagination} from '../../interfaces/api';

interface MapsState {
    maps: MapType[];
    paginationCoursor: MapPagination;
    favourites: string[];
    ownes: string[];
    error: string;
    loading: boolean;
    statusCode: number;
    refresh: boolean;
}

const initialStateList: MapsState = {
    maps: [],
    paginationCoursor: {},
    favourites: ['222', '333'],
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
                pagintaion: action.paginationCoursor,
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
        case actionTypes.REMOVE_MAP_TO_FAVOURITES: {
            const newFavs = [...state.favourites].filter(
                id => id !== action.mapID,
            );
            return {
                ...state,
                loading: false,
                refresh: false,
                favourites: newFavs,
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
    whitelist: ['maps, favourites, ownes'],
    timeout: 20000,
};

export default persistReducer(persistConfig, mapsReducer);
