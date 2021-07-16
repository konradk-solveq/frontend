import React, {useEffect} from 'react';
import {Platform, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../../../hooks/statusBarHeight';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const isIOS = Platform.OS === 'ios';

interface IProps {
    started?: boolean;
    style?: any;
    mapHiden: boolean;
    duration: number;
}

const HeaderBacgroudShape: React.FC<IProps> = ({
    started,
    style,
    mapHiden,
    duration,
}: IProps) => {
    const statusBarHeight = useStatusBarHeight();
    const iosHeightOpen = isIOS ? 5 : 0;
    const iosHeightClose = isIOS ? statusBarHeight / 2 : 0;
    const sh = useSharedValue(getVerticalPx(90)); // side height
    const ch = useSharedValue(getVerticalPx(116)); // center height

    const display = useSharedValue(-1);

    const lw = getHorizontalPx(-1);
    const rw = getHorizontalPx(416);
    const cw = getHorizontalPx(81);

    useEffect(() => {
        if (mapHiden) {
            if (started) {
                display.value = withTiming(0, {duration: duration});
                sh.value = withTiming(getVerticalPx(90), {duration: duration});
                ch.value = withTiming(getVerticalPx(116), {duration: duration});
            } else {
                if (display.value !== -1) {
                    display.value = withTiming(1, {duration: duration});
                }
                sh.value = withTiming(getVerticalPx(60) + iosHeightOpen, {
                    duration: duration,
                });
                ch.value = withTiming(getVerticalPx(60) + iosHeightOpen, {
                    duration: duration,
                });
            }
        } else {
            if (started) {
                display.value = withTiming(0, {duration: duration});
                sh.value = withTiming(getVerticalPx(20) + iosHeightClose, {
                    duration: duration,
                });
                ch.value = withTiming(getVerticalPx(36) + iosHeightClose, {
                    duration: duration,
                });
            } else {
                if (display.value !== -1) {
                    display.value = withTiming(1, {duration: duration});
                }
                sh.value = withTiming(getVerticalPx(30) + iosHeightClose, {
                    duration: duration,
                });
                ch.value = withTiming(getVerticalPx(30) + iosHeightClose, {
                    duration: duration,
                });
            }
        }
    }, [started, mapHiden, iosHeightOpen, iosHeightClose]);

    const animatedProps = useAnimatedProps(() => {
        return {
            d: `M ${lw},0 ${rw},0 ${rw},${sh.value} C ${rw},${sh.value} ${
                rw - cw
            },${ch.value} ${rw / 2},${ch.value} C ${cw},${ch.value} ${lw},${
                sh.value
            } ${lw},${sh.value} Z`,
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