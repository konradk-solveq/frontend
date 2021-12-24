import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';
import {OnboardingStackRoute, BothStackRoute} from '../route';

import Tutorial from '../../pages/onboarding/tutorial/tutorial';
import GetToKnowEachOther from '../../pages/onboarding/getToKnowEachOther/getToKnowEachOther';
import TurtorialNFC from '../../pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
// import WrongScan from '../../pages/onboarding/bikeAdding/wrongScan/wrongScan';
import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
// import Loader from '../../pages/onboarding/bikeAdding/loader/loader';
import Permits from '../../pages/onboarding/permitsDeclarations/permits';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';
// import CyclingProfile from '../../pages/onboarding/cyclingProfile/cyclingProfile';
import MineMenu from '../../pages/main/mainMenu';
import InputPage from '../../sharedComponents/inputs/inputPage';

const OnboardingStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            gesturesEnabled="true"
            headerMode="none"
            initialRouteName={OnboardingStackRoute.NEW_BEGINNING_SCREEN}
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen
                name={OnboardingStackRoute.NEW_BEGINNING_SCREEN}
                component={Tutorial}
            />

            <Stack.Screen
                name={OnboardingStackRoute.PERMITS_SCREEN}
                component={Permits}
            />
            <Stack.Screen
                name={BothStackRoute.REGULATIONS_SCREEN}
                component={Regulations}
            />
            <Stack.Screen
                name={BothStackRoute.PRIVACY_POLICY_SCREEN}
                component={PrivacyPolicy}
            />

            <Stack.Screen
                name={OnboardingStackRoute.GET_TO_KNOW_EACH_OTHER_SCREEN}
                component={GetToKnowEachOther}
            />
            <Stack.Screen
                name={BothStackRoute.TURTORIAL_NFC_SCREEN}
                component={TurtorialNFC}
            />
            <Stack.Screen
                name={BothStackRoute.ADDING_BY_NUMBER_SCREEN}
                component={AddingByNumber}
            />
            <Stack.Screen
                name={BothStackRoute.ADDING_INFO_SCREEN}
                component={AddingInfo}
            />

            <Stack.Screen
                name={BothStackRoute.BIKE_DATA_SCREEN}
                component={BikeData}
            />

            <Stack.Screen
                name={BothStackRoute.BIKE_SUMMARY_SCREEN}
                component={BikeSummary}
            />

            {/* <Stack.Screen name="Loader" component={Loader} /> */}

            {/* <Stack.Screen name="WrongScan" component={WrongScan}/> */}

            {/* TODO: this change is temporary - business  decision */}
            {/* <Stack.Screen
                name={OnboardingStackRoute.CYCLING_PROFILE_SCREEN}
                component={CyclingProfile}
            /> */}

            <Stack.Screen
                name={BothStackRoute.TAB_MENU_SCREEN}
                component={MineMenu}
            />

            {/* univesal/generic pages */}
            <Stack.Screen
                name={BothStackRoute.LIST_PAGE_INPUT_SCREEN}
                component={ListPageInput}
            />
            <Stack.Screen
                name={BothStackRoute.INPUT_PAGE_SCREEN}
                component={InputPage}
            />
        </Stack.Navigator>
    );
};

export default OnboardingStackNavigator;
