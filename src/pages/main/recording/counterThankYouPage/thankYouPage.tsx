import React from 'react';
import {ThankYouPageContainer} from "@src/containers/World";
import GenericScreen from '@pages/template/GenericScreen';
import {useAppSelector} from "@src/hooks/redux";
import {useRoute} from '@react-navigation/native';
import {CounterParamsLsitT, CounterThankYouPageRouteT} from '@src/type/rootStack';
import {getRouteLengthCarbonEquivalent, getRouteLengthFuelEquivalent} from '@src/utils/transformData';

const ThankYouPage: React.FC = () => {
    const userName = useAppSelector<string>(state => state.user.userName);
    const route = useRoute<CounterThankYouPageRouteT>();
    const params: Required<CounterParamsLsitT["CounterThankYouPage"]> = route.params;

    return (
        <GenericScreen hideBackArrow>
            <ThankYouPageContainer
                userName={userName}
                routeParams={params}
                savingsValues={{ fuel: getRouteLengthFuelEquivalent(8, params.distance), resource: getRouteLengthCarbonEquivalent(8, 2350, params.distance) }}
            />
        </GenericScreen>
    )
}

export default ThankYouPage