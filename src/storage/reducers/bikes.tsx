import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {UserBike} from '../../models/userBike.model';

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
        case actionTypes.SET_GENERIC_BIKE_DATA: {
            return {
                ...state,
                error: '',
                loading: false,
                genericBike: action.bikeData,
            };
        }
        case actionTypes.SET_BIKES_DATA: {
            const newBikesToAdd = action.bikeData;
            const bikesToRemove = action.numbersToUpdate;

            const removedExisted: UserBike[] = [...state.list].filter(
                el => !bikesToRemove.includes(el.description.serial_number),
            );

            return {
                ...state,
                error: '',
                loading: false,
                list: [...newBikesToAdd, ...removedExisted],
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
                loading: false,
                list: filteredList,
            };
        }
    }

    return state;
};

const persistConfig = {
    key: 'bikes',
    storage: AsyncStorage,
    whitelist: ['list, genericBike'],
    timeout: 20000,
};

export default persistReducer(persistConfig, bikesReducer);
