import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useAppSelector} from '../hooks/redux';
import useAuthorization from '../hooks/useAuthorization';
import useAppInit from '../hooks/useAppInit';

import OnboardingStackNavigator from './stacks/OnboardingStackNavigator';
import RegularStackNavigator from './stacks/RegularStackNavigator';
import {onboardingFinishedSelector} from '../storage/selectors';

const KrossTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff',
    },
};

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(
        onboardingFinishedSelector,
    );
    useAuthorization(isOnboardingFinished);
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
