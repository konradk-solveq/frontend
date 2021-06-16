import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useAppSelector} from '../hooks/redux';

import OnboardingStackNavigator from './stacks/OnboardingStackNavigator';
import RegularStackNavigator from './stacks/RegularStackNavigator';
import useAppInit from '../hooks/useAppInit';

const KrossTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff',
    },
};

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(
        state => state.user.onboardingFinished,
    );
    useAppInit();

    return (
        <NavigationContainer theme={KrossTheme}>
            {!isOnboardingFinished ? (
                <OnboardingStackNavigator />
            ) : (
                <RegularStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default NavContainer;
