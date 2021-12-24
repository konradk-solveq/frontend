import {createSelector} from 'reselect';
import {RootState} from '@storage/storage';
import {UserAuthStateT} from '@type/auth';

export const isAuthorizedSelector = (state: RootState): boolean =>
    state.auth.isAuth;

export const isLodingSelector = (state: RootState): boolean =>
    state.auth.loading;

export const userNameSelector = (state: RootState): string =>
    state.auth.userName;

export const authErrorMessageSelector = (state: RootState): string =>
    state.auth.error;

export const authStatusCodeSelector = (state: RootState): number =>
    parseInt(state.auth.statusCode, 10);

export const authUserAuthenticationStateSelector = (
    state: RootState,
): UserAuthStateT => state.auth.userAuthState;

export const authUserLoggedoutStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'loggedout',
);

export const authUserUknownStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'uknown',
);

export const authUserAuthenticatedStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'authenticated',
);

export const authUserMobileAuthenticatedStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'mobile',
);

export const authUserIsUnAuthenticatedStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'loggedout' || s === 'uknown',
);

export const authUserIsAuthenticatedStateSelector = createSelector(
    authUserAuthenticationStateSelector,
    s => s === 'authenticated' || s === 'mobile',
);

export const authErrorSelector = createSelector(
    authErrorMessageSelector,
    authStatusCodeSelector,
    (message, statusCode) => ({
        message,
        statusCode,
    }),
);
