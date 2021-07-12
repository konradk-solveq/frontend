import React, {useRef} from 'react';
import {StyleSheet, Dimensions, View, Platform, Animated} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import Animated as Anim from 'react-native-reanimated';
// import {concat} from 'react-native-reanimated';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';
import {useEffect} from 'react';
import Arrow from './arrow';

interface Props {
    style?: any;
    down?: boolean;
    onPress: () => void;
}

const {width} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const CrossBtn: React.FC<Props> = ({onPress, down, style}: Props) => {
    const displayLines = useRef(
        new Animated.Value(getHorizontalPx(334)),
    ).current;

    useEffect(() => {
        Animated.timing(displayLines, {
            toValue: down ? 1 : 0,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [down, displayLines]);

    const btnTop = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [getVerticalPx(23), 0],
    });

    const lineWidth = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getHorizontalPx(334)],
    });

    const lineLeftPos = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [
            getHorizontalPx(40 - 5 + 334 / 2),
            getHorizontalPx(40 - 5),
        ],
    });

    const lineHeight = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getVerticalPx(305)],
    });

    const lineTopPos = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [
            getVerticalPx(-(305 - 68) / 2 + 305 / 2),
            getVerticalPx(-(305 - 68) / 2),
        ],
    });

    setObjSize(51, 51);
    const h = width * (40 / 120.8);
    const w = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            width: getHorizontalPx(51),
            height: getHorizontalPx(51),
        },
        background: {
            position: 'absolute',
            width: width,
            height: h,
            marginBottom: getVerticalPx(40),
        },
        button: {
            position: 'absolute',
            width: w,
            height: w,
            left: getCenterLeftPx(),
            top: 0,
            elevation: 20,
            shadowColor: 'grey',
            shadowOffset: {height: 0, width: 0},
            backgroundColor: 'white',
            shadowRadius: 10,
            shadowOpacity: isIOS ? 0.4 : 1,
            borderRadius: 50,
        },
        btnContainer: {
            width: getHorizontalPx(16),
            height: getHorizontalPx(9),
            left: getHorizontalPx((51 - 16) / 2),
            marginTop: getHorizontalPx((51 - 9) / 2),
        },
        touch: {
            width: '100%',
            height: '100%',
        },
        horisontalLine: {
            position: 'absolute',
            height: 1,
            top: getHorizontalPx(51 / 2),
            backgroundColor: '#e0e0e0',
        },
        verticalLine: {
            position: 'absolute',
            width: 1,
            left: getHorizontalPx(40 + 334 / 2),
            backgroundColor: '#e0e0e0',
        },
    });

    return (
        <Animated.View
            style={[
                styles.container,
                style,
                {
                    marginTop: btnTop,
                },
            ]}>
            <Animated.View
                style={[
                    styles.horisontalLine,
                    {
                        width: lineWidth,
                        left: lineLeftPos,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.verticalLine,
                    {
                        height: lineHeight,
                        top: lineTopPos,
                    },
                ]}
            />
            <View style={styles.button}>
                <TouchableWithoutFeedback
                    onPress={onPress}
                    hitSlop={{top: 20, bottom: 20}}
                    style={styles.touch}>
                    <Arrow />
                </TouchableWithoutFeedback>
            </View>
        </Animated.View>
    );
};

export default CrossBtn;
