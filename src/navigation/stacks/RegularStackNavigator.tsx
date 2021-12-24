import React, {useEffect, useMemo, useRef} from 'react';
import {Stack} from '@navigation/stack';

import {
    AuthParamsListT,
    GeneralParamsListT,
    RootStackType,
} from '@type/rootStack';
import {
    trackerActiveSelector,
    authUserLoggedoutStateSelector,
    authUserAuthenticatedStateSelector,
} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';

import {horizontalAnim} from '@helpers/positioning';
import {
    AuthenticationScreens,
    BikePrivateScreens,
    BikePublicScreens,
    KrossWorldCommonScreens,
    ProfileCommonScreens,
    RecordRouteCommonScreens,
} from '@navigation/screens/index';

import TabMenu from '@pages/main/tabMenu';
import SplashScreen from '@pages/main/splashScreen/splashScreen';
import newRegulations from '@pages/main/newRegulations/newRegulations';
import NewAppVersion from '@pages/main/newAppVersion/newAppVersion';
import useAuthorization from '@src/hooks/useAuthorization';

const timeout = 2500;

const PrivateScreens = () => <>{BikePrivateScreens()}</>;

const PublicScreens = () => (
    <>
        {AuthenticationScreens()}
        {BikePublicScreens()}
    </>
);

const RegularScreens = (isAuthenticated: boolean) => (
    <>
        <Stack.Screen name="TabMenu" component={TabMenu} />
        <Stack.Screen name="NewRegulations" component={newRegulations} />
        <Stack.Screen name="NewAppVersion" component={NewAppVersion} />
        {isAuthenticated ? PrivateScreens() : PublicScreens()}
        {KrossWorldCommonScreens()}
        {RecordRouteCommonScreens()}
        {ProfileCommonScreens()}
    </>
);

const RegularStackNavigator: React.FC = () => {
    const isActive = useAppSelector(trackerActiveSelector);
    const initialRun = useRef(true);

    /**
     * This variable will be used to check if user already registered and logout.
     * No matters how (session timeout or explicitly by log out action).
     *
     * If lrue, login screen will be first shown ater app realaunch (no demo access).
     */
    const userLoggedOut = useAppSelector(authUserLoggedoutStateSelector);

    /**
     * This variable will be used to check if user has been already authenticated.
     * No matters how mobile (auto) or regular login.
     */
    const userAuthenticated = useAppSelector(
        authUserAuthenticatedStateSelector,
    );

    useAuthorization();

    useEffect(() => {
        // TODO: fix the issue with showing SplashScreen after user has logged in
        const t = setTimeout(() => (initialRun.current = false), timeout);

        return () => {
            initialRun.current = true;
            clearTimeout(t);
        };
    }, []);

    const regularInitialRouteName = useMemo<keyof RootStackType>(
        () =>
            userLoggedOut && !initialRun.current
                ? 'LoginScreen'
                : 'SplashScreen',
        [userLoggedOut],
    );

    const initInitialRouteName = useMemo<keyof RootStackType>(
        () => (!isActive ? regularInitialRouteName : 'TabMenu'),
        [isActive, regularInitialRouteName],
    );

    const screenToRedirectFromSplashScreen = useMemo<
        keyof GeneralParamsListT | keyof AuthParamsListT
    >(() => (userLoggedOut ? 'LoginScreen' : 'TabMenu'), [userLoggedOut]);

    const StackScreens = useMemo(
        () =>
            userLoggedOut
                ? AuthenticationScreens()
                : RegularScreens(userAuthenticated),
        [userLoggedOut, userAuthenticated],
    );

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={initInitialRouteName}
            mode="modal"
            screenOptions={horizontalAnim}>
            {!initialRun.current ? null : (
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    initialParams={{
                        redirectToScreen: screenToRedirectFromSplashScreen,
                    }}
                />
            )}
            {StackScreens}
        </Stack.Navigator>
    );
};

export default RegularStackNavigator;
