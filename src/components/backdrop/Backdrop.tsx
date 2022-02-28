import React, {useEffect, useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import colors from '@theme/colors';

interface IProps {
    isVisible?: boolean;
    style?: ViewStyle;
}

const Backdrop: React.FC<IProps> = ({isVisible, style}: IProps) => {
    const backdropOpacity = useSharedValue(0);
    const isClickable = useMemo(() => (!isVisible ? 'box-none' : 'auto'), [
        isVisible,
    ]);

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
            style={[styles.container, style, backdropAnimation]}
        />
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
        width: '100%',
        height: '100%',
        backgroundColor: colors.darkGrey,
    },
});

export default React.memo(Backdrop);
