import {useEffect, useState} from 'react';

import {initCrashlytics} from '../utils/crashlytics';
import {useAppDispatch, useAppSelector} from './redux';
import {fetchAppRegulations, clearAppError} from '../storage/actions/app';

const useAppInit = () => {
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);
    const userName = useAppSelector<string>(state => state.user.userName);
    const syncStatus = useAppSelector(state => state.app.sync);
    const error = useAppSelector(state => ({
        message: state.app.error,
        statusCode: state.app.statusCode,
    }));

    const [crashlyticsInitialized, setCrashlyticsInitialized] = useState(false);
    const [dataInitialized, setDataInitialized] = useState(false);

    const clearAppSyncError = () => {
        dispatch(clearAppError());
    };

    const synchData = async () => {
        dispatch(fetchAppRegulations());
        setDataInitialized(true);
    };

    useEffect(() => {
        /* Logs will be send after app restarted */
        initCrashlytics(userName);
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
        crashlyticsInitialized,
        dataInitialized,
        isOnline,
        syncStatus,
        error,
        clearAppSyncError,
    };
};

export default useAppInit;
