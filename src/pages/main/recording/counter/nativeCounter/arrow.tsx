import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
} from 'react-native-reanimated';
import {getHorizontalPx} from '../../../../../helpers/layoutFoo';

interface Props {
    down?: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Arrow: React.FC<Props> = ({down}: Props) => {
    const sides = useSharedValue(6.929);
    const center = useSharedValue(1.082);

    useEffect(() => {
        if (down) {
            sides.value = withTiming(1.094, {duration: 400});
            center.value = withTiming(6.94, {duration: 400});
        } else {
            sides.value = withTiming(6.929, {duration: 400});
            center.value = withTiming(1.082, {duration: 400});
        }
    }, [down, sides, center]);

    const animatedProps = useAnimatedProps(() => {
        return {
            d: `M12.385 ${sides.value}L6.74 ${center.value} 1.093 ${sides.value}`,
        };
    });

    const styles = StyleSheet.create({
        btnContainer: {
            width: getHorizontalPx(16),
            height: getHorizontalPx(9),
            left: getHorizontalPx((51 - 16) / 2),
            marginTop: getHorizontalPx((51 - 9) / 2 + 1),
        },
    });

    return (
        <Svg viewBox="0 0 13.5 8" style={styles.btnContainer}>
            <AnimatedPath
                animatedProps={animatedProps}
                fill="none"
                stroke="#313131"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Arrow;
