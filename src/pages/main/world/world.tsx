import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {MaterialTab} from '@navigation/stack';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import BikeMap from '@pages/main/world/bikeMap/bikeMap';
import MyRoutes from '@pages/main/world/myRoutes/myRoutes';
import PlannedRoutes from '@pages/main/world/plannedRoutes/plannedRoutes';
import {getFFontSize, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

const MATERIAL_TAB_HEIGHT = getFVerticalPx(98);

const World = () => {
    const {t} = useMergedTranslation('MainWorld');
    const {top} = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.container}>
            <MaterialTab.Navigator
                tabBarOptions={{
                    tabStyle: {
                        height: MATERIAL_TAB_HEIGHT,
                        paddingBottom: getFVerticalPx(16),
                        marginTop: -top,
                        justifyContent: 'flex-end',
                    },
                    indicatorStyle: {backgroundColor: 'red'},
                    labelStyle: {
                        textTransform: 'none',
                        fontFamily: 'DIN2014-Demi',
                        fontSize: getFFontSize(18),
                        lineHeight: getFFontSize(24),
                        marginBottom: 0,
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
