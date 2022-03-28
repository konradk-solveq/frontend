import React from 'react';

import {Stack} from '@navigation/stack';
import {verticalAnim} from '@helpers/positioningVerical';

import ServicesMap from '@pages/main/bike/servicesMap/servicesMap';
import {AddOtherBikeScreen} from '@pages/main/addBike';

const BikeCommonScreens = () => (
    <>
        <Stack.Screen
            name="AddOtherBike"
            component={AddOtherBikeScreen}
            options={{
                ...verticalAnim,
            }}
        />
        <Stack.Screen
            name="ServicesMap"
            component={ServicesMap}
            options={{gestureEnabled: false}}
        />
    </>
);

export default BikeCommonScreens;
