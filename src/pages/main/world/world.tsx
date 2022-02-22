import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {KrossWorldTabRoute, RegularStackRoute} from '@navigation/route';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getVerticalPx} from '@helpers/layoutFoo';
import BikeMap from '@pages/main/world/bikeMap/bikeMap';
import MyRoutes from '@pages/main/world/myRoutes/myRoutes';
import PlannedRoutes from '@pages/main/world/plannedRoutes/plannedRoutes';
import {RoutesMapButton} from '@pages/main/world/components/buttons';
import {useNavigation} from '@react-navigation/native';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const World = () => {
    const Tab = createMaterialTopTabNavigator();
    const {t} = useMergedTranslation('MainWorld');
    const navigation = useNavigation();
    const handleMapBtnPress = () => {
        navigation.navigate(RegularStackRoute.ROUTES_MAP_SCREEN);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator
                tabBarOptions={{
                    indicatorStyle: {backgroundColor: 'red'},
                    labelStyle: {
                        textTransform: 'none',
                        fontFamily: 'DIN2014-Demi',
                        fontSize: getVerticalPx(16),
                    },
                }}>
                <Tab.Screen
                    options={{
                        title: t('btnBikeMap'),
                    }}
                    name={KrossWorldTabRoute.BIKE_MAP_SCREEN}
                    component={BikeMap}
                />
                <Tab.Screen
                    options={{
                        title: t('btnMyRoutes'),
                    }}
                    name={KrossWorldTabRoute.MY_ROUTES_SCREEN}
                    component={MyRoutes}
                />
                <Tab.Screen
                    options={{
                        title: t('btnPlanned'),
                    }}
                    name={KrossWorldTabRoute.PLANNING_SCREEN}
                    component={PlannedRoutes}
                />
            </Tab.Navigator>
            <RoutesMapButton
                onPress={handleMapBtnPress}
                style={styles.mapBtn}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1},
    mapBtn: {
        position: 'absolute',
        bottom: getFVerticalPx(133),
        left: getFHorizontalPx(95),
        width: getFHorizontalPx(200),
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: getFVerticalPx(4),
        },
        shadowOpacity: 0.07,
        shadowRadius: getFVerticalPx(8),
        elevation: 3,
        borderRadius: getFHorizontalPx(16),
    },
});

export default World;
