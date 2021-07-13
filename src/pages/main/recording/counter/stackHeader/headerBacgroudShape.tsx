import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IProps {
    started?: boolean;
    style?: any;
}

const HeaderBacgroudShape: React.FC<IProps> = ({started, style}: IProps) => {
    const sh = useSharedValue(getVerticalPx(90)); // side height
    const ch = useSharedValue(getVerticalPx(116)); // center height

    const display = useSharedValue(-1);

    const w = getHorizontalPx(414);
    const cw = getHorizontalPx(81);

    useEffect(() => {
        if (started) {
            display.value = withTiming(0, {duration: 400});
            sh.value = withTiming(getVerticalPx(90), {duration: 400});
            ch.value = withTiming(getVerticalPx(116), {duration: 400});
        } else {
            if (display.value !== -1) {
                display.value = withTiming(1, {duration: 400});
            }
            sh.value = withTiming(getVerticalPx(60), {duration: 400});
            ch.value = withTiming(getVerticalPx(60), {duration: 400});
        }
    }, [started]);

    const animatedProps = useAnimatedProps(() => {
        return {
            d: `M 0,0 ${w},0 ${w},${sh.value} C ${w},${sh.value} ${w - cw},${
                ch.value
            } ${w / 2},${ch.value} C ${cw},${ch.value} 0,${sh.value} 0,${
                sh.value
            } Z`,
            fill: interpolateColor(
                display.value,
                [-1, 0, 1],
                ['#313131', '#d8232a', '#f3a805'],
            ),
        };
    });

    const viewBox = '0 0 ' + getHorizontalPx(414) + ' ' + getVerticalPx(116);

    return (
        <Svg viewBox={viewBox} style={[styles.container, style]}>
            <AnimatedPath animatedProps={animatedProps} stroke="none" />
        </Svg>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: getHorizontalPx(414),
        height: 100,
        // backgroundColor: 'green',
    },
});

export default React.memo(HeaderBacgroudShape);
