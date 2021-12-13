import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';

import {getHorizontalPx} from '@helpers/layoutFoo';
import {isIOS} from '@utils/platform';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IProps {
    started?: boolean;
    style?: any;
    mapHiden: boolean;
    duration: number;
}


const SIDE_HEIGHT_ROUND_BIG = getHorizontalPx(90);
const CENTER_HEIGHT_ROUND_BIG = getHorizontalPx(116);

const SIDE_HEIGHT_FLAT_BIG = getHorizontalPx(60);
const CENTER_HEIGHT_FLAT_BIG = getHorizontalPx(60);

const SIDE_HEIGHT_ROUND_SMALL = getHorizontalPx(20);
const CENTER_HEIGHT_ROUND_SMALL = getHorizontalPx(36);

const SIDE_HEIGHT_FLAT_SMALL = getHorizontalPx(30);
const CENTER_HEIGHT_FLAT_SMALL = getHorizontalPx(30);

/** Left Top Corner X Axis Position */
const lw = getHorizontalPx(-1);
/** Right Top Corner X Axis Position */
const rw = getHorizontalPx(416);
/** Bezier Point To Make Curve Draw From Center */
const cw = getHorizontalPx(81);

const HeaderBacgroudShape: React.FC<IProps> = ({
    started,
    style,
    mapHiden,
    duration,
}: IProps) => {
    const iosHeight = isIOS ? 0 : 0;

    /** Left And Right Height On Sides */
    const sh = useSharedValue(SIDE_HEIGHT_FLAT_BIG);
    /** Central Height Bezier Point */
    const ch = useSharedValue(CENTER_HEIGHT_FLAT_BIG);

    const display = useSharedValue(-1);

    useEffect(() => {
        sh.value = SIDE_HEIGHT_FLAT_BIG;
        ch.value = CENTER_HEIGHT_FLAT_BIG;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapHiden) {
            if (started) {
                display.value = withTiming(0, {duration: duration});
                sh.value = withTiming(SIDE_HEIGHT_ROUND_BIG, {
                    duration: duration,
                });
                ch.value = withTiming(CENTER_HEIGHT_ROUND_BIG, {
                    duration: duration,
                });
            } else {
                if (display.value !== -1) {
                    display.value = withTiming(1, {duration: duration});
                }
                sh.value = withTiming(SIDE_HEIGHT_FLAT_BIG, {
                    duration: duration,
                });
                ch.value = withTiming(CENTER_HEIGHT_FLAT_BIG, {
                    duration: duration,
                });
            }
        } else {
            if (started) {
                display.value = withTiming(0, {duration: duration});
                sh.value = withTiming(SIDE_HEIGHT_ROUND_SMALL, {
                    duration: duration,
                });
                ch.value = withTiming(CENTER_HEIGHT_ROUND_SMALL, {
                    duration: duration,
                });
            } else {
                if (display.value !== -1) {
                    display.value = withTiming(1, {duration: duration});
                }
                sh.value = withTiming(SIDE_HEIGHT_FLAT_SMALL, {
                    duration: duration,
                });
                ch.value = withTiming(CENTER_HEIGHT_FLAT_SMALL, {
                    duration: duration,
                });
            }
        }
    }, [started, mapHiden, iosHeight, ch, sh, display, duration]);

    const animatedProps = useAnimatedProps(() => {
        // start of drawing
        // ↓
        // lw-→→---------------------------------------------rw
        // |                                                  ↓
        // ↑                                                  |
        // sh----____                                ____---←sh
        //           --------_______  _______--------
        //            cw............ch............cw

        return {
            d: `M ${lw},0 ${rw},0 ${rw},${sh.value} C ${rw},${sh.value} ${
                rw - cw
            },${ch.value} ${rw / 2},${ch.value} C ${cw},${ch.value} ${lw},${
                sh.value
            } ${lw},${sh.value} Z`,
            fill: interpolateColor(
                display.value,
                [-1, 0, 1],
                ['#313131', '#d8232a', '#f3a805'],
            ),
        };
    });

    const viewBox = '0 0 ' + getHorizontalPx(414) + ' ' + getHorizontalPx(116);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: getHorizontalPx(414),
            height: getHorizontalPx(116),
        },
    });

    return (
        <Svg viewBox={viewBox} style={[styles.container, style]}>
            <AnimatedPath animatedProps={animatedProps} stroke="none" />
        </Svg>
    );
};

export default React.memo(HeaderBacgroudShape);
