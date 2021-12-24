import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {Place} from '../../models/places.model';

interface PlacesState {
    places: Place[];
    error: string;
    loading: boolean;
}

const initialStateList: PlacesState = {
    places: [],
    error: '',
    loading: false,
};

const bikesReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.LOADING_PLACES_DATA: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.SET_PLACES_DATA: {
            return {
                ...state,
                error: '',
                loading: false,
                places: action.places,
            };
        }
        case actionTypes.SET_PLACES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialStateList};
        }
    }

    return state;
};

const persistConfig = {
    key: 'places',
    storage: AsyncStorage,
    whitelist: ['places'],
    timeout: 20000,
};

export default persistReducer(persistConfig, bikesReducer);
