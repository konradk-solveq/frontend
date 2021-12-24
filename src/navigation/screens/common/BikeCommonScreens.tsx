import React from 'react';

import {Stack} from '@navigation/stack';

import BikeData from '@pages/onboarding/bikeData/bikeData';
import ServicesMap from '@pages/main/bike/servicesMap/servicesMap';

const BikeCommonScreens = () => (
    <>
        <Stack.Screen name="BikeData" component={BikeData} />
        <Stack.Screen
            name="ServicesMap"
            component={ServicesMap}
            options={{gestureEnabled: false}}
        />
    </>
);

export default BikeCommonScreens;
