import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';

import SplashScreen from '../../pages/main/splashScreen/splashScreen';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';
import MineMenu from '../../pages/main/mainMenu';

import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';

const RegularStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="SplashScreen"
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MineMenu" component={MineMenu} />

            {/* univesal/generic pages */}
            <Stack.Screen name="ListPageInput" component={ListPageInput} />

            {/* Start add bike */}
            <Stack.Screen name="AddingByNumber" component={AddingByNumber} />
            <Stack.Screen name="AddingInfo" component={AddingInfo} />
            <Stack.Screen name="BikeData" component={BikeData} />
            <Stack.Screen name="BikeSummary" component={BikeSummary} />
            {/* End add bike */}

        </Stack.Navigator>
    );
};

export default RegularStackNavigator;
