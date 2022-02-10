import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';
import {OnboardingStackRoute} from '../route';

import Tutorial from '../../pages/onboarding/tutorial/tutorial';
import GetToKnowEachOther from '../../pages/onboarding/getToKnowEachOther/getToKnowEachOther';
import TurtorialNFC from '../../pages/onboarding/bikeAdding/turtorialNFC/turtorialNFC';
import AddingByNumber from '../../pages/onboarding/bikeAdding/addingByNumber/addingByNumber';
import AddingInfo from '../../pages/onboarding/bikeAdding/info/info';
import Permits from '../../pages/onboarding/permitsDeclarations/permits';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import BikeData from '../../pages/onboarding/bikeData/bikeData';
import BikeSummary from '../../pages/onboarding/bikeSummary/bikeSummary';
import ListPageInput from '../../sharedComponents/inputs/listPageInput';

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
                name={OnboardingStackRoute.REGULATIONS_ONBOARDING_SCREEN}
                component={Regulations}
            />
            <Stack.Screen
                name={OnboardingStackRoute.PRIVACY_POLICY_ONBOARDING_SCREEN}
                component={PrivacyPolicy}
            />

            <Stack.Screen
                name={OnboardingStackRoute.GET_TO_KNOW_EACH_OTHER_SCREEN}
                component={GetToKnowEachOther}
            />
            <Stack.Screen
                name={OnboardingStackRoute.TURTORIAL_NFC_ONBOARDING_SCREEN}
                component={TurtorialNFC}
            />
            <Stack.Screen
                name={OnboardingStackRoute.ADDING_BY_NUMBER_ONBOARDING_SCREEN}
                component={AddingByNumber}
            />
            <Stack.Screen
                name={OnboardingStackRoute.ADDING_INFO_ONBOARDING_SCREEN}
                component={AddingInfo}
            />

            <Stack.Screen
                name={OnboardingStackRoute.BIKE_DATA_ONBOARDING_SCREEN}
                component={BikeData}
            />

            <Stack.Screen
                name={OnboardingStackRoute.BIKE_SUMMARY_ONBOARDING_SCREEN}
                component={BikeSummary}
            />

            {/* <Stack.Screen name="Loader" component={Loader} /> */}

            {/* <Stack.Screen name="WrongScan" component={WrongScan}/> */}

            {/* TODO: this change is temporary - business  decision */}
            {/* <Stack.Screen
                name={OnboardingStackRoute.CYCLING_PROFILE_SCREEN}
                component={CyclingProfile}
            /> */}

            {/* <Stack.Screen
                name={OnboardingStackRoute.TAB_MENU_ONBOARDING_SCREEN}
                component={MineMenu}
            /> */}

            {/* univesal/generic pages */}
            <Stack.Screen
                name={OnboardingStackRoute.LIST_PAGE_INPUT_ONBOARDING_SCREEN}
                component={ListPageInput}
            />
            <Stack.Screen
                name={OnboardingStackRoute.INPUT_PAGE_ONBOARDING_SCREEN}
                component={InputPage}
            />
        </Stack.Navigator>
    );
};

export default OnboardingStackNavigator;
