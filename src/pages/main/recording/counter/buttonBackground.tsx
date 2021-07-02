import React, {useRef, useEffect} from 'react';
import {Text,  ViewStyle, Animated} from 'react-native';

import AnimSvg from '../../../../helpers/animSvg';
import {getVerticalPx} from '../../../../helpers/layoutFoo';

import styles from './style';

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
    showModal?: boolean;
    backdropStyle?: ViewStyle;
    text: string;
}

const startPosition = getVerticalPx(232) * 2;

const ButtonBackground: React.FC<IProps> = ({showModal, text}: IProps) => {
    const backgroundPosition = useRef(new Animated.Value(-startPosition))
        .current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showModal) {
            Animated.timing(backgroundPosition, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
            }).start();
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: false,
            }).start();
            return;
        }
        Animated.timing(backgroundPosition, {
            toValue: -startPosition,
            duration: 400,
            useNativeDriver: false,
        }).start();
        Animated.timing(textOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [showModal, backgroundPosition, textOpacity]);

    return (
        <Animated.View style={[styles.container, {bottom: backgroundPosition}]}>
            <Animated.View
                style={[styles.textContainer, {opacity: textOpacity}]}>
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
            <AnimSvg style={styles.backGround} source={backGround} />
        </Animated.View>
    );
};

export default ButtonBackground;
