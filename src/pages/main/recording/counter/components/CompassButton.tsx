import React, {useEffect} from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {CompassIconSvg} from '@components/svg';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

interface IProps {
    onPress: (e: GestureResponderEvent) => void;
    compassHeading: number;
    style?: ViewStyle;
}

const LocationButton: React.FC<IProps> = ({
    onPress,
    compassHeading = 0,
    style,
}: IProps) => {
    const rotation = useSharedValue(0);

    const svgRotationAnimation = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: -rotation.value + 'deg',
            },
        ],
    }));

    useEffect(() => {
        rotation.value = compassHeading;
    }, [rotation, compassHeading]);

    return (
        <Pressable onPress={onPress} hitSlop={getFVerticalPx(40)}>
            <View style={[styles.container, style]}>
                <Animated.View style={svgRotationAnimation}>
                    <CompassIconSvg />
                </Animated.View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(LocationButton);
