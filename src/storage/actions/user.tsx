import * as actionTypes from './actionTypes';

export const setUserName = (name: string) => ({
  type: actionTypes.SET_USER_NAME,
  userName: name,
});

export const setFrameNumber = (num: string) => ({
  type: actionTypes.SET_FRAME_NUMBER,
  frameNumber: num,
});

export const setProfileSettings = (data: any) => ({
  type: actionTypes.SET_PROFILE_SETTINGS,
  profileData: data,
});
