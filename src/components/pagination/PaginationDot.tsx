import React from 'react';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
    size?: number;
    active?: boolean;
    activeColor?: string;
    inactiveColor?: string;
    transitionDuration?: number;
    style?: StyleProp<ViewStyle>;
}

const PaginationDot = ({
    size = getFHorizontalPx(8),
    active = false,
    activeColor = colors.red,
    inactiveColor = colors.greyish,
    transitionDuration = 500,
    style,
}: IProps) => {
    const colorProgress = useSharedValue(0);
    const backgroundColorAnimation = useAnimatedStyle(() => ({
        backgroundColor: withTiming(
            interpolateColor(
                colorProgress.value,
                [0, 1],
                [inactiveColor, activeColor],
            ),
            {duration: transitionDuration},
        ),
    }));
    useEffect(() => {
        colorProgress.value = active ? 1 : 0;
    }, [active, colorProgress]);
    return (
        <Animated.View
            style={[
                {width: size, height: size, borderRadius: size / 2},
                backgroundColorAnimation,
                style,
            ]}
        />
    );
};

export default PaginationDot;
