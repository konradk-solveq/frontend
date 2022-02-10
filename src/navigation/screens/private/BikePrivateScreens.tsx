import React from 'react';

import {Stack} from '@navigation/stack';

import BikeCommonScreens from '@navigation/screens/common/BikeCommonScreens';
import AddingInfo from '@pages/onboarding/bikeAdding/info/info';
import TutorialNFC from '@pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import AddingByNumber from '@pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import BikeSummary from '@pages/onboarding/bikeSummary/bikeSummary';
import BikeParams from '@pages/main/bike/bikeParams/bikeParams';
import WarrantyDetails from '@pages/main/bike/warrantyDetails/warrantyDetails';
import ReviewsDetails from '@pages/main/bike/reviewsDetails/reviewsDetails';

const BikePrivateScreens = () => {
    return (
        <>
            {BikeCommonScreens()}
            <Stack.Screen name="AddingInfo" component={AddingInfo} />
            <Stack.Screen name="TutorialNFC" component={TutorialNFC} />
            <Stack.Screen name="AddingByNumber" component={AddingByNumber} />
            <Stack.Screen name="BikeSummary" component={BikeSummary} />
            <Stack.Screen name="BikeParams" component={BikeParams} />
            <Stack.Screen name="WarrantyDetails" component={WarrantyDetails} />
            <Stack.Screen name="ReviewsDetails" component={ReviewsDetails} />
        </>
    );
};

export default BikePrivateScreens;
