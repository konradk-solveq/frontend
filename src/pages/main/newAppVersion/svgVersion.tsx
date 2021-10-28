import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
    useSharedValue,
    withSequence,
    withTiming,
    withRepeat,
    withDelay,
    Easing,
    useAnimatedStyle,
} from 'react-native-reanimated';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';
import Svg, {G, Path} from 'react-native-svg';

const SvgVersion: React.FC = () => {
    const backScale = useSharedValue(0);
    const backRotation = useSharedValue(0);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    const arrowsW = getHorizontalPx(90);
    const arrowsH = getHorizontalPx(92.68);

    const backAnimStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {rotate: backRotation.value + 'deg'},
                {scale: backScale.value},
            ],
        };
    });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{rotate: rotation.value + 'deg'}, {scale: scale.value}],
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        backScale.value = withTiming(1, {
            duration: 1200,
            easing: Easing.bezier(0.57, 0.01, 1, 0.76),
        });
        backRotation.value = withRepeat(
            withTiming(360, {
                duration: 27000,
                easing: Easing.linear,
            }),
            -1,
            false,
        );
        rotation.value = withDelay(
            700 + 1500 + 1000,
            withRepeat(
                withSequence(
                    withTiming(180, {
                        duration: 1500,
                        easing: Easing.bezier(0.49, 0.01, 0.57, 1),
                    }),
                    withTiming(180, {
                        duration: 3000,
                    }),
                    withTiming(360, {
                        duration: 1500,
                        easing: Easing.bezier(0.49, 0.01, 0.57, 1),
                    }),
                    withTiming(360, {
                        duration: 3000,
                    }),
                ),
                -1,
                false,
            ),
        );
        scale.value = withDelay(
            700,
            withSequence(
                withTiming(1, {
                    duration: 1500,
                    easing: Easing.bezier(0.57, 0.01, 1, 0.76),
                }),
                withDelay(
                    1000,
                    withRepeat(
                        withSequence(
                            withTiming(1, {
                                duration: 200,
                            }),
                            withTiming(1.05, {
                                duration: 500,
                                easing: Easing.linear,
                            }),
                            withTiming(1, {
                                duration: 500,
                                easing: Easing.linear,
                            }),
                            withTiming(1, {
                                duration: 3300,
                            }),
                        ),
                        -1,
                        false,
                    ),
                ),
            ),
        );
        opacity.value = withDelay(
            700,
            withTiming(1, {
                duration: 1500,
                easing: Easing.bezier(0.57, 0.01, 1, 0.76),
            }),
        );
    }, []);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        svgWrap: {
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(20),
            position: 'relative',
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
            left: getHorizontalPx(19),
        },
        backWrap: {
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
        },
        svgBack: {
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
        },
        arrowsWrap: {
            position: 'absolute',
            left: (getHorizontalPx(296) - arrowsW) / 2,
            top: (getHorizontalPx(296) - arrowsH) / 2,
        },
        svgArrows: {
            width: arrowsW,
            height: arrowsH,
        },
    });

    return (
        <View style={styles.svgWrap}>
            <Animated.View style={[styles.backWrap, backAnimStyle]}>
                <Svg style={styles.svgBack} viewBox="0 0 296 296">
                    <G fill="none" fill-rule="evenodd">
                        <Path
                            d="M142.683 0h10.634C232.12 0 296 66.262 296 148s-63.881 148-142.683 148h-10.634C63.88 296 0 229.738 0 148S63.881 0 142.683 0z"
                            fill="#f0f0f0"
                        />
                        <Path
                            d="M165.867 66.048a18.39 18.39 0 0 0 27.445 11.37c16.459-10.026 35.307 8.811 25.28 25.28a18.39 18.39 0 0 0 11.36 27.435c18.73 4.544 18.73 31.19 0 35.734a18.39 18.39 0 0 0-11.37 27.445c10.026 16.459-8.811 35.307-25.28 25.28a18.39 18.39 0 0 0-27.435 11.36c-4.544 18.73-31.19 18.73-35.734 0a18.39 18.39 0 0 0-27.445-11.37c-16.459 10.026-35.307-8.811-25.28-25.28a18.39 18.39 0 0 0-11.36-27.435c-18.73-4.544-18.73-31.19 0-35.734a18.39 18.39 0 0 0 11.37-27.445c-10.026-16.459 8.811-35.307 25.28-25.28 10.667 6.485 24.491.747 27.435-11.36 4.544-18.73 31.19-18.73 35.734 0zM148.5 117c-17.397 0-31.5 14.103-31.5 31.5s14.103 31.5 31.5 31.5 31.5-14.103 31.5-31.5-14.103-31.5-31.5-31.5z"
                            fill="#fff"
                        />
                    </G>
                </Svg>
            </Animated.View>

            <Animated.View style={[styles.arrowsWrap, animatedStyles]}>
                <Svg viewBox="0 0 90 92.68" style={styles.svgArrows}>
                    <Path
                        d="M89.417 56.125c.455.545.298.99.298.99l-1.066 3.3c-5.506 17.044-20.385 29.49-38.143 31.904-3.335.351-5.557.47-8.416.252-10.873-.829-22.41-5.74-28.438-12.106-.8-.844-1.793-1.836-2.02-2.001-.18.184-4.798 4.565-7.093 6.886-1.89 1.912-2.902 2.269-3.726 1.522 0 0-.273-.11-.597-.764-.27-.548-.21-1.377-.21-1.377V57.308s-.03-.57.564-1.112c.602-.548 1.351-.536 1.351-.536H29.425s.644-.022 1.174.241c.53.264.731.566.731.566.922 1.355.325 1.935-4.132 6.41l-4.615 4.688 2.304 2.012c4.888 4.268 11.157 6.684 17.917 7.177 2.996.24 5.072.063 7.702-.492 9.397-1.984 17.575-8.895 21.863-17.508l.929-1.864s.18-.516.644-.884c.466-.369 1.071-.346 1.071-.346H88.508s.507-.017.91.465zM.583 36.555c-.455-.545-.298-.989-.298-.989l1.066-3.3C6.857 15.22 21.736 2.775 39.494.36 42.829.01 45.05-.109 47.91.11c10.873.828 22.41 5.74 28.438 12.105.8.845 1.793 1.837 2.02 2.002.18-.185 4.798-4.565 7.093-6.887 1.89-1.911 2.902-2.268 3.726-1.522 0 0 .273.11.597.765.27.548.21 1.376.21 1.376v27.423s.03.57-.564 1.112c-.602.549-1.351.537-1.351.537H60.575s-.644.021-1.174-.242c-.53-.264-.731-.565-.731-.565-.922-1.355-.325-1.936 4.132-6.41l4.615-4.69-2.304-2.01c-4.888-4.269-11.157-6.684-17.917-7.178-2.996-.24-5.072-.063-7.702.493-9.397 1.984-17.575 8.894-21.863 17.507l-.929 1.865s-.18.515-.644.884c-.466.368-1.071.346-1.071.346H1.492s-.507.016-.91-.466z"
                        fill="#313131"
                    />
                </Svg>
            </Animated.View>
        </View>
    );
};

export default SvgVersion;
