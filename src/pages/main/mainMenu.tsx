

import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';

import { Tab } from '../../navigation/stack';

import Home from '../main/home/home';
import World from '../main/world/world';

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



    // const ww = Dimensions.get('window').width;
    // const wh = Dimensions.get('window').height;
    // setAppSize(ww, wh);


    const tabBarOptions = {
        showIcon: true,
        showLabel: false,
        lazyLoad: true,
        style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 80,
            elevation: 0
        },
        // activeTintColor: 'blue',
        // inactiveTintColor: 'white',
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
    }



    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={tabBarOptions}
        // swipeEnabled={true}
        // animationEnabled={true}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (<Text>home</Text>),
                }}

            />
            <Tab.Screen
                name="World"
                component={World}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (<Text>world</Text>),
                }}

            />

        </Tab.Navigator>
    )
}

export default MineMenu