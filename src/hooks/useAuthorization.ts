import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from './redux';
import {isOnlineAppStatusSelector} from '../storage/selectors';
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
    const isRegistered = useAppSelector(isRegisteredSelector);
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isAuthProcessing = useAppSelector(isLodingSelector);
    const authError = useAppSelector(authErrorSelector);

    /* Registration */
    useEffect(() => {
        if (active && isOnline && !isRegistered) {
            dispatch(register());
        }
    }, [dispatch, active, isOnline, isRegistered]);

    /* Log in */
    useEffect(() => {
        if (isOnline && isRegistered && !isAuthorized) {
            dispatch(logIn());
        }
    }, [dispatch, isOnline, isRegistered, isAuthorized]);

    /* Refresh session */
    useEffect(() => {
        if (isOnline && isRegistered && isAuthorized) {
            dispatch(checkSession());
        }
    }, [dispatch, isOnline, isRegistered, isAuthorized]);

    return {
        authError,
        isAuthorized,
        isAuthProcessing,
        isRegistered,
    };
};

export default useAuthorization;
