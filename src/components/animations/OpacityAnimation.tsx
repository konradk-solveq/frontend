import React, {useEffect} from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface IProps {
    children: React.ReactNode;
    duration?: number;
}

const OpacityAnimation: React.FC<IProps> = ({
    children,
    duration = 1200,
}: IProps) => {
    const viewOpacity = useSharedValue(0);

    const viewAnimation = useAnimatedStyle(() => ({
        opacity: viewOpacity.value,
    }));

    useEffect(() => {
        viewOpacity.value = withTiming(1, {
            duration: duration,
            easing: Easing.linear,
        });
    }, [viewOpacity, duration]);

    return <Animated.View style={viewAnimation}>{children}</Animated.View>;
};

export default OpacityAnimation;
