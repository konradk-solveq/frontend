import {createSelector} from 'reselect';

import {UserStateI} from '@storage/reducers/user';
import {RootState} from '@storage/storage';

export const userSelector = (state: RootState): UserStateI => state.user;

export const onboardingFinishedSelector = createSelector(
    userSelector,
    u => u.onboardingFinished,
);

export const userNameSelector = (state: RootState): string =>
    state.user.userName;

export const loadingSelector = (state: RootState): boolean =>
    state.user.loading;

export const errorMessageSelector = (state: RootState): string =>
    state.user.error;

export const frameNumberSelector = (state: RootState): string =>
    state.user.frameNumber;
