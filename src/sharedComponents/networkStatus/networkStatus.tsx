import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import NetInfo, {
    NetInfoState,
    NetInfoStateType,
} from '@react-native-community/netinfo';

import {setAppStatus} from '../../storage/actions';
import {checkInternetConnectionQualityService} from '../../services/appService';

interface IProps {
    children?: React.ReactNode;
}

const NetworkStatus: React.FC<IProps> = ({children}: IProps) => {
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const onChangeConnectivityState = useCallback(
        async (state: NetInfoState) => {
            let newState = false;
            if (!state.isConnected || !state.isInternetReachable) {
                newState = true;
            }
            setIsConnected(newState);

            let goodInternetConnection = true;
            /* Check wifi too. Some hotspots may have poor connection quality */
            if (newState) {
                const connectionQuality = await checkInternetConnectionQualityService();
                if (connectionQuality.status === 408) {
                    goodInternetConnection = false;
                }
            }

            dispatch(
                setAppStatus(
                    newState,
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
