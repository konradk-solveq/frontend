import React, {useEffect} from 'react';
import {ViewStyle, StyleSheet} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

interface IProps {
    height: number;
    shouldHide: boolean;
    style?: ViewStyle | ViewStyle[];
    duration?: number;
    children: JSX.Element | JSX.Element[];
}

const CollapsibleStickyHeader = ({
    style,
    children,
    shouldHide,
    height,
    duration = 300,
}: IProps) => {
    const headerHeight = useSharedValue(height);
    useEffect(() => {
        headerHeight.value = shouldHide ? -height : 0;
    }, [shouldHide, headerHeight, height]);
    const headerAnimation = useAnimatedStyle(() => ({
        top: withTiming(headerHeight.value, {duration: duration}),
    }));
    const wrapperAnimation = useAnimatedStyle(() => ({
        height: withTiming(height + headerHeight.value, {duration: duration}),
    }));
    return (
        <Animated.View style={[styles.wrapper, wrapperAnimation]}>
            <Animated.View style={[styles.container, headerAnimation, style]}>
                {children}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        zIndex: 10,
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});

export default CollapsibleStickyHeader;
