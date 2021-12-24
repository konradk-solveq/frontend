import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {onboardingFinishedSelector} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';
import useAppInit from '@hooks/useAppInit';
import OnboardingStackNavigator from '@navigation/stacks/OnboardingStackNavigator';
import RegularStackNavigator from '@navigation/stacks/RegularStackNavigator';
import {KrossTheme} from '@theme/navigationTheme';

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(
        onboardingFinishedSelector,
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
