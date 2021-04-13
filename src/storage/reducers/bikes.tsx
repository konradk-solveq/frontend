import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {UserBike} from '../../models/userBike.model';

interface BikesState {
    list: UserBike[];
    error: string;
    loading: boolean;
}

const initialStateList: BikesState = {
    list: [],
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
        case actionTypes.SET_BIKES_DATA: {
            const newBikeToAdd = action.bikeData;
            const removedExisted = [...state.list].filter(el => {
                const frameNrExists =
                    el.description.serial_number ===
                    newBikeToAdd.description.serial_number;
                const idExists =
                    el.description.id === newBikeToAdd.description.id;

                return !idExists || !frameNrExists;
            });

            removedExisted.push(newBikeToAdd);

            return {
                ...state,
                error: '',
                loading: false,
                list: removedExisted,
            };
        }
        case actionTypes.SET_BIKES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
    }

    return state;
};

const persistConfig = {
    key: 'bikes',
    storage: AsyncStorage,
    whitelist: ['list'],
};

export default persistReducer(persistConfig, bikesReducer);
