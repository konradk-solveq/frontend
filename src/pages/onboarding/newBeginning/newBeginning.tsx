import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Animated,
    Easing,
    Platform,
} from 'react-native';
import AnimSvg from '../../../helpers/animSvg';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getRelativeHeight,
} from '../../../helpers/layoutFoo';

import SplashScreen from '../splashScreen/splashScreen';
import Screen_1 from './screen_1';
import Screen_2 from './screen_2';
import Screen_3 from './screen_3';
import Screen_4 from './screen_4';
import Screen_5 from './screen_5';

import StaticElements from './../staticElements';
import Swipe from '../../../sharedComponents/navi/swipe/swipe';
import BidirectionalSwipe from '../../../sharedComponents/navi/swipe/bidirectionalSwipe';
import {OnboardingStackRoute} from '../../../navigation/route';

interface Props {
    navigation: any;
}

const isIOS = Platform.OS === 'ios';
const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;
const minBoard = 1;
const maxBoard = 5;

const NewBeginning: React.FC<Props> = (props: Props) => {
    const [board, setBoard] = useState(0);
    const position = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    // list funcji na przycisków radio panelu
    const list: Array<Function> = [
        () => {
            setBoard(1);
        },
        () => {
            setBoard(2);
        },
        () => {
            setBoard(3);
        },
        () => {
            setBoard(4);
        },
        () => {
            setBoard(5);
        },
    ];

    // przewinięcie ekranu startowego
    useEffect(() => {
        if (board == 0) {
            setTimeout(() => {
                setBoard(1);
            }, 3500);
        }
    }, []);

    useEffect(() => {
        Animated.timing(position, {
            // animacja przewijania
            toValue: -ww * board,
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: true,
        }).start();

        if (board > 0) {
            Animated.timing(opacity, {
                // animacje pojawiania sie klawiszy w turtorialu poza ekranem startowym
                toValue: 1,
                duration: 500,
                easing: Easing.cubic,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                easing: Easing.cubic,
                useNativeDriver: true,
            }).start();
        }
    }, [board]);

    const [titleH, setTitleH] = useState(0);
    const [imgH, setImgH] = useState(0);
    const [textH, setTextH] = useState(0);
    const [linePosX, setLinePosX] = useState(0);
    const [lineSvg, setLineSvg] = useState('');

    const wrapH =
        wh - getVerticalPx(138) - getVerticalPx(65) * 2 - getVerticalPx(50);

    let numTitle = 0;
    let numText = 0;
    const ELEMENTS_SUM = 5;

    let title_h = 0;
    let text_h = 0;
    let pathScaleY = 0.9;

    const handleMeasurement = (layout, type) => {
        if (type == 'title') {
            if (getVerticalPx(layout.height) > title_h) {
                title_h = getVerticalPx(layout.height);
            }
            numTitle++;
        }

        if (type == 'text') {
            if (getVerticalPx(layout.height) > text_h) {
                text_h = layout.height;
            }
            numText++;
        }

        if (numTitle >= ELEMENTS_SUM && numText >= ELEMENTS_SUM) {
            setTitleH(title_h);

            setTextH(text_h);
            let img_h = wrapH - title_h - text_h - getVerticalPx(40);
            setImgH(img_h);

            let linePosX =
                (wrapH - title_h - text_h - img_h - getVerticalPx(40)) / 2 +
                getVerticalPx(138 + 30) +
                title_h;

            let img_w = getHorizontalPx(334) * 0.75749;
            let img_propo = img_w / (img_h * 0.9);
            let orygin_propo = 254 / 250;
            let path_propo = orygin_propo / img_propo;

            if (path_propo < 1) {
                pathScaleY *= path_propo;
            } else {
                linePosX += ((path_propo - 1) / 2) * (img_h * 0.9) * 0.7;
            }
            setLinePosX(linePosX);

            let allLine = (ww / 780.5) * 1394.3299560546875;

            setLineSvg(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150.5 235" transform-origin="0 0" transform="translate(0 ' +
                    getVerticalPx(100) +
                    `)" >
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    `)" fill="none" stroke="#d8232a" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="5 7" stroke-dashoffset="0"; vector-effect="non-scaling-stroke" d="M-.334 117.253s21.806 1.345 31.193-5.54c9.387-6.884 12.909-14.806 27.573-12.646 14.663 2.16 31.751 28.637 50.915 41.707 19.166 13.069 37.186 3.733 42.63-7.617 5.443-11.349-4.132-26.685 2.148-36.229 8.89-13.512 38.438-15.473 50.5-13.597 12.062 1.875 20.739 16.628 27.538 25.941 3.63 4.974 11.997 19.776 31.36 31.986 19.68 12.411 80.064 16.796 97.514-6.923 15.086-20.506 12.411-39.465 5.613-49.83-9.975-15.211-20.361-27.498-5.267-46.393 6.22-7.787 15.638-13.666 21.385-15.736 13.041-4.701 24.224-6.172 28.531 22.115 4.198 27.574 6.382 62.034 37.498 81.148 15.144 9.303 86.349 27.606 103.845 13.275 11.389-9.33 10.106-32.106-.795-39.894-10.9-7.789-14.637-10.075-13.124-18.213 1.32-6.63 13.783-9.743 26.33 1.076 15.659 13.504 29.107 25.971 35.672-4.359 4.724-21.828 3.872-53.777 18.992-64.36 15.113-10.58 26.428-.439 32.653 5.785 4.82 4.82 10.123 10.845 23.87.438 11.908-9.015 26.108-17.699 48.382-11.35 25.636 7.308 29.732 22.57 29.7 38.198-.408 12.404-5.3 28.8-8.085 35.731-6.48 16.122-15.043 19.91-14.583 8.906 1.158-14.17 20.592 12.217 37.067 34.69 11.617 15.242 16.935 11.055 19.177-7.125 2.075-16.823 6.059-20.065 21.34-6.935 20.343 17.477 69.35 34.068 102.458 9.843 19.03-13.924 20.551-45.165 29.29-84.509 5.093-22.926 17.102-29.53 19.694-31.31 1.619-1.112 5.575-3.86 7.586-3.637 1.206.134 1.713 1.338.593 4.606-9.901 28.91 10.399 34.142 15.614 35.822 5.215 1.679 13.893.757 11.156 18.469-2.125 13.75-13.163 58.128 20.25 62.605 52.899 7.183 151.562 6.446 187.333-3.218">
        <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -700"/>
    </path>
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    ')" stroke-dashoffset="0" stroke-dasharray="' +
                    allLine +
                    ' ' +
                    allLine +
                    `" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke="#fff"  vector-effect="non-scaling-stroke"  d="M-.334 117.253s21.806 1.345 31.193-5.54c9.387-6.884 12.909-14.806 27.573-12.646 14.663 2.16 31.751 28.637 50.915 41.707 19.166 13.069 37.186 3.733 42.63-7.617 5.443-11.349-4.132-26.685 2.148-36.229 8.89-13.512 38.438-15.473 50.5-13.597 12.062 1.875 20.739 16.628 27.538 25.941 3.63 4.974 11.997 19.776 31.36 31.986 19.68 12.411 80.064 16.796 97.514-6.923 15.086-20.506 12.411-39.465 5.613-49.83-9.975-15.211-20.361-27.498-5.267-46.393 6.22-7.787 15.638-13.666 21.385-15.736 13.041-4.701 24.224-6.172 28.531 22.115 4.198 27.574 6.382 62.034 37.498 81.148 15.144 9.303 86.349 27.606 103.845 13.275 11.389-9.33 10.106-32.106-.795-39.894-10.9-7.789-14.637-10.075-13.124-18.213 1.32-6.63 13.783-9.743 26.33 1.076 15.659 13.504 29.107 25.971 35.672-4.359 4.724-21.828 3.872-53.777 18.992-64.36 15.113-10.58 26.428-.439 32.653 5.785 4.82 4.82 10.123 10.845 23.87.438 11.908-9.015 26.108-17.699 48.382-11.35 25.636 7.308 29.732 22.57 29.7 38.198-.408 12.404-5.3 28.8-8.085 35.731-6.48 16.122-15.043 19.91-14.583 8.906 1.158-14.17 20.592 12.217 37.067 34.69 11.617 15.242 16.935 11.055 19.177-7.125 2.075-16.823 6.059-20.065 21.34-6.935 20.343 17.477 69.35 34.068 102.458 9.843 19.03-13.924 20.551-45.165 29.29-84.509 5.093-22.926 17.102-29.53 19.694-31.31 1.619-1.112 5.575-3.86 7.586-3.637 1.206.134 1.713 1.338.593 4.606-9.901 28.91 10.399 34.142 15.614 35.822 5.215 1.679 13.893.757 11.156 18.469-2.125 13.75-13.163 58.128 20.25 62.605 52.899 7.183 151.562 6.446 187.333-3.218">
    <animate attributeName="stroke-dashoffset" begin="0.7s" dur="3s" repeatCount="1" fill="freeze" values="0 ; -` +
                    allLine +
                    `"/>
    <animate attributeName="stroke-width" begin="3.6s" dur="0.001s" repeatCount="1" fill="freeze" values="3 ; 0"/>
    </path>
    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0,85" to="0,0" dur="1.5s" begin="2.0s" repeatCount="1" fill="freeze"/>
</svg>`,
            );
        }
    };

    setObjSize(414 * 6.06, 0.3 * 414 * 4);
    const line: any = {
        position: 'absolute',
        width: getWidthPx(),
        height: getRelativeHeight(),
        left: -ww * 0.05,
        top: linePosX,
        // backgroundColor: '#00ff9933',
    };

    setObjSize(414, 175);
    const styles = StyleSheet.create({
        static: {
            position: isIOS ? 'relative' : 'absolute',
            left: 0,
            top: 0,
        },
        wrap: {
            flex: isIOS ? 1 : 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: ww * 6,
            height: '100%',
            backgroundColor: 'white',
            zIndex: isIOS ? 1 : 0,
        },
        screen: {
            width: ww,
            height: '100%',
        },
        line,
    });

    const onSwipeRight = () => {
        setBoard(prev => (prev !== maxBoard ? prev + 1 : prev));
    };

    const onSwipeLeft = () => {
        setBoard(prev => (prev !== minBoard ? prev - 1 : prev));
    };

    return (
        <BidirectionalSwipe
            onFirstSwipeAction={onSwipeRight}
            firstDirection={2}
            onSecondSwipeAction={onSwipeLeft}
            secondDirection={1}>
            <View>
                <Animated.View
                    style={[
                        styles.wrap,
                        {
                            transform: [{translateX: position}],
                        },
                    ]}>
                    <View style={styles.screen}>
                        <SplashScreen />
                    </View>

                    <View style={styles.screen}>
                        <Screen_1
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            titleH={titleH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_2
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            titleH={titleH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_3
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            titleH={titleH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_4
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            titleH={titleH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_5
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            titleH={titleH}
                            textH={textH}
                        />
                    </View>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.line,
                        {
                            transform: [{translateX: position}],
                        },
                    ]}>
                    <AnimSvg source={lineSvg} />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.screen,
                        styles.static,
                        {
                            opacity: opacity,
                        },
                    ]}>
                    <StaticElements
                        goFoward={() =>
                            props.navigation.navigate(
                                OnboardingStackRoute.PERMITS_SCREEN,
                            )
                        }
                        board={board}
                        list={list}
                        setBoard={setBoard}
                    />
                </Animated.View>
            </View>
        </BidirectionalSwipe>
    );
};

export default NewBeginning;
