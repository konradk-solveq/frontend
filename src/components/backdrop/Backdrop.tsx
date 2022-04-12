import React, {useEffect, useMemo} from 'react';
import {Dimensions, Pressable, StyleSheet, ViewStyle} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import colors from '@theme/colors';

const {width} = Dimensions.get('window');

interface IProps {
    isVisible?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}

const Backdrop: React.FC<IProps> = ({isVisible, onPress, style}: IProps) => {
    const backdropOpacity = useSharedValue(0);
    const isClickable = useMemo(() => (!isVisible ? 'box-none' : 'auto'), [
        isVisible,
    ]);
    const clickableAreaHeight = useMemo(
        () => (!isVisible ? {} : {height: '100%'}),
        [isVisible],
    );

    const backdropAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(backdropOpacity.value, {
            duration: backdropOpacity.value ? 350 : 950,
        }),
    }));

    useEffect(() => {
        backdropOpacity.value = isVisible ? 0.2 : 0;
    }, [isVisible, backdropOpacity]);

    return (
        <Animated.View
            pointerEvents={isClickable}
            style={[styles.container, style, backdropAnimation]}>
            <Pressable
                onPress={onPress}
                style={[styles.pressableContainer, clickableAreaHeight]}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        opacity: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        height: '100%',
        backgroundColor: colors.darkGrey,
    },
    pressableContainer: {
        width: '100%',
    },
});

export default React.memo(Backdrop);
