import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';

import SplashScreen from '../../pages/main/splashScreen/splashScreen';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';
import InputPage from '../../sharedComponents/inputs/inputPage';
import MineMenu from '../../pages/main/mainMenu';

import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import TurtorialNFC from '../../pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';
import ServicesMap from '../../pages/main/bike/servicesMap/servicesMap';
import AboutApp from '../../pages/main/profile/aboutApp/aboutApp';
import RewiewsDetails from '../../pages/main/bike/rewiewsDetails/rewiewsDetails';

const RegularStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="SplashScreen"
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MineMenu" component={MineMenu} />

            {/* Start add bike */}
            <Stack.Screen name="AddingByNumber" component={AddingByNumber} />
            <Stack.Screen name="TurtorialNFC" component={TurtorialNFC} />
            <Stack.Screen name="AddingInfo" component={AddingInfo} />
            <Stack.Screen name="BikeData" component={BikeData} />
            <Stack.Screen name="BikeSummary" component={BikeSummary} />
            <Stack.Screen name="ServicesMap" component={ServicesMap} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="RewiewsDetails" component={RewiewsDetails} />
            {/* End add bike */}

            {/* univesal/generic pages */}
            <Stack.Screen name="ListPageInput" component={ListPageInput} />
            <Stack.Screen name="InputPage" component={InputPage} />
        </Stack.Navigator>
    );
};

export default RegularStackNavigator;
