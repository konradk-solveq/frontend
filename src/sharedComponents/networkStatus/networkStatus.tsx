import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

import {setAppStatus} from '../../storage/actions';

interface IProps {
    children?: React.ReactNode;
}

const NetworkStatus: React.FC<IProps> = ({children}: IProps) => {
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const onChangeConnectivityState = (state: NetInfoState) => {
        let newState = false;
        if (state.isConnected || state.isInternetReachable) {
            newState = true;
        }
        setIsConnected(newState);

        dispatch(setAppStatus(newState));
    };

    useEffect(() => {
        NetInfo.addEventListener(onChangeConnectivityState);
        NetInfo.fetch().then(state => {
            onChangeConnectivityState(state);
        });

        return () => {
            NetInfo.addEventListener(state => {
                onChangeConnectivityState(state);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* TODO: show network status bar based on <isConnected> */
    return <>{children}</>;
};

export default NetworkStatus;
