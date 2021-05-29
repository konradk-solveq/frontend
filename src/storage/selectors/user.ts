import {RootState} from '../storage';

export const onboardingFinishedSelector = (state: RootState): boolean =>
    state.user.onboardingFinished;

export const userNameSelector = (state: RootState): string =>
    state.user.userName;

export const loadingSelector = (state: RootState): boolean =>
    state.user.loading;

export const errorMessageSelector = (state: RootState): string =>
    state.user.error;

export const frameNumberSelector = (state: RootState): string =>
    state.user.frameNumber;
