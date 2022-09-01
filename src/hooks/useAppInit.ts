import {useCallback, useEffect, useRef} from 'react';
import {State} from 'react-native-background-geolocation';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {
    appSyncData,
    clearAppError,
    synchMapsData,
    setApiAuthHeaderState,
} from '@storage/actions';
import {
    authTokenSelector,
    authUserIsAuthenticatedStateSelector,
    onboardingFinishedSelector,
    userIdSelector,
    appErrorSelector,
    isOnlineAppStatusSelector,
    syncAppSelector,
    userNameSelector,
    focusedOnRecordingScreenSelector,
    heavyTaskProcessingSelector,
} from '@storage/selectors';
import {
    globalLocationSelector,
    isGoodConnectionQualitySelector,
    isInitMapsDataSynchedSelector,
} from '@storage/selectors';

import {setAutorizationHeader} from '@api/api';
import {cleanUp, initBGeolocalization} from '@utils/geolocation';
import {sentrySetUserInfo} from '@sentryLogger/sentryLogger';
import {enableAnalytics} from '@analytics/firebaseAnalytics';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import useLanguageReloader from './useLanguageReloader';

const useAppInit = () => {
    useLanguageReloader();

    const {t} = useMergedTranslation('Geolocation.notification');

    const dispatch = useAppDispatch();
    const geolocationStateRef = useRef<State>();
    const dataInitializedref = useRef(false);
    const isOnline = useAppSelector<boolean>(isOnlineAppStatusSelector);
    const isGoodInternetConnectionQuality = useAppSelector(
        isGoodConnectionQualitySelector,
    );
    const userId = useAppSelector<string>(userIdSelector);
    const authToken = useAppSelector<string>(authTokenSelector);
    const userName = useAppSelector<string>(userNameSelector);
    const syncStatus = useAppSelector(syncAppSelector);
    const isAuthanticated = useAppSelector(
        authUserIsAuthenticatedStateSelector,
    );
    const location = useAppSelector(globalLocationSelector);
    const initMapsDataSynched = useAppSelector(isInitMapsDataSynchedSelector);
    const error = useAppSelector(
        appErrorSelector,
    ); /* TODO: check all errors from sync requests */
    const isOnboardingFinished = useAppSelector(onboardingFinishedSelector);
    const isAppFocusedOnRecordingScreen = useAppSelector(
        focusedOnRecordingScreenSelector,
    );
    /**
     * Temporary solution. In the end those action
     * like sync data, should be run on background thread
     */
    const isAppDuringHeavyTaskPRocess = useAppSelector(
        heavyTaskProcessingSelector,
    );

    const clearAppSyncError = () => {
        dispatch(clearAppError());
    };

    const synchData = useCallback(async () => {
        await dispatch(appSyncData());
        dataInitializedref.current = true;
    }, [dispatch]);

    /* Set token in axios instance */
    useEffect(() => {
        if (authToken) {
            setAutorizationHeader(authToken);
            dispatch(setApiAuthHeaderState(true));
        }
    }, [authToken, dispatch]);

    useEffect(() => {
        sentrySetUserInfo({
            id: userId,
            username: userName,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const init = async () => {
            const geolocation = await initBGeolocalization(t('text'));
            if (geolocation) {
                geolocationStateRef.current = geolocation;
            }
        };
        init();

        return () => {
            cleanUp();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let time: NodeJS.Timeout;
        if (
            isOnline &&
            isGoodInternetConnectionQuality &&
            !syncStatus &&
            isAuthanticated
        ) {
            time = setTimeout(() => {
                synchData();
            }, 500);
        }

        return () => {
            clearTimeout(time);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline, isGoodInternetConnectionQuality, isAuthanticated]);

    /* Init analytics */
    useEffect(() => {
        const init = async () => {
            if (
                !__DEV__ &&
                !process.env.JEST_WORKER_ID &&
                isOnboardingFinished
            ) {
                await enableAnalytics();
            }
        };

        init();
    }, [isOnboardingFinished]);

    /**
     * Fetch map data if initially wasn't
     */
    useEffect(() => {
        if (
            !initMapsDataSynched &&
            location &&
            dataInitializedref.current &&
            !isAppFocusedOnRecordingScreen &&
            !isAppDuringHeavyTaskPRocess
        ) {
            dispatch(synchMapsData());
        }
    }, [
        dispatch,
        location,
        initMapsDataSynched,
        isAppFocusedOnRecordingScreen,
        isAppDuringHeavyTaskPRocess,
    ]);

    return {
        isOnline,
        syncStatus,
        error,
        clearAppSyncError,
    };
};

export default useAppInit;
