import React, {useRef, RefObject, useEffect, useMemo} from 'react';
import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';

import {
    onboardingFinishedSelector,
    trackerActiveSelector,
} from '@storage/selectors';
import {RootStackType} from '@type/rootStack';
import {useAppSelector} from '@hooks/redux';
import useAppInit from '@hooks/useAppInit';
import OnboardingStackNavigator from '@navigation/stacks/OnboardingStackNavigator';
import RegularStackNavigator from '@navigation/stacks/RegularStackNavigator';
import {KrossTheme} from '@theme/navigationTheme';

import {getScreenName} from '@navigation/utils/navigation';
import {sendAnalyticInfoAboutNewScreen} from '@analytics/firebaseAnalytics';

import {linking} from './linking';

const NavContainer: React.FC = () => {
    const isActive = useAppSelector(trackerActiveSelector);
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

    const regularInitialRouteName = useMemo<keyof RootStackType>(
        () =>
            (isOnboardingFinished && isAppRunFirstTime.current) || isActive
                ? 'TabMenu'
                : 'SplashScreen',
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isOnboardingFinished],
    );

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
                    initInitialRouteName={regularInitialRouteName}
                />
            )}
        </NavigationContainer>
    );
};

export default React.memo(NavContainer);
