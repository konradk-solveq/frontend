import React, {useRef, useEffect} from 'react';
import {View, Text, ViewStyle, Animated} from 'react-native';

import AnimSvg from '../../../../helpers/animSvg';
import {StyleSheet} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../helpers/layoutFoo';
import {useState} from 'react';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: getHorizontalPx(414),
        height: getVerticalPx(896),
        zIndex: 1,
    },
    backGround: {
        position: 'absolute',
        height: getHorizontalPx(180) * 1.9,
        left: 0,
        width: getHorizontalPx(414),
        bottom: 0,
    },
    textContainer: {
        position: 'absolute',
        height: getHorizontalPx(120) * 1.9,
        left: 0,
        width: getHorizontalPx(414 - 80),
        marginHorizontal: 40,
        bottom: 0,
        zIndex: 2,
    },
    message: {
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 23,
        color: '#313131',
        letterSpacing: 0,
        textAlign: 'center',
        marginTop: 30,
    },
    plug: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: getHorizontalPx(414),
        height: getHorizontalPx(150),
        backgroundColor: '#fff',
    },
});

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

const startPosition = getVerticalPx(232) * 2;

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

    const backgroundPosition = useRef(
        new Animated.Value(-startPosition),
    ).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (show) {
            Animated.timing(backgroundPosition, {
                toValue: 0,
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
    }, [show, backgroundPosition, textOpacity]);

    return (
        <Animated.View style={[styles.container, {bottom: backgroundPosition}]}>
            <Animated.View
                style={[styles.textContainer, {opacity: textOpacity}]}>
                <Text style={styles.message}>{currentMessage}</Text>
            </Animated.View>
            <View style={styles.plug} />
            <AnimSvg style={styles.backGround} source={backGround} />
        </Animated.View>
    );
};

export default ButtonBackground;
