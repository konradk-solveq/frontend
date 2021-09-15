import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface IProps {
    heading: number;
}

const MarkPointer: React.FC<IProps> = ({ heading }: IProps) => {

    const rotation = useRef(new Animated.Value(0)).current;

    Animated.timing(rotation, {
        toValue: heading,
        duration: 200,
        useNativeDriver: false,
    }).start();

    const interpolateRotating = rotation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    const styles = StyleSheet.create({
        markWrap: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        },
        mark: {
            width: 31,
            height: 31,
        },
    });

    return (
        <View style={styles.markWrap} pointerEvents="none">
            <Animated.View style={[styles.mark, animatedStyle]}>
                <Svg viewBox="0 0 31 31">
                    <Circle cx="15.5" cy="15.5" r="15.5" fill="#fff" />
                    <Path
                        d="M15.544 6.294s-6.429 19.152-6.34 18.974c.09-.179 6.34-4.286 6.34-4.286s6.25 4.107 6.34 4.286c.088.179-6.34-18.974-6.34-18.974z"
                        fill="#d8232a"
                    />
                </Svg>
            </Animated.View>
        </View>
    );
};

export default React.memo(MarkPointer);
