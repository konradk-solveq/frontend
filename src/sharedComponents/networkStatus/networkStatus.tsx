import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

import {setAppStatus} from '../../storage/actions';
import {useCallback} from 'react';

interface IProps {
    children?: React.ReactNode;
}

const NetworkStatus: React.FC<IProps> = ({children}: IProps) => {
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const onChangeConnectivityState = useCallback(
        (state: NetInfoState) => {
            let newState = false;
            if (state.isConnected || state.isInternetReachable) {
                newState = true;
            }
            setIsConnected(newState);

            dispatch(setAppStatus(newState));
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
