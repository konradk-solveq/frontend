import * as actionTypes from '../actions/actionTypes';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  userName: string;
  frameNumber: string;
}

const initialState: UserState = {
  userName: '',
  frameNumber: '',
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_USER_NAME: {
            return {
                ...state,
                userName: action.userName,
            }
        }
        case actionTypes.SET_FRAME_NUMBER: {
            return {
                ...state,
                frameNumber: action.frameNumber,
            }
        }
    }

    return state;
};

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['user', 'frameNumber'],
};

export default persistReducer(persistConfig, userReducer);
