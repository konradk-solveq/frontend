import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useAppSelector} from '../hooks/redux';

import OnboardingStackNavigator from './stacks/OnboardingStackNavigator';
import RegularStackNavigator from './stacks/RegularStackNavigator';

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(state => state.user.onboardingFinisehd)
    return(
        <NavigationContainer >
                {!isOnboardingFinished ? (
                    <OnboardingStackNavigator />
                ) : (
                    <RegularStackNavigator />
                )}
        </NavigationContainer>
    );
}

export default NavContainer;
