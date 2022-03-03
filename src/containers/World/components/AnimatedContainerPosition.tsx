import React, {useEffect, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {
    appBottomMargin,
    appContainerHorizontalMargin,
} from '@theme/commonStyle';

interface IProps {
    children: ReactNode;
    height?: number;
    toggle?: boolean;
}

const heightOfBottomSheet = getFVerticalPx(270 + 16);

const AnimatedContainerPosition: React.FC<IProps> = ({
    children,
    height = heightOfBottomSheet,
    toggle,
}: IProps) => {
    const containerPostion = useSharedValue(appBottomMargin);
    const containerAnimation = useAnimatedStyle(() => ({
        bottom: withTiming(containerPostion.value, {
            duration: containerPostion.value === height ? 600 : 825,
        }),
    }));

    useEffect(() => {
        containerPostion.value = toggle ? height : appBottomMargin;
    }, [height, toggle, containerPostion]);

    return (
        <Animated.View
            style={[styles.buttonRow, containerAnimation]}
            pointerEvents="box-none">
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        position: 'absolute',
        width: '100%',
        bottom: appBottomMargin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: appContainerHorizontalMargin,
        zIndex: 1,
    },
});

export default AnimatedContainerPosition;
