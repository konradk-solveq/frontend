import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {UserBike} from '../../models/userBike.model';
import {addNewBikeDataOrReplaceIfExists, updateBikesList} from './utils/bikes';

export interface BikesState {
    list: UserBike[];
    genericBike: UserBike | {};
    error: string;
    loading: boolean;
}

const initialStateList: BikesState = {
    list: [],
    genericBike: {},
    error: '',
    loading: false,
};

const bikesReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.LOADING_BIKE_DATA_STATUS: {
            return {
                ...state,
                loading: action.state,
            };
        }
        case actionTypes.GET_BIKES_DATA: {
            return {
                ...state,
                loading: false,
                list: action.list,
            };
        }
        case actionTypes.SET_BIKE_DATA: {
            const removedExisted = addNewBikeDataOrReplaceIfExists(
                state.list,
                action.bikeData,
            );

            return {
                ...state,
                list: removedExisted,
                loading: false,
                error: '',
            };
        }
        case actionTypes.SET_GENERIC_BIKE_DATA: {
            return {
                ...state,
                genericBike: action.genericBikeData,
                loading: false,
                error: '',
            };
        }
        case actionTypes.SET_BIKES_DATA: {
            const updatedBikes = updateBikesList(
                state.list,
                action.bikeData,
                action.numbersToUpdate,
            );

            return {
                ...state,
                list: updatedBikes,
                loading: false,
                error: '',
            };
        }
        case actionTypes.SET_BIKES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case actionTypes.REMOVE_BIKE_BY_NUMBER: {
            const filteredList = [...state.list].filter(el => {
                return el.description.serial_number !== action.frameNr;
            }, []);

            return {
                ...state,
                list: filteredList,
                loading: false,
            };
        }
        case actionTypes.LOGOUT_USER: {
            return {...initialStateList};
        }
    }

    return state;
};

const persistConfig = {
    key: 'bikes',
    storage: AsyncStorage,
    whitelist: ['list', 'genericBike'],
    timeout: 20000,
};

export default persistReducer(persistConfig, bikesReducer);
