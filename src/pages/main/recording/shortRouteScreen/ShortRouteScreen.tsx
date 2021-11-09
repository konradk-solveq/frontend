import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {RegularStackRoute} from '@navigation/route';
import {RootStackType} from '@type/rootStack';
import {useAppDispatch} from '@hooks/redux';
import {abortSyncCurrentRouteData} from '@storage/actions/routes';

import ShortRouteBody from '@sharedComponents/modals/body/shortRouteBody';

const ShortRouteScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackType>>();

    const [isProcessing, setIsProcessing] = useState(false);

    const onCloseHandler = async () => {
        setIsProcessing(true);
        await dispatch(abortSyncCurrentRouteData(true, true));

        navigation.navigate(
            RegularStackRoute.HOME_SCREEN as keyof RootStackType,
        );
    };

    return (
        <ShortRouteBody onClose={onCloseHandler} withBtnLoader={isProcessing} />
    );
};

export default ShortRouteScreen;
