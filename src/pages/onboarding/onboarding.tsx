import React from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';

import {
    setAppSize,
    getStandard
} from '../../helpers/layoutFoo';

import SplashScreen from './splashScreen/splashScreen';
import Screen_1 from './turtorialFirstRun/screen_1/screen_1';
import BigRedBtn from '../../sharedComponents/buttons/bigRedBtn'

const Onboarding = () => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    let styles = StyleSheet.create({
        static: {
            position: 'absolute',
            left: 0,
            top: 0
        },
        container: {
            // position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: ww * 2,
            height: '100%',
            left: -ww,
            backgroundColor: 'white'
        },
        screen: {
            width: ww,
            height: '100%'
        },
        redBtn: getStandard(334, 50, 781),
    })


    return (
        <>
            <View style={styles.container}>

                <View style={styles.screen}>
                    <SplashScreen></SplashScreen>
                </View>

                <View style={styles.screen}>
                    <Screen_1></Screen_1>
                </View>

            </View>

            <View style={[styles.screen, styles.static]}>
                <View style={styles.redBtn}>
                    <BigRedBtn title='DALEJ'></BigRedBtn>
                </View>
            </View>

        </>
    )
}

export default Onboarding;
