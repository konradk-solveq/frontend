import React from 'react';
import {Stack} from './../stack';
import {horizontalAnim} from '../../helpers/positioning';
import {OnboardingStackRoute} from '../route';

import Tutorial from '../../pages/onboarding/tutorial/tutorial';
import GetToKnowEachOther from '../../pages/onboarding/getToKnowEachOther/getToKnowEachOther';
import Permits from '../../pages/onboarding/permitsDeclarations/permits';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import SplashScreen from '@pages/onboarding/splashScreen/splashScreen';
import LocationUsageInfo from '@pages/onboarding/locationUsageInfo/locationUsageInfo';

const OnboardingStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={'SplashScreen'}
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen
                name={OnboardingStackRoute.SPLASH_ONBOARDING_SCREEN}
                component={SplashScreen}
            />
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
                name={OnboardingStackRoute.LOCATION_USAGE_INFO_SCREEN}
                component={LocationUsageInfo}
            />
        </Stack.Navigator>
    );
};

export default OnboardingStackNavigator;
