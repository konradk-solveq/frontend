import {useEffect, useRef, useCallback} from 'react';
import {State} from 'react-native-background-geolocation-android';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {appSyncData, clearAppError} from '@storage/actions/app';
import {
    authTokenSelector,
    userIdSelector,
    authUserIsAuthenticatedStateSelector,
} from '@storage/selectors/index';
import {
    appErrorSelector,
    isOnlineAppStatusSelector,
    syncAppSelector,
    userNameSelector,
} from '@storage/selectors';
import {isGoodConnectionQualitySelector} from '@storage/selectors/app';

import {setAutorizationHeader} from '@api/api';
import {initBGeolocalization, cleanUp} from '@utils/geolocation';
import {I18n} from '@translations/I18n';
import {sentrySetUserInfo} from '@sentryLogger/sentryLogger';

const useAppInit = () => {
    const trans: any = I18n.t('Geolocation.notification');
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
    const error = useAppSelector(
        appErrorSelector,
    ); /* TODO: check all errors from sync requests */

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
        }
    }, [authToken]);

    useEffect(() => {
        sentrySetUserInfo({
            id: userId,
            username: userName,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const init = async () => {
            const geolocation = await initBGeolocalization(trans.title);
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
        let t: NodeJS.Timeout;
        if (
            isOnline &&
            isGoodInternetConnectionQuality &&
            !syncStatus &&
            isAuthanticated
        ) {
            t = setTimeout(() => {
                synchData();
            }, 500);
        }

        return () => {
            clearTimeout(t);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline, isGoodInternetConnectionQuality, isAuthanticated]);

    return {
        isOnline,
        syncStatus,
        error,
        clearAppSyncError,
    };
};

export default useAppInit;
