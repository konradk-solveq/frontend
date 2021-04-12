import {validateOrReject, ValidationError} from 'class-validator';
import * as actionTypes from './actionTypes';
import {
    RiderProfile,
    UserRideProfile,
} from '../../models/userRideProfile.model';
import {I18n} from '../../../I18n/I18n';
import {AppThunk} from '../thunk';

interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

export const setUserName = (name: string) => ({
    type: actionTypes.SET_USER_NAME,
    userName: name,
});

export const setFrameNumber = (num: string) => ({
    type: actionTypes.SET_FRAME_NUMBER,
    frameNumber: num,
});

export const setRiderProfile = (data: RiderProfile) => ({
    type: actionTypes.SET_PROFILE_SETTINGS,
    riderProfile: data,
});

export const setError = (error: string) => ({
    type: actionTypes.SET_PROFILE_SETTINGS_ERROR,
    error: error,
});

export const setProfileSettings = (
    data: RiderProfile,
): AppThunk<Promise<actionAsyncResponse>> => async dispatch => {
    try {
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
        await validateOrReject(newData);

        dispatch(setRiderProfile(newData));

        return Promise.resolve({
            success: true,
            errorMessage: '',
            data: newData,
        });
    } catch (error) {
        if (error?.[0] instanceof ValidationError) {
            const errorMessage = I18n.t('dataAction.validationError');
            dispatch(setError(errorMessage));

            return Promise.reject({
                success: false,
                errorMessage: errorMessage,
                data: null,
            });
        }
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));

        return Promise.reject({
            success: false,
            errorMessage: errorMessage,
            data: null,
        });
    }
};

export const setOnboardingFinished = (status: boolean) => ({
    type: actionTypes.SET_ONBOARDING_FINISHED,
    onboarding: status,
});
