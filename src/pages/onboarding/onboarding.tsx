import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';




import SplashScreen from './splashScreen/splashScreen';
import Screen_1 from './turtorialFirstRun/screen_1/screen_1';

const Onboarding = () => {

    const ww = Dimensions.get('window').width;
    // const wh = Dimensions.get('window').height;

    let styles = StyleSheet.create({
        container: {
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
        }
    })


    return (
        <View style={styles.container}>


            <View style={styles.screen}>
                <SplashScreen></SplashScreen>
            </View>

            <View style={styles.screen}>
                <Screen_1></Screen_1>
            </View>






        </View>
    )
}

export default Onboarding;
