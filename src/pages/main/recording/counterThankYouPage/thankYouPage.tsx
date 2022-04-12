import React, { useEffect, useState } from 'react';
import { ThankYouPageContainer } from "@src/containers/World";
import GenericScreen from '@pages/template/GenericScreen';
import { useAppSelector } from "@src/hooks/redux";
import { useRoute } from '@react-navigation/native';
import { CounterThankYouPageRouteT } from '@src/type/rootStack';

const ThankYouPage: React.FC = () => {
    const userName = useAppSelector<string>(state => state.user.userName);
    const route = useRoute<CounterThankYouPageRouteT>();
    
    return (
        <GenericScreen hideBackArrow>
            <ThankYouPageContainer userName={userName} routeParams={route.params} savedValues={{ fuel: '1', resource: '5' }} />
        </GenericScreen>
    )
}

export default ThankYouPage