import React from 'react';
import { Stack } from './../stack';
import { horizontalAnim } from '../../helpers/positioning';

import Beginning from '../../pages/onboarding/beginning/beginning';
import Onboarding from '../../pages/onboarding/onboarding';
import GetToKnowEachOther from '../../pages/onboarding/getToKnowEachOther/getToKnowEachOther';
import TurtorialNFC from '../../pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import WrongScan from '../../pages/onboarding/bikeAdding/wrongScan/wrongScan';
import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
import Loader from '../../pages/onboarding/bikeAdding/loader/loader';
import PermitsDeclarations from '../../pages/onboarding/permitsDeclarations/permitsDeclarations';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';
import CyclingProfile from '../../pages/onboarding/cyclingProfile/cyclingProfile';
import MineMenu from '../../pages/main/mainMenu';

const OnboardingStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Onboarding"
            mode="modal"
            screenOptions={horizontalAnim}>

            {/* <Stack.Screen name="Beginning" component={Beginning} /> */}

            <Stack.Screen
                name="PermitsDeclarations"
                component={PermitsDeclarations}
            />
            <Stack.Screen name="Regulations" component={Regulations} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

            <Stack.Screen
                name="GetToKnowEachOther"
                component={GetToKnowEachOther}
            />
            {/* <Stack.Screen name="TurtorialNFC" component={TurtorialNFC} /> */}
            <Stack.Screen name="AddingByNumber" component={AddingByNumber} />
            <Stack.Screen name="AddingInfo" component={AddingInfo} />

            <Stack.Screen name="BikeData" component={BikeData} />

            <Stack.Screen name="BikeSummary" component={BikeSummary} />

            {/* <Stack.Screen name="Loader" component={Loader} /> */}

            {/* <Stack.Screen name="WrongScan" component={WrongScan}/> */}

            {/* TODO: this change is temporary - business  decision */}
            {/* <Stack.Screen name="CyclingProfile" component={CyclingProfile} /> */}

            <Stack.Screen name="MineMenu" component={MineMenu} />

            {/* univesal/generic pages */}
            <Stack.Screen name="ListPageInput" component={ListPageInput} />
        </Stack.Navigator>
    );
};

export default OnboardingStackNavigator;
