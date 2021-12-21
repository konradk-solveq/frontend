import React, {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

import {setAppStatus} from '../../storage/actions';
import {checkInternetConnectionQualityService} from '../../services/appService';

interface IProps {
    children?: React.ReactNode;
}

const NetworkStatus: React.FC<IProps> = ({children}: IProps) => {
    const dispatch = useDispatch();

    const onChangeConnectivityState = useCallback(
        async (state: NetInfoState) => {
            let isOffline = false;
            if (!state.isConnected || !state.isInternetReachable) {
                isOffline = true;
            }

            let goodInternetConnection = true;
            /* Check wifi too. Some hotspots may have poor connection quality */
            if (!isOffline) {
                const connectionQuality = await checkInternetConnectionQualityService();
                if (connectionQuality.status === 408) {
                    goodInternetConnection = false;
                }
            }

            dispatch(
                setAppStatus(
                    isOffline,
                    state.type,
                    state?.details?.cellularGeneration,
                    goodInternetConnection,
                ),
            );
        },
        [dispatch],
    );

    useEffect(() => {
        const netInfoListener = NetInfo.addEventListener(state => {
            onChangeConnectivityState(state);
        });

        return () => {
            netInfoListener();
        };
    }, [onChangeConnectivityState]);

    /* TODO: show network status bar based on <isConnected> */
    return <>{children}</>;
};

export default NetworkStatus;
