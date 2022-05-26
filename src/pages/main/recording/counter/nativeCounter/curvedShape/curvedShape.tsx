import React, {useEffect} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
    useAnimatedProps,
    useSharedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

import {getHorizontalPx} from '@helpers/layoutFoo';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CONTAINER_WIDTH = getHorizontalPx(414);
const CONTAINER_HEIGHT = getHorizontalPx(116);
const SIDE_HEIGHT = getHorizontalPx(116);
const CENTER_HEIGHT = getHorizontalPx(90);

/** Left Top Corner X Axis Position */
const lw = getHorizontalPx(-1);
/** Right Top Corner X Axis Position */
const rw = getHorizontalPx(416);
/** Bezier Point To Make Curve Draw From Center */
const cw = getHorizontalPx(81);

const viewBox = '0 0 ' + CONTAINER_WIDTH + ' ' + CONTAINER_HEIGHT;

interface IProps {
    style?: ViewStyle;
}

const CurvedShape: React.FC<IProps> = ({style}: IProps) => {
    /** Left And Right Height On Sides */
    const sh = useSharedValue(SIDE_HEIGHT);
    /** Central Height Bezier Point */
    const ch = useSharedValue(CENTER_HEIGHT);

    useEffect(() => {
        sh.value = SIDE_HEIGHT;
        ch.value = CENTER_HEIGHT;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const animatedProps = useAnimatedProps(() => {
        // start of drawing
        // ↓
        // lw----------------------------------------------←-rw
        // ↓                                                  |
        // |                                                  |
        // |          cw............ch............cw          |
        // |         _______--------  --------_______         ↑
        // sh→___----                                ----____sh

        return {
            d: `M ${lw},0 ${rw},0 ${rw},${sh.value} C ${rw},${sh.value} ${
                rw - cw
            },${ch.value} ${rw / 2},${ch.value} C ${cw},${ch.value} ${lw},${
                sh.value
            } ${lw},${sh.value} Z`,
        };
    });

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: CONTAINER_WIDTH,
            height: CONTAINER_HEIGHT,
            top: getHorizontalPx(-26),
        },
        svgContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: CONTAINER_WIDTH,
            height: CONTAINER_HEIGHT,
            transform: [{rotateX: '180deg'}], // flip up side down
        },
    });

    return (
        <View style={styles.container}>
            <Svg viewBox={viewBox} style={[styles.svgContainer, style]}>
                <AnimatedPath
                    animatedProps={animatedProps}
                    stroke="none"
                    fill="#fff"
                />
            </Svg>
        </View>
    );
};

export default CurvedShape;
