import * as actionTypes from '../actions/actionTypes';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RiderProfile} from '../../models/userRideProfile.model';
import {riderProfiles} from '../../utils/constants';

interface UserState {
    userName: string;
    frameNumber: string;
    riderProfile: RiderProfile;
    onboardingFinished: boolean;
    error: string;
    loading: boolean;
}

const initialState: UserState = {
    userName: '',
    frameNumber: '',
    riderProfile: {
        cyclingStyle: 0,
        tours: 0,
        whereDoYouGo: 0,
        drivingSpeed: 0,
        distancePerMonth: 0,
        whoAreYou: 0,
        profileNumber: 0,
        name: riderProfiles.AMATEUR,
    },
    onboardingFinished: false,
    error: '',
    loading: false,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_USER_NAME: {
            return {
                ...state,
                loading: false,
                userName: action.userName,
            };
        }
        case actionTypes.SET_FRAME_NUMBER: {
            return {
                ...state,
                loading: false,
                frameNumber: action.frameNumber,
            };
        }
        case actionTypes.SET_PROFILE_SETTINGS: {
            return {
                ...state,
                loading: false,
                riderProfile: action.riderProfile,
            };
        }
        case actionTypes.SET_ONBOARDING_FINISHED: {
            return {
                ...state,
                loading: false,
                onboardingFinished: action.onboarding,
            };
        }
        case actionTypes.SET_PROFILE_SETTINGS_ERROR: {
            return {
                ...state,
                loading: false,
                errror: action.errror,
            };
        }
        case actionTypes.LOADING_USER_STATUS: {
            return {
                ...state,
                loading: action.state,
            };
        }
    }

    return state;
};

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['user', 'frameNumber', 'riderProfile', 'onboardingFinished'],
};

export default persistReducer(persistConfig, userReducer);
