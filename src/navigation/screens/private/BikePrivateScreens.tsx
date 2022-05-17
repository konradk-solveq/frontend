import React from 'react';

import {Stack} from '@navigation/stack';

import {verticalAnim} from '@helpers/positioningVerical';

import BikeCommonScreens from '@navigation/screens/common/BikeCommonScreens';
import {AddBikeScreen, AddBikeByNumberScreen} from '@src/pages/main/addBike';
import BikeParams from '@pages/main/bike/bikeParams/bikeParams';
import WarrantyDetails from '@pages/main/bike/warrantyDetails/warrantyDetails';
import ReviewsDetails from '@pages/main/bike/reviewsDetails/reviewsDetails';
import AddBikeFrameInfo from '@pages/main/addBike/addBikeFrameInfo/AddBikeFrameInfo';

const BikePrivateScreens = () => {
    return (
        <>
            {BikeCommonScreens()}
            <Stack.Screen
                name="AddBike"
                component={AddBikeScreen}
                options={{
                    ...verticalAnim,
                }}
            />
            <Stack.Screen
                name="AddBikeByNumber"
                component={AddBikeByNumberScreen}
            />
            <Stack.Screen name="AddingInfo" component={AddBikeFrameInfo} />
            <Stack.Screen name="BikeParams" component={BikeParams} />
            <Stack.Screen name="WarrantyDetails" component={WarrantyDetails} />
            <Stack.Screen name="ReviewsDetails" component={ReviewsDetails} />
        </>
    );
};

export default BikePrivateScreens;
