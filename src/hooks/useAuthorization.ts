import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {isOnlineAppStatusSelector} from '@storage/selectors';
import {isGoodConnectionQualitySelector} from '@storage/selectors/app';
import {checkSession, mobileLogIn, register} from '@storage/actions';
import {
    authErrorSelector,
    isAuthorizedSelector,
    isLodingSelector,
    authUserMobileAuthenticatedStateSelector,
    authUserUknownStateSelector,
} from '@storage/selectors/auth';
import {onboardingFinishedSelector} from '@storage/selectors/user';

/**
 * Pseud-registration process which registers mobile device for API communication
 */
const useAuthorization = () => {
    const dispatch = useAppDispatch();
    const isRegistered = !useAppSelector(authUserUknownStateSelector);
    const userIsAuthenticatedOnlyByMobile = useAppSelector(
        authUserMobileAuthenticatedStateSelector,
    );
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const isOnline = useAppSelector(isOnlineAppStatusSelector);
    const isGoodConnectionQuality = useAppSelector(
        isGoodConnectionQualitySelector,
    );
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isAuthProcessing = useAppSelector(isLodingSelector);
    const authError = useAppSelector(authErrorSelector);

    /* Mobile (initial) Registration */
    useEffect(() => {
        /**
         * Do mobile registration process only on init app run
         */
        if (isRegistered) {
            return;
        }

        if (isOnboardingFinished && isOnline && isGoodConnectionQuality) {
            dispatch(register(true));
        }
    }, [
        dispatch,
        isOnboardingFinished,
        isOnline,
        isGoodConnectionQuality,
        isRegistered,
    ]);

    /* (Mobile) Log in */
    /**
     * Run mobile log in when user is registered
     * only as mobile device.
     */
    useEffect(() => {
        if (
            isOnline &&
            isGoodConnectionQuality &&
            isRegistered &&
            !isAuthorized &&
            userIsAuthenticatedOnlyByMobile
        ) {
            dispatch(mobileLogIn(true));
        }
    }, [
        dispatch,
        isOnline,
        isGoodConnectionQuality,
        isRegistered,
        isAuthorized,
        userIsAuthenticatedOnlyByMobile,
    ]);

    /* Check session */
    useEffect(() => {
        if (
            isOnline &&
            isGoodConnectionQuality &&
            isRegistered &&
            isAuthorized
        ) {
            dispatch(checkSession(true));
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
