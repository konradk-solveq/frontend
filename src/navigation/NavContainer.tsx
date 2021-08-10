import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {onboardingFinishedSelector} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';
import useAuthorization from '@hooks/useAuthorization';
import useAppInit from '@hooks/useAppInit';
import OnboardingStackNavigator from '@navigation/stacks/OnboardingStackNavigator';
import RegularStackNavigator from '@navigation/stacks/RegularStackNavigator';

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
