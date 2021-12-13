import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {getVerticalPx, getHorizontalPx} from '@helpers/layoutFoo';
import {useEffect} from 'react';
import Arrow from './arrow';
import {isIOS} from '@utils/platform';

interface Props {
    down?: boolean;
    onPress: () => void;
    duration: number;
}

const HORIZONTAL_LINE_WIDTH = getHorizontalPx(334);
const HORIZONTAL_LINE_POS_BIG_SIZE = getHorizontalPx(40);
const HORIZONTAL_LINE_POS_SMALL_SIZE =
    HORIZONTAL_LINE_POS_BIG_SIZE + HORIZONTAL_LINE_WIDTH / 2;

const VERTICAL_LINE_HEIGHT = getVerticalPx(305);
const VERTICAL_LINE_POS_BIG_SIZE =
    -(VERTICAL_LINE_HEIGHT - getVerticalPx(68)) / 2;
const VERTICAL_LINE_POS_SMALL_SIZE =
    VERTICAL_LINE_POS_BIG_SIZE + VERTICAL_LINE_HEIGHT / 2;

const CrossBtn: React.FC<Props> = ({onPress, down, duration}: Props) => {
    const displayLines = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(displayLines, {
            toValue: down ? 0 : 1,
            duration: duration * 0.7,
            useNativeDriver: false,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [down, displayLines]);

    const horizontalLineWidth = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [HORIZONTAL_LINE_WIDTH, 0],
    });

    const horizontalLineLeftPos = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [
            HORIZONTAL_LINE_POS_BIG_SIZE,
            HORIZONTAL_LINE_POS_SMALL_SIZE,
        ],
    });

    const verticalLineHeight = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [VERTICAL_LINE_HEIGHT, 0],
    });

    const verticalLineTopPos = displayLines.interpolate({
        inputRange: [0, 1],
        outputRange: [VERTICAL_LINE_POS_BIG_SIZE, VERTICAL_LINE_POS_SMALL_SIZE],
    });

    const styles = StyleSheet.create({
        container: {
            width: getHorizontalPx(414),
            height: getHorizontalPx(51),
            zIndex: 1000,
        },
        button: {
            position: 'absolute',
            width: getHorizontalPx(51),
            height: getHorizontalPx(51),
            left: getHorizontalPx((414 - 51) / 2 + 0.5),
            top: getHorizontalPx(0.5),
            elevation: 20,
            shadowColor: 'grey',
            shadowOffset: {height: 0, width: 0},
            backgroundColor: 'white',
            shadowRadius: 10,
            shadowOpacity: isIOS ? 0.4 : 1,
            borderRadius: 50,
        },
        touch: {
            width: getHorizontalPx(51),
            height: getHorizontalPx(51),
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
            left: getHorizontalPx(40) + HORIZONTAL_LINE_WIDTH / 2,
            backgroundColor: '#e0e0e0',
        },
    });

    return (
        <Animated.View style={[styles.container]}>
            <Animated.View
                style={[
                    styles.horisontalLine,
                    {
                        width: horizontalLineWidth,
                        left: horizontalLineLeftPos,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.verticalLine,
                    {
                        height: verticalLineHeight,
                        top: verticalLineTopPos,
                    },
                ]}
            />
            <View style={styles.button}>
                <TouchableWithoutFeedback
                    onPress={onPress}
                    hitSlop={{top: 20, bottom: 20}}
                    style={styles.touch}>
                    <Arrow down={down} />
                </TouchableWithoutFeedback>
            </View>
        </Animated.View>
    );
};

export default CrossBtn;
