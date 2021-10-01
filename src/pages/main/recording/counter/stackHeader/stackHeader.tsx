import React, {useEffect, useRef, useCallback} from 'react';
import {StyleSheet, Text, View, Platform, Animated} from 'react-native';
import TopBackBtn from './topBackBtn';

import {
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHeightPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';
import HeaderBacgroudShape from './headerBacgroudShape';
import useStatusBarHeight from '@src/hooks/statusBarHeight';

const isAndroid = Platform.OS === 'android';
interface Props {
    // * wartości wymagane
    style?: any;
    onpress: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    titleOn: boolean; // czy nazwa w headerze ma się pokazać
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    whiteArow: boolean;
    started?: boolean;
    mapHiden: boolean;
    duration: number;
}

// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = ({
    getHeight,
    mapHiden,
    duration,
    started,
    style,
    onpress,
    whiteArow,
    inner,
    titleOn,
}: Props) => {
    const height = getVerticalPx(100);
    const iosOpen = isAndroid ? 0 : 10;
    const iosClose = isAndroid ? 0 : 30;

    const getCurrentHeight = useCallback(async () => {
        if (getHeight) {
            const statusBarHeight = await getStatusBarHeight(isAndroid);
            getHeight(height - statusBarHeight);
        }
    }, [height, getHeight]);

    useEffect(() => {
        getCurrentHeight();
    }, [getCurrentHeight]);

    const display = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(display, {
            toValue: mapHiden ? 0 : 1,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [mapHiden, display, duration]);

    const titleTop = display.interpolate({
        inputRange: [0, 1],
        outputRange: [
            getVerticalPx(3 - 28) + iosOpen,
            getVerticalPx(3 - 28 - 30) + iosClose,
        ],
    });

    const arrowTop = display.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getVerticalPx(isAndroid ? -20 : -3)],
    });

    const arrowLeft = display.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getVerticalPx(isAndroid ? -25 : -5)],
    });

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: height,
        },
        wrap: {
            position: 'absolute',
            left: 0,
            top: height * 0.61,
            width: getHorizontalPx(414),
            height: getHeightPx(),
        },
        arrowWrap: {
            position: 'absolute',
            left: 0,
            top: 0,
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 13,
            color: '#ffffff',
        },
        titleWrap: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
        },
        background: {
            position: 'absolute',
            left: getHorizontalPx(-1),
            top: 0,
            width: getHorizontalPx(416),
            height: getVerticalPx(116),
        },
        fullView: {
            backgroundColor: 'red',
            width: '100%',
            height: '100%',
        },
    });

    return (
        <>
            <View style={[styles.container, style]}>
                <HeaderBacgroudShape
                    started={started}
                    style={styles.background}
                    mapHiden={mapHiden}
                    duration={duration}
                />

                <View style={styles.wrap}>
                    <Animated.View
                        style={[
                            styles.arrowWrap,
                            {
                                top: arrowTop,
                                left: arrowLeft,
                            },
                        ]}>
                        <TopBackBtn
                            onpress={onpress}
                            color={whiteArow ? '#fff' : '#000'}
                        />
                    </Animated.View>

                    {titleOn && (
                        <Animated.View
                            style={[
                                styles.titleWrap,
                                {
                                    top: titleTop,
                                },
                            ]}>
                            <Text style={styles.title}>{inner}</Text>
                        </Animated.View>
                    )}
                </View>
            </View>
        </>
    );
};

export default StackHeader;
