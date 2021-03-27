import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageSvg from 'react-native-remote-svg';


import {
    setAppSize,
    setObjSize,
    getWidth,
    getTop,
    getRelativeHeight,
    getCenterLeft
} from '../../helpers/layoutFoo';

import SplashScreen from './splashScreen/splashScreen';
import Screen_1 from './turtorialFirstRun/screen_1/screen_1';
import Screen_2 from './turtorialFirstRun/screen_2/screen_2';
import Screen_3 from './turtorialFirstRun/screen_3/screen_3';
import StaticElements from './staticElements';


interface Props {
    navigation: any;
};

const Onboarding: React.FC<Props> = (props: Props) => {

    const [board, setBoard] = useState(0);
    const position = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(ww * 4, 0.257 * ww * 4.35);
    const line = {
        position: 'absolute',
        width: getWidth(),
        height: getRelativeHeight(),
        left: -ww * .05,
        top: getTop(280),
    }

    const list: Array<Function> = [
        () => { setBoard(1) },
        () => { setBoard(2) },
        () => { setBoard(3) }
    ]

    useEffect(() => {
        if (board == 0) {
            setTimeout(() => { setBoard(1); }, 3500)
        }
    }, []);

    useEffect(() => {
        Animated.timing(position, {
            toValue: -ww * board,
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: true
        }).start();

        if (board > 0) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.cubic,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                easing: Easing.cubic,
                useNativeDriver: true
            }).start();
        }
    }, [board])

    setObjSize(414, 175);
    const cover = {
        position: 'absolute',
        width: ww * 1.2,
        height: getRelativeHeight(),
        left: getCenterLeft(),
        top: getTop(560),
    }

    let styles = StyleSheet.create({
        static: {
            position: 'absolute',
            left: 0,
            top: 0
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: ww * 4,
            height: '100%',
            backgroundColor: 'white'
        },
        screen: {
            width: ww,
            height: '100%'
        },
        coverFill: {
            width: '100%',
            height: '100%'
        },
        cover,
        line
    })

    return (
        <>
            <Animated.View style={[styles.container, {
                transform: [{ translateX: position }]
            }]}>

                <View style={styles.screen}>
                    <SplashScreen></SplashScreen>
                </View>

                <View style={styles.screen}>
                    <Screen_1></Screen_1>
                </View>

                <View style={styles.screen}>
                    <Screen_2></Screen_2>
                </View>

                <View style={styles.screen}>
                    <Screen_3></Screen_3>
                </View>



            </Animated.View>


            <Animated.View style={[styles.screen, styles.static, {
                opacity: opacity
            }]}>
                <StaticElements
                    // goFoward={() => {navigation.navigate('GetToKnowEachOther'})}
                    goFoward={() => props.navigation.navigate('GetToKnowEachOther')}
                    board={board}
                    list={list}
                    setBoard={setBoard}
                ></StaticElements>
            </Animated.View>

            <View style={styles.line}>
                <ImageSvg
                    source={require('./dashLine.svg')}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>


            {/* <Animated.View style={[styles.line, {
                transform: [{ translateX: position }]
            }]}>
                <Animated.View style={[styles.coverFill, {
                    transform: [{ translateY: linePos }]
                }]}>
                    <DashLine ></DashLine>
                </Animated.View>
            </Animated.View> */}



            {/* {coverOpa ? <Animated.View style={[styles.cover, {
                transform: [{ translateX: coverPos }]
            }]}>
                <LinearGradient
                    colors={['#ffffff00', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                    // colors={['red', 'yellow', 'green']}
                    style={styles.coverFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View> : null} */}

        </>
    )
}

export default Onboarding;
