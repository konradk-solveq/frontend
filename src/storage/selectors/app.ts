import {RootState} from '../storage';

export const syncAppSelector = (state: RootState): boolean => state.app.sync;

export const isOnlineAppStatusSelector = (state: RootState): boolean =>
    !state.app.isOffline;

export const appErrorSelector = (
    state: RootState,
): {message: string; statusCode: number} => ({
    message: state.app.error,
    statusCode: state.app.statusCode,
});
