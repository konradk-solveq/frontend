import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {MapType} from '../../models/map.model';

interface MapsState {
    maps: MapType[];
    favourites: string[];
    error: string;
    loading: boolean;
    statusCode: number;
}

const initialStateList: MapsState = {
    maps: [],
    favourites: [],
    error: '',
    loading: false,
    statusCode: 200,
};

const mapsReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.SET_MAPS_LOADING_STATE: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.SET_MAPS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
                statusCode: action.statusCode,
            };
        }
        case actionTypes.SET_MAPS_DATA: {
            return {
                ...state,
                loading: false,
                maps: action.maps,
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
    whitelist: ['maps, favourites'],
    timeout: 20000,
};

export default persistReducer(persistConfig, mapsReducer);
