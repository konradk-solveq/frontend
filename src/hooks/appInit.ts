import {useEffect, useState} from 'react';
import {State} from 'react-native-background-geolocation';

import {I18n} from '../../I18n/I18n';
import {initCrashlytics} from '../utils/crashlytics';
import {initBGeolocalization, cleanUp} from '../utils/geolocation';
import {
    setBikesListByFrameNumbers,
    fetchGenericBikeData,
} from '../storage/actions/bikes';
import {fetchMapsList} from '../storage/actions';
import {useAppDispatch, useAppSelector} from './redux';

const useAppInit = () => {
    const trans: any = I18n.t('Geolocation.notification');
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);
    const userName = useAppSelector<string>(state => state.user.userName);

    const [geolocationState, setGeolocationState] = useState<State>();
    const [crashlyticsInitialized, setCrashlyticsInitialized] = useState(false);
    const [dataInitialized, setDataInitialized] = useState(false);

    const synchData = async () => {
        dispatch(fetchGenericBikeData());
        dispatch(setBikesListByFrameNumbers());
        dispatch(fetchMapsList());
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
        geolocationState,
        crashlyticsInitialized,
        dataInitialized,
        isOnline,
    };
};

export default useAppInit;
