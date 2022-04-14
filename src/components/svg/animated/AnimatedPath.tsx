import React, {useEffect, useState} from 'react';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimPath = Animated.createAnimatedComponent(Path);

interface IProps {
    d: string;
    duration: number;
    strokeLength: number;
    strokeWidth: number | string;
    stroke: string;
    withDelay?: number;
}

const AnimatedPath: React.FC<IProps> = ({
    d,
    duration,
    strokeLength,
    strokeWidth,
    stroke,
    withDelay,
}: IProps) => {
    const progress = useSharedValue(0);
    const [startAnimation, setStartAnimation] = useState(!withDelay);

    /**
     * Animate stroke line
     */
    useEffect(() => {
        if (!startAnimation) {
            return;
        }

        progress.value = withTiming(1, {
            duration: duration,
            easing: Easing.linear,
        });
    }, [progress, duration, startAnimation]);

    /**
     * Set animation delay
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (withDelay) {
            t = setTimeout(() => {
                setStartAnimation(true);
            }, withDelay);
        }

        return () => clearTimeout(t);
    }, [withDelay]);

    const sAnimation = () => {
        'worklet';
        return {
            strokeDashoffset: strokeLength + strokeLength * progress.value,
        };
    };

    const strokeAnimation = useAnimatedProps(sAnimation);

    return (
        <AnimPath
            animatedProps={strokeAnimation}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={strokeLength}
        />
    );
};

export default React.memo(AnimatedPath);
