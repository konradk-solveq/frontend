import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../hooks/redux';

import OnboardingStackNavigator from './stacks/OnboardingStackNavigator';
import RegularStackNavigator from './stacks/RegularStackNavigator';
import {onboardingFinishedSelector} from '../storage/selectors';

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(
        onboardingFinishedSelector,
    );

    return (
        <NavigationContainer>
            {!isOnboardingFinished ? (
                <OnboardingStackNavigator />
            ) : (
                <RegularStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default NavContainer;
