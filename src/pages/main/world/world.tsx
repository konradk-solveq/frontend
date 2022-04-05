import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MaterialTab} from '@navigation/stack';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import BikeMap from '@pages/main/world/bikeMap/bikeMap';
import MyRoutes from '@pages/main/world/myRoutes/myRoutes';
import PlannedRoutes from '@pages/main/world/plannedRoutes/plannedRoutes';
import {getFFontSize} from '@theme/utils/appLayoutDimensions';

import {getAppLayoutConfig} from '@theme/appLayoutConfig';
import {navBarHeight} from '@theme/commonStyle';

const World = () => {
    const {t} = useMergedTranslation('MainWorld');

    /**
     * Tabs height
     */
    const statusBarHeigh = getAppLayoutConfig.statusBarH();
    /**
     * Tab bars height
     */
    const headerHeightModifier = useMemo(() => navBarHeight - statusBarHeigh, [
        statusBarHeigh,
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <MaterialTab.Navigator
                tabBarOptions={{
                    tabStyle: {
                        height: headerHeightModifier,
                    },
                    indicatorStyle: {backgroundColor: 'red'},
                    labelStyle: {
                        textTransform: 'none',
                        fontFamily: 'DIN2014-Demi',
                        fontSize: getFFontSize(18),
                        lineHeight: getFFontSize(24),
                    },
                }}>
                <MaterialTab.Screen
                    options={{
                        title: t('btnBikeMap'),
                    }}
                    name={'WorldBikeMap'}
                    component={BikeMap}
                />
                <MaterialTab.Screen
                    options={{
                        title: t('btnMyRoutes'),
                    }}
                    name={'WorldMyRoutes'}
                    component={MyRoutes}
                />
                <MaterialTab.Screen
                    options={{
                        title: t('btnPlanned'),
                    }}
                    name={'WorldPlannedRoutes'}
                    component={PlannedRoutes}
                />
            </MaterialTab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default World;
