import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';

import {getHorizontalPx, getWidthPxOf} from '@helpers/layoutFoo';

const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props {
    onpress: Function;
    whiteArow: boolean;
    duration: number;
}

const TopBackBtn: React.FC<Props> = ({onpress, whiteArow, duration}: Props) => {
    const displayColor = useSharedValue(0);

    useEffect(() => {
        displayColor.value = withTiming(whiteArow ? 0 : 1, {
            duration: duration,
        });
    }, [displayColor, whiteArow, duration]);

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: getHorizontalPx(9),
            width: getWidthPxOf(40),
            height: getWidthPxOf(34),
            left: getWidthPxOf(30),
            top: getWidthPxOf(-2),
            zIndex: 20,
        },
        touch: {
            width: getWidthPxOf(40),
            height: getWidthPxOf(34),
            padding: getHorizontalPx(9),
        },
    });

    const animatedProps = useAnimatedProps(() => {
        return {
            fill: interpolateColor(
                displayColor.value,
                [0, 1],
                ['#fff', '#000'],
            ),
        };
    });

    return (
        <View style={styles.btn}>
            <TouchableOpacity onPress={() => onpress()} style={styles.touch}>
                <Svg viewBox="0 0 20 16">
                    <AnimatedPath
                        animatedProps={animatedProps}
                        fillRule="nonzero"
                        transform="translate(-40 -70) translate(0 1) translate(40 65) translate(0 2) translate(0 2.85)"
                        d="M7.293 1.147c.36.342.388.881.083 1.254l-.083.09-3.879 3.684H19l.117.006c.497.055.883.457.883.944 0 .525-.448.95-1 .95H3.414l3.879 3.685.083.09c.305.372.277.91-.083 1.253-.39.371-1.024.371-1.414 0L.293 7.797l-.083-.09c-.305-.372-.278-.911.083-1.254l5.586-5.306c.39-.371 1.023-.371 1.414 0z"
                    />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

export default TopBackBtn;
