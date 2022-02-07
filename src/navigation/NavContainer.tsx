import React, {useRef, RefObject} from 'react';
import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';

import {onboardingFinishedSelector} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';
import useAppInit from '@hooks/useAppInit';
import OnboardingStackNavigator from '@navigation/stacks/OnboardingStackNavigator';
import RegularStackNavigator from '@navigation/stacks/RegularStackNavigator';
import {KrossTheme} from '@theme/navigationTheme';

import {getScreenName} from '@navigation/utils/navigation';
import {sendAnalyticInfoAboutNewScreen} from '@analytics/firebaseAnalytics';

import {linking} from './linking';

const NavContainer: React.FC = () => {
    const isOnboardingFinished: boolean = useAppSelector(
        onboardingFinishedSelector,
    );
    useAppInit();

    const routeNameRef = useRef<string | undefined>();
    const navigationRef: RefObject<NavigationContainerRef> = useRef(null);

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={KrossTheme}
            linking={linking}
            onReady={async () => {
                const routeName = await getScreenName(navigationRef);
                if (routeName) {
                    routeNameRef.current = routeName;
                }
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = await getScreenName(navigationRef);

                if (currentRouteName) {
                    await sendAnalyticInfoAboutNewScreen(
                        currentRouteName,
                        previousRouteName,
                    );
                }

                routeNameRef.current = currentRouteName;
            }}>
            {!isOnboardingFinished ? (
                <OnboardingStackNavigator />
            ) : (
                <RegularStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default NavContainer;
