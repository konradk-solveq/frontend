import {useEffect, useState} from 'react';
import {State} from 'react-native-background-geolocation-android';

import {I18n} from '../../I18n/I18n';
import {initCrashlytics} from '../utils/crashlytics';
import {initBGeolocalization, cleanUp} from '../utils/geolocation';
import {useAppDispatch, useAppSelector} from './redux';
import {appSyncData, clearAppError} from '../storage/actions/app';
import {authTokenSelector, userIdSelector} from '../storage/selectors/auth';
import {
    appErrorSelector,
    isOnlineAppStatusSelector,
    syncAppSelector,
} from '../storage/selectors';
import {setAutorizationHeader} from '../api/api';

const useAppInit = () => {
    const trans: any = I18n.t('Geolocation.notification');
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(isOnlineAppStatusSelector);
    const userId = useAppSelector<string>(userIdSelector);
    const authToken = useAppSelector<string>(authTokenSelector);
    const userName = useAppSelector<string>(state => state.user.userName);
    const syncStatus = useAppSelector(syncAppSelector);
    const error = useAppSelector(
        appErrorSelector,
    ); /* TODO: check all errors from sync requests */

    const [geolocationState, setGeolocationState] = useState<State>();
    const [crashlyticsInitialized, setCrashlyticsInitialized] = useState(false);
    const [dataInitialized, setDataInitialized] = useState(false);

    const clearAppSyncError = () => {
        dispatch(clearAppError());
    };

    const synchData = async () => {
        dispatch(appSyncData());
        setDataInitialized(true);
    };

    /* Set token in axios instance */
    useEffect(() => {
        if (authToken) {
            setAutorizationHeader(authToken);
        }
    }, [authToken]);

    useEffect(() => {
        /* Logs will be send after app restarted */
        initCrashlytics(userName, userId);
        setCrashlyticsInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const init = async () => {
            const geolocation = await initBGeolocalization(trans.title);
            setGeolocationState(geolocation);
        };
        init();

        return () => {
            cleanUp();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isOnline && authToken) {
            synchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    return {
        geolocationState,
        crashlyticsInitialized,
        dataInitialized,
        isOnline,
        syncStatus,
        error,
        clearAppSyncError,
    };
};

export default useAppInit;
