import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';

import {
    setObjSize,
    getWidth,
    getRelativeHeight,
    getCenterLeft,
    getTop,
    setAppSize,
    getStandard
} from '../../../helpers/layoutFoo';

import LogoPionowe from './logoPionowe';
import Claim from './claim';
import DashLine from './dashLine';


const SplashScreen = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(414, 136);
    const dline = {
        position: 'absolute',
        width: getWidth(),
        height: getRelativeHeight(),
        left: getCenterLeft(),
        top: getTop(583)
    }

    let styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white'
        },
        logo: getStandard(242, 130, 226),
        claim: getStandard(118, 52, 767),
        dline,
        khaki: {
            backgroundColor: 'khaki'
        },
    })

    const fadeLogo = useRef(new Animated.Value(0)).current;
    const fadeClaim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeLogo, {
            toValue: 1,
            duration: 1000,
            delay: 300,
            useNativeDriver: true
        }).start();

        Animated.timing(fadeClaim, {
            toValue: 1,
            duration: 1000,
            delay: 800,
            useNativeDriver: true
        }).start();
    }, [])


    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.logo,
                {
                    opacity: fadeLogo
                }
            ]}>
                <LogoPionowe ></LogoPionowe>
            </Animated.View>

            {/* <View style={styles.dline}>
                <DashLine></DashLine>
            </View> */}

            <Animated.View style={[
                styles.claim,
                {
                    opacity: fadeClaim
                }
            ]}>
                <Claim></Claim>
            </Animated.View>
        </View>

    )
}

export default SplashScreen;