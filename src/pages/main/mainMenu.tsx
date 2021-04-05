

import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';

import { Stack } from '../../navigation/stack';

import TabMenu from './tabMenu';


import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const MineMenu: React.FC<Props> = (props: Props) => {

    const horizontalAnim = {
        // gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    const verticalAnim = {
        // gestureDirection: 'vertical',
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateY: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.height, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="TabMenu"
            mode="modal"
            screenOptions={horizontalAnim}
        >

            <Stack.Screen name="TabMenu" component={TabMenu} />

        </Stack.Navigator>
    )
}

export default MineMenu