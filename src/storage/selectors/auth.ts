import {RootState} from '../storage';

export const isRegisteredSelector = (state: RootState): boolean =>
    !!state.auth.deviceToken && !!state.auth.userId;

export const isAuthorizedSelector = (state: RootState): boolean =>
    state.auth.isAuth;

export const isLodingSelector = (state: RootState): boolean =>
    state.auth.loading;

export const userIdSelector = (state: RootState): string => state.auth.userId;

export const authTokenSelector = (state: RootState): string =>
    state.auth.sessionData.access_token;

export const authErrorSelector = (
    state: RootState,
): {message: string; statusCode: number} => ({
    message: state.auth.error,
    statusCode: state.auth.statusCode,
});
