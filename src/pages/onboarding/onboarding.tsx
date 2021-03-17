import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Animated, Easing, Text, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    setAppSize,
    setObjSize,
    getStandard,
    getWidth,
    getHeight,
    getLeft,
    getTop,
    getRelativeHeight,
    getCenterLeft
} from '../../helpers/layoutFoo';

import SplashScreen from './splashScreen/splashScreen';
import Screen_1 from './turtorialFirstRun/screen_1/screen_1';
import Screen_2 from './turtorialFirstRun/screen_2/screen_2';
import Screen_3 from './turtorialFirstRun/screen_3/screen_3';
import BigRedBtn from '../../sharedComponents/buttons/bigRedBtn'
import PanelProps from '../../sharedComponents/radio/panel'
import TranspLightBtn from '../../sharedComponents/buttons/transpLightBtn'
import DashLine from './dashLine';

const Onboarding = () => {

    const [board, setBoard] = useState(0);
    const position = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const coverPos = useRef(new Animated.Value(-(ww / 5))).current;
    const linePos = useRef(new Animated.Value(0)).current;
    const [coverOpa, setCoverOpa] = useState(true);

    setObjSize(ww * 4.35, 0.19 * ww * 4.35);
    // setObjSize(ww, 0.18880 * ww);
    const line = {
        position: 'absolute',
        width: getWidth(),
        height: getRelativeHeight(),
        left: -ww * .05,
        top: getTop(400),
        // backgroundColor: 'khaki'
    }
    const lineMove = -wh * .2;

    useEffect(() => {
        if (board == 0) {
            setTimeout(() => {
                setBoard(1);
                setCoverOpa(false)
            }, 3500)
        }
        setBoard(0);

        Animated.timing(coverPos, {
            toValue: ww,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(linePos, {
            toValue: lineMove,
            duration: 2000,
            delay: 2800,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
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



    setObjSize(41, 23);
    const skip = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getLeft(333),
        top: getTop(67),
    }

    setObjSize(414, 175);
    const cover = {
        position: 'absolute',
        width: ww * 1.2,
        height: getRelativeHeight(),
        left: getCenterLeft(),
        top: getTop(560),
        // backgroundColor: 'khaki'
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
        redBtn: getStandard(334, 50, 781),
        skip,
        cover,
        line
    })

    const list: Array<Function> = [
        () => { setBoard(1) },
        () => { setBoard(2) },
        () => { setBoard(3) }
    ]

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

                <PanelProps
                    active={board - 1}
                    listBtn={list}
                ></PanelProps>

                <View style={styles.skip}>
                    <TranspLightBtn title='pomiń' />
                </View>

                <View style={styles.redBtn}>
                    <BigRedBtn
                        title='DALEJ'
                        onpress={() => { if (board < list.length) setBoard(board + 1) }}
                    />
                </View>
            </Animated.View>

            <Animated.View style={[styles.line, {
                transform: [{ translateX: position, translateY: linePos }]
            }]}>
                <DashLine ></DashLine>
            </Animated.View>

            {coverOpa ? <Animated.View style={[styles.cover, {
                    transform: [{ translateX: coverPos }]
                }]}>
                    <LinearGradient
                        colors={['#ffffff00', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                        // colors={['red', 'yellow', 'green']}
                        style={styles.coverFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                </Animated.View> : null}

        </>
    )
}

export default Onboarding;
