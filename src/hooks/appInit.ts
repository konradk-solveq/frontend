import {useEffect, useState} from 'react';
import {State} from 'react-native-background-geolocation';

import {I18n} from '../../I18n/I18n';
import {initCrashlytics} from '../utils/crashlytics';
import {initBGeolocalization, cleanUp} from '../utils/geolocation';
import {useAppDispatch, useAppSelector} from './redux';
import {appSyncData, clearAppError} from '../storage/actions/app';
import {userIdSelector} from '../storage/selectors/auth';
import {
    appErrorSelector,
    isOnlineAppStatusSelector,
    syncAppSelector,
} from '../storage/selectors';

const useAppInit = () => {
    const trans: any = I18n.t('Geolocation.notification');
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(isOnlineAppStatusSelector);
    const userId = useAppSelector<string>(userIdSelector);
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
        /* Logs will be send after app restarted */
        initCrashlytics(userName, userId);
        setCrashlyticsInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isOnline) {
            synchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
