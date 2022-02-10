import React, {useRef, RefObject, useEffect} from 'react';
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
    const isAppRunFirstTime = useRef(false);

    /**
     * Check if it is app initial run
     */
    useEffect(() => {
        isAppRunFirstTime.current = !isOnboardingFinished;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <RegularStackNavigator
                    skipSplashScreen={isAppRunFirstTime.current}
                />
            )}
        </NavigationContainer>
    );
};

export default NavContainer;
