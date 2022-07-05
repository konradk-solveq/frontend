import React, {useMemo} from 'react';
import {Stack} from '@navigation/stack';

import {RootStackType} from '@type/rootStack';

import {horizontalAnim} from '@helpers/positioning';
import {
    BikePrivateScreens,
    KrossWorldCommonScreens,
    ProfileCommonScreens,
    RecordRouteCommonScreens,
} from '@navigation/screens/index';

import TabMenu from '@pages/main/tabMenu';
import SplashScreen from '@pages/main/splashScreen/splashScreen';
import Notifications from '@pages/main/notifications/notifications';
import useAuthorization from '@src/hooks/useAuthorization';

const RegularScreens = () => (
    <>
        <Stack.Screen name="TabMenu" component={TabMenu} />
        <Stack.Screen name="Notifications" component={Notifications} />
        {BikePrivateScreens()}
        {KrossWorldCommonScreens()}
        {RecordRouteCommonScreens()}
        {ProfileCommonScreens()}
    </>
);

interface RegularStackNavigatorI {
    initInitialRouteName?: keyof RootStackType;
}

const RegularStackNavigator: React.FC<RegularStackNavigatorI> = ({
    initInitialRouteName = 'SplashScreen',
}: RegularStackNavigatorI) => {
    useAuthorization();

    const StackScreens = useMemo(() => RegularScreens(), []);

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={initInitialRouteName}
            mode="modal"
            screenOptions={horizontalAnim}>
            {StackScreens}
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    );
};

export default React.memo(RegularStackNavigator);
