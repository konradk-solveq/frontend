import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopBackBtn from './topBackBtn';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';

import {
    getCenterLeftPx,
    getWidthPx,
    getHeightPx,
    getHorizontalPx,
    getFontSize,
    getVerticalPx,
} from '@helpers/layoutFoo';
import HeaderBackgroundShape from './HeaderBackgroundShape';
import {getAppLayoutConfig} from '@theme/appLayoutConfig';
import {isAndroid} from '@utils/platform';

const HEADER_HEIGHT = getHorizontalPx(116) + getAppLayoutConfig.statusBarH();

const TITLE_TOP_BIG = getVerticalPx(42);
const TITLE_TOP_SMALL = getVerticalPx(12);

const ARROW_TOP_BIG = getHorizontalPx(68);
const ARROW_TOP_SMALL = getHorizontalPx(48);

const ARROW_LEFT_BIG = getHorizontalPx(0);
const ARROW_LEFT_SMALL = getHorizontalPx(-18);

interface Props {
    // * wartości wymagane
    onpress: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    titleOn: boolean; // czy nazwa w headerze ma się pokazać
    whiteArrow: boolean;
    started?: boolean;
    mapHiden: boolean;
    duration: number;
}

// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = ({
    mapHiden,
    duration,
    started,
    onpress,
    whiteArrow,
    inner,
    titleOn,
}: Props) => {
    const titleTop = useSharedValue(TITLE_TOP_BIG);
    const arrowTop = useSharedValue(ARROW_TOP_BIG);
    const arrowLeft = useSharedValue(ARROW_LEFT_BIG);

    useEffect(() => {
        titleTop.value = withTiming(
            mapHiden ? TITLE_TOP_BIG : TITLE_TOP_SMALL,
            {
                duration: duration,
            },
        );

        arrowTop.value = withTiming(
            mapHiden ? ARROW_TOP_BIG : ARROW_TOP_SMALL,
            {
                duration: duration,
            },
        );

        arrowLeft.value = withTiming(
            mapHiden ? ARROW_LEFT_BIG : ARROW_LEFT_SMALL,
            {
                duration: duration,
            },
        );
    }, [mapHiden, duration, whiteArrow, titleTop, arrowTop, arrowLeft]);

    const titleTopStyle = useAnimatedStyle(() => {
        return {
            top: titleTop.value,
        };
    });

    const arrowStyle = useAnimatedStyle(() => {
        return {
            top: arrowTop.value,
            left: arrowLeft.value,
        };
    });

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: HEADER_HEIGHT,
            zIndex: 3,
        },
        arrowWrap: {
            position: 'absolute',
        },
        titleWrap: {
            // position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            backgroundColor: 'red',
        },
        title: {
            position: 'absolute',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getFontSize(13),
            color: '#ffffff',
            width: '100%',
        },
    });

    return (
        <>
            <View style={styles.container}>
                <HeaderBackgroundShape
                    started={started}
                    mapHiden={mapHiden}
                    duration={duration}
                />

                <Animated.View style={[styles.arrowWrap, arrowStyle]}>
                    <TopBackBtn
                        onpress={onpress}
                        whiteArow={whiteArrow}
                        duration={duration}
                    />
                </Animated.View>

                {titleOn && (
                    <Animated.View style={[styles.titleWrap, titleTopStyle]}>
                        <Text style={styles.title}>{inner}</Text>
                    </Animated.View>
                )}
            </View>
        </>
    );
};

export default StackHeader;
