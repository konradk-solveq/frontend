import React, {useEffect, useMemo, useRef} from 'react';
import {Stack} from '@navigation/stack';

import {
    AuthParamsListT,
    GeneralParamsListT,
    RootStackType,
} from '@type/rootStack';
import {trackerActiveSelector} from '@storage/selectors';
import {useAppSelector} from '@hooks/redux';

import {horizontalAnim} from '@helpers/positioning';
import {
    BikePrivateScreens,
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

const RegularScreens = () => (
    <>
        <Stack.Screen name="TabMenu" component={TabMenu} />
        <Stack.Screen name="NewRegulations" component={newRegulations} />
        <Stack.Screen name="NewAppVersion" component={NewAppVersion} />
        {BikePrivateScreens()}
        {KrossWorldCommonScreens()}
        {RecordRouteCommonScreens()}
        {ProfileCommonScreens()}
    </>
);

interface RegularStackNavigatorI {
    skipSplashScreen?: boolean;
}

const RegularStackNavigator: React.FC<RegularStackNavigatorI> = ({
    skipSplashScreen,
}: RegularStackNavigatorI) => {
    const isActive = useAppSelector(trackerActiveSelector);
    const initialRun = useRef(true);

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
            !initialRun.current || skipSplashScreen
                ? 'TabMenu'
                : 'SplashScreen',
        [skipSplashScreen],
    );

    const initInitialRouteName = useMemo<keyof RootStackType>(
        () => (!isActive ? regularInitialRouteName : 'TabMenu'),
        [isActive, regularInitialRouteName],
    );

    const screenToRedirectFromSplashScreen = useMemo<
        keyof GeneralParamsListT | keyof AuthParamsListT
    >(() => 'TabMenu', []);

    const StackScreens = useMemo(() => RegularScreens(), []);

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={initInitialRouteName}
            mode="modal"
            screenOptions={horizontalAnim}>
            {!initialRun.current || skipSplashScreen ? null : (
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
