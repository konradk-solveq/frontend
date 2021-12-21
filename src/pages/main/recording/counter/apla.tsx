import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ViewStyle, Animated} from 'react-native';

import AnimSvg from '@helpers/animSvg';
import {StyleSheet} from 'react-native';
import {
    getFontSize,
    getHorizontalPx,
    getVerticalPx,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {getAppLayoutConfig as get} from '@helpers/appLayoutConfig';
import {isIOS} from '@utils/platform';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const backGround = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414 332">
<filter id="filter" x="-1" width="3" y="-1" height="3">
    <feGaussianBlur stdDeviation="38.75575"/>
</filter>
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z"
 filter="url(#filter)" fill="#aaa" />
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z" fill="#fff"/>
</svg>`;

interface IProps {
    show?: boolean;
    backdropStyle?: ViewStyle;
    message: string;
    duration: number;
}
const ButtonBackground: React.FC<IProps> = ({
    show,
    message,
    duration,
}: IProps) => {
    const [currentMessage, setCurrentMessage] = useState('');
    useEffect(() => {
        if (show) {
            setCurrentMessage(message);
        }
    }, [show, message]);

    const {top} = useSafeAreaInsets();
    const ACTION_BUTTONS_TOP = mainButtonsHeight(50) + getVerticalPx(65);
    const startPosition = getHorizontalPx(332);

    const backgroundPosition = useRef(new Animated.Value(-startPosition))
        .current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (show) {
            Animated.timing(backgroundPosition, {
                toValue: getVerticalPx(50 + 65) - ACTION_BUTTONS_TOP,
                duration: duration,
                useNativeDriver: false,
            }).start();
            Animated.timing(textOpacity, {
                toValue: 1,
                delay: duration,
                duration: duration / 2,
                useNativeDriver: false,
            }).start();
            return;
        }
        Animated.timing(backgroundPosition, {
            toValue: -startPosition,
            duration: duration,
            useNativeDriver: false,
        }).start();
        Animated.timing(textOpacity, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: false,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, backgroundPosition, textOpacity]);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: getHorizontalPx(414),
            top: 0,
            height: getVerticalPx(896) - top,
            zIndex: 1,
        },
        wrap: {
            position: 'absolute',
            width: getHorizontalPx(414),
            height: getVerticalPx(896) - top,
        },
        backGround: {
            position: 'absolute',
            height: getHorizontalPx(332),
            left: 0,
            width: getHorizontalPx(414),
            bottom: 0,
        },
        textContainer: {
            position: 'absolute',
            height: getHorizontalPx(50),
            left: 0,
            width: getHorizontalPx(414 - 80),
            marginHorizontal: getHorizontalPx(40),
            bottom: getHorizontalPx(130),
            zIndex: 2,
        },
        message: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(23),
            color: '#313131',
            letterSpacing: 0,
            textAlign: 'center',
        },
        plug: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: getHorizontalPx(414),
            height: getVerticalPx(150),
            backgroundColor: '#fff',
        },
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.wrap, {bottom: backgroundPosition}]}>
                <Animated.View
                    style={[styles.textContainer, {opacity: textOpacity}]}>
                    <Text style={styles.message}>{currentMessage}</Text>
                </Animated.View>
                <View style={styles.plug} />
                <AnimSvg style={styles.backGround} source={backGround} />
            </Animated.View>
        </View>
    );
};

export default ButtonBackground;
