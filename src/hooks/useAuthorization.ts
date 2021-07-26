import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from './redux';
import {isOnlineAppStatusSelector} from '../storage/selectors';
import {isGoodConnectionQualitySelector} from '../storage/selectors/app';
import {checkSession, logIn, register} from '../storage/actions';
import {
    authErrorSelector,
    isAuthorizedSelector,
    isLodingSelector,
    isRegisteredSelector,
} from '../storage/selectors/auth';

const useAuthorization = (active: boolean) => {
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector(isOnlineAppStatusSelector);
    const isGoodConnectionQuality = useAppSelector(
        isGoodConnectionQualitySelector,
    );
    const isRegistered = useAppSelector(isRegisteredSelector);
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isAuthProcessing = useAppSelector(isLodingSelector);
    const authError = useAppSelector(authErrorSelector);

    /* Registration */
    useEffect(() => {
        if (active && isOnline && isGoodConnectionQuality && !isRegistered) {
            dispatch(register());
        }
    }, [dispatch, active, isOnline, isGoodConnectionQuality, isRegistered]);

    /* Log in */
    useEffect(() => {
        if (
            isOnline &&
            isGoodConnectionQuality &&
            isRegistered &&
            !isAuthorized
        ) {
            dispatch(logIn());
        }
    }, [
        dispatch,
        isOnline,
        isGoodConnectionQuality,
        isRegistered,
        isAuthorized,
    ]);

    /* Refresh session */
    useEffect(() => {
        if (
            isOnline &&
            isGoodConnectionQuality &&
            isRegistered &&
            isAuthorized
        ) {
            dispatch(checkSession());
        }
    }, [
        dispatch,
        isOnline,
        isGoodConnectionQuality,
        isRegistered,
        isAuthorized,
    ]);

    return {
        authError,
        isAuthorized,
        isAuthProcessing,
        isRegistered,
    };
};

export default useAuthorization;
