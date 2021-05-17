import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {Map} from '../../models/map.model';

interface MapsState {
    maps: Map[];
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
};

export default persistReducer(persistConfig, mapsReducer);
