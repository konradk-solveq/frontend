import React from 'react';
import {Stack} from '@navigation/stack';

import {verticalAnim} from '@helpers/positioningVerical';

import Counter from '@pages/main/recording/counter/counter';
import CounterThankYouPage from '@pages/main/recording/counterThankYouPage/counterThankYouPage';
import ShortRouteScreen from '@pages/main/recording/shortRouteScreen/ShortRouteScreen';
import ThankYouPage from '@src/pages/main/recording/counterThankYouPage/thankYouPage';

const RecordRouteCommonScreens = () => {
    return (
        <>
            <Stack.Screen name="Counter" component={Counter} />
            <Stack.Screen
                name="CounterThankYouPage"
                component={ThankYouPage}
                options={{gestureEnabled: false}}
            />
            <Stack.Screen
                name="ShortRouteScreen"
                component={ShortRouteScreen}
                options={{
                    ...verticalAnim,
                }}
            />
        </>
    );
};

export default RecordRouteCommonScreens;
