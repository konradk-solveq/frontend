import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';

interface IProps {
    started?: boolean;
}

const NativeTopInfo: React.FC<IProps> = ({started}: IProps) => {
    const topInfo = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (started) {
            Animated.timing(topInfo, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
            return;
        }
        Animated.timing(topInfo, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();

        return () => {
            topInfo.setValue(0);
        };
    }, [started, topInfo]);

    const boxInterpolation = topInfo.interpolate({
        inputRange: [0, 1],
        outputRange: ['#F3A805', '#d8232a'],
    });

    const boxBorderWidthInterpolation = topInfo.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getHorizontalPx(50)],
    });

    const boxHeightInterpolation = topInfo.interpolate({
        inputRange: [0, 1],
        outputRange: [getVerticalPx(50), getVerticalPx(100)],
    });

    const animatedStyle = {
        backgroundColor: boxInterpolation,
        borderBottomRightRadius: boxBorderWidthInterpolation,
        borderBottomLeftRadius: boxBorderWidthInterpolation,
        height: boxHeightInterpolation,
    };

    return <Animated.View style={[styles.container, animatedStyle]} />;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        backgroundColor: '#F3A805',
        width: getHorizontalPx(100),
        transform: [{scaleX: 5}],
        zIndex: 2,
    },
});

export default React.memo(NativeTopInfo);
