import * as actionTypes from './actionTypes';
import {RiderProfile, UserRideProfile} from '../../models/userRideProfile.model';

export const setUserName = (name: string) => ({
  type: actionTypes.SET_USER_NAME,
  userName: name,
});

export const setFrameNumber = (num: string) => ({
  type: actionTypes.SET_FRAME_NUMBER,
  frameNumber: num,
});

export const setProfileSettings = (data: RiderProfile) => {
    /* TODO: error handling */
    const newData = new UserRideProfile(
        data.cyclingStyle,
        data.tours,
        data.whereDoYouGo,
        data.drivingSpeed,
        data.distancePerMonth,
        data.whoAreYou,
        data.profileNumber,
        data.name,
    );
    return{
        type: actionTypes.SET_PROFILE_SETTINGS,
        riderProfile: newData,
    }
};

export const setOnboardingFinished = (status: boolean) => ({
    type: actionTypes.SET_ONBOARDING_FINISHED,
    onboarding: status,
});
