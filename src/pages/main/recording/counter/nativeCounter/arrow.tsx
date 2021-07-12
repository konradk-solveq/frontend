import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
} from 'react-native-reanimated';

interface Props {
    down?: boolean;
}

// const AnimatedPath = Animated.createAnimatedComponent(Path);

const Arrow: React.FC<Props> = ({down}: Props) => {
    const arrowSides = [1.094, 6.929];
    const arrowCenter = [6.94, 1.082];

    // const path_1 = concat(
    //     'M12.385 ',
    //     arrowSides[0],
    //     'L6.74 ',
    //     arrowCenter[0],
    //     ' 1.093 ',
    //     arrowSides[0],
    // );
    // const path_2 = concat(
    //     'M12.385 ',
    //     arrowSides[1],
    //     'L6.74 ',
    //     arrowCenter[1],
    //     ' 1.093 ',
    //     arrowSides[1],
    // );

    const path_1 = 'M12.385 1.094L6.74 6.94 1.093 1.094';
    const path_2 = 'M12.385 6.929L6.74 1.082 1.093 6.93';

    // const displayDown = useRef(
    //     new Animated.Value(getHorizontalPx(334)),
    // ).current;

    // useEffect(() => {
    //     Animated.timing(displayDown, {
    //         toValue: down ? 1 : 0,
    //         duration: 400,
    //         useNativeDriver: false,
    //     }).start();
    // }, [down, displayDown]);

    // const arrowSides = displayDown.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [1.094, 6.929],
    // });

    // const arrowCenter = displayDown.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [6.94, 1.082],
    // });


    // const animatedProps = useAnimatedProps(() => {
    //     // draw a circle
    //     const path = path_1;
    //     return {
    //         d: path,
    //     };
    // });

    const styles = StyleSheet.create({
        btnContainer: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <Svg viewBox="0 0 13.5 8" style={styles.btnContainer}>
            <Path
                // animatedProps={animatedProps}
                fill="none"
                stroke="#313131"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={path_1}
            />
        </Svg>
    );
};

export default Arrow;
