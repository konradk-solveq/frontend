import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View, Animated, Easing} from 'react-native';
import AnimSvg from '@helpers/animSvg';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getRelativeHeight,
} from '@helpers/layoutFoo';
import {useAppDispatch} from '@hooks/redux';
import {fetchAppRegulations} from '@storage/actions';

import SplashScreen from '../splashScreen/splashScreen';
import Screen_1 from './screen_1';
import Screen_2 from './screen_2';
import Screen_3 from './screen_3';
import Screen_4 from './screen_4';
import Screen_5 from './screen_5';

import StaticElements from '../staticElements';
import BidirectionalSwipe from '@sharedComponents/navi/swipe/bidirectionalSwipe';
import {OnboardingStackRoute} from '@navigation/route';
import {isIOS} from '@utils/platform';

const {width, height} = Dimensions.get('window');

/** Number Of Screens On Tutorial */
const ELEMENTS_SUM = 5;
/** First Sreen Of Tutorial */
const MIN_BOARD = 1;
/** Last Sreen Of Tutorial */
const MAX_BOARD = 5;

interface Props {
    navigation: any;
}

const Tutorial: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

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

    /**
     * Fetch data when user device has not been registered yet.
     */
    useEffect(() => {
        dispatch(fetchAppRegulations());
    }, [dispatch]);

    // przewinięcie ekranu startowego
    useEffect(() => {
        if (board == 0) {
            setTimeout(() => {
                setBoard(1);
            }, 3500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        Animated.timing(position, {
            // animacja przewijania
            toValue: -width * board,
            duration: 500,
            easing: Easing.quad,
            useNativeDriver: true,
        }).start();

        if (board > 0) {
            Animated.timing(opacity, {
                // animacje pojawiania sie klawiszy w tutorialu poza ekranem startowym
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    const [imgH, setImgH] = useState(0);
    const [textH, setTextH] = useState(0);
    const [linePosX, setLinePosX] = useState(0);
    const [lineSvg, setLineSvg] = useState('');

    const wrapH =
        height - getVerticalPx(138) - getVerticalPx(65) * 2 - getVerticalPx(50);

    /** Screen Number For Title */
    let numTitle = 0;
    /** Screen Number For Text */
    let numText = 0;

    /** Height For All Titles Counting As Max Height Of All Titles */
    let title_h = 0;
    /** Height For All Texts Counting As Max Height Of All Texts */
    let text_h = 0;
    /** Scale For Flatten Dash Line */
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
            setTextH(text_h);
            /** Imagines Height Fitting Between Titles And Texts */
            let img_h = wrapH - title_h - text_h - getVerticalPx(40);
            setImgH(img_h);

            /** Left Position Of Dash Line */
            let linePosX =
                (wrapH - title_h - text_h - img_h - getVerticalPx(40)) / 2 +
                getVerticalPx(138 + 30) +
                title_h;

            /** Width Of Images */
            const img_w = getHorizontalPx(334) * 0.75749;
            /** Proportional Corection Of Width Of Images */
            const img_propo = img_w / (img_h * 0.9);
            /** Images Ratio */
            const orygin_propo = 254 / 250;
            /** Proportions Of Dash Line Counting From Ratio And Proportions Of Images */
            const path_propo = orygin_propo / img_propo;

            if (path_propo < 1) {
                pathScaleY *= path_propo;
            } else {
                linePosX += ((path_propo - 1) / 2) * (img_h * 0.9) * 0.7;
            }
            setLinePosX(linePosX);

            /** Width Of Dash Line For All 5 Screens & Splash Screen */
            let allLine = (width / 780.5) * 1394.3299560546875;

            setLineSvg(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150.5 235" transform-origin="0 0" transform="translate(0 ' +
                    getVerticalPx(100) +
                    `)" >
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    // first line the red dashed
                    `)" fill="none" stroke="#d8232a" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="5 7" stroke-dashoffset="0"; vector-effect="non-scaling-stroke" d="m -4.4747155,118.14513 c 0,0 23.8561655,5.0032 33.6218555,-3.3009 9.76559,-8.30412 13.0859,-17.136743 24.99999,-16.190714 11.91402,0.946052 17.21504,6.795484 36.45325,27.608314 19.23828,20.81283 37.7766,30.38421 52.22971,21.02895 14.4531,-9.35525 11.61129,-19.10724 9.5606,-33.82338 -2.05077,-14.716123 3.42778,-25.04115 24.6191,-28.40487 21.1914,-3.363666 29.42124,-1.040159 32.32418,4.730195 8.14817,16.196545 -12.49999,45.409785 -0.39057,48.878575 12.1093,3.4688 13.32491,-16.9842 14.8874,-26.97014 1.5625,-9.98595 11.23159,-2.89713 17.96988,2.8842 6.73829,5.78132 37.84581,32.91563 76.51771,21.14273 38.67179,-11.77292 39.35539,-37.315899 42.87111,-54.239432 3.5156,-16.92359 8.20308,-41.83591 19.72648,-58.128752 11.52352,-16.2928506 20.01959,-22.70487568 13.76962,-2.522776 -6.25002,20.182126 8.39837,28.381116 17.48039,30.903893 9.08209,2.522776 13.2813,1.892082 10.9375,19.866767 -2.34373,17.974728 -16.62853,54.34935 32.67568,58.21439 49.30412,3.865 83.41651,0.74327 105.5136,-0.74331 22.09701,-1.48652 40.189,-1.63521 42.5368,-40.285585 2.34792,-38.650418 0.81691,-59.231568 8.4341,-72.581225 7.61722,-13.3496207 20.8984,-12.7189256 28.51562,-5.255757 7.61719,7.463209 14.55081,18.710545 25.48831,9.355252 10.9375,-9.355252 30.92216,-25.319837 53.15736,-15.5085801 22.2352,9.8112561 33.8362,26.9066361 27.2071,57.6782751 -6.6292,30.771681 -10.1985,32.462147 -13.5188,36.824402 -3.3203,4.362298 -6.6895,5.676248 -7.9102,-4.257168 -1.2207,-9.933383 9.5215,-14.821214 19.1895,-15.872408 9.668,-1.051137 33.1055,-2.365086 43.2129,5.676258 10.1074,8.041302 31.3965,38.577266 46.2402,47.932516 14.8438,9.35525 60.9375,19.131 85.0586,1.9972 24.1211,-17.13378 22.7539,-28.80156 13.9649,-50.245084 -8.7891,-21.443481 -11.1328,-18.710509 -9.7657,-35.423839 1.3672,-16.713297 21.5821,-27.224816 27.6368,-29.747592 6.0546,-2.522779 27.2461,-8.934805 33.8867,17.238905 6.6406,26.173676 8.4961,34.793144 13.3789,50.980877 4.88284,16.187763 12.50004,31.534583 47.26564,43.202373 34.7656,11.66778 63.8672,16.29284 75.1953,9.35524 11.3281,-6.93758 9.1797,-19.86675 6.25,-26.90948 -2.9297,-7.04273 -8.7402,-10.35387 -12.3535,-13.559866 -3.6133,-3.206033 -4.1992,-8.619472 -0.3906,-13.82267 3.8085,-5.2032 10.5886,-5.010689 18.1155,0.266468 7.5268,5.277276 19.7458,16.974438 25.3671,23.607658">
        <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -700"/>
    </path>
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    ')" stroke-dashoffset="0" stroke-dasharray="' +
                    allLine +
                    ' ' +
                    allLine +
                    // second wider white line witch cover firs one for slow showing it on splash screen
                    `" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke="#fff"  vector-effect="non-scaling-stroke"  d="m -4.4747155,118.14513 c 0,0 23.8561655,5.0032 33.6218555,-3.3009 9.76559,-8.30412 13.0859,-17.136743 24.99999,-16.190714 11.91402,0.946052 17.21504,6.795484 36.45325,27.608314 19.23828,20.81283 37.7766,30.38421 52.22971,21.02895 14.4531,-9.35525 11.61129,-19.10724 9.5606,-33.82338 -2.05077,-14.716123 3.42778,-25.04115 24.6191,-28.40487 21.1914,-3.363666 29.42124,-1.040159 32.32418,4.730195 8.14817,16.196545 -12.49999,45.409785 -0.39057,48.878575 12.1093,3.4688 13.32491,-16.9842 14.8874,-26.97014 1.5625,-9.98595 11.23159,-2.89713 17.96988,2.8842 6.73829,5.78132 37.84581,32.91563 76.51771,21.14273 38.67179,-11.77292 39.35539,-37.315899 42.87111,-54.239432 3.5156,-16.92359 8.20308,-41.83591 19.72648,-58.128752 11.52352,-16.2928506 20.01959,-22.70487568 13.76962,-2.522776 -6.25002,20.182126 8.39837,28.381116 17.48039,30.903893 9.08209,2.522776 13.2813,1.892082 10.9375,19.866767 -2.34373,17.974728 -16.62853,54.34935 32.67568,58.21439 49.30412,3.865 83.41651,0.74327 105.5136,-0.74331 22.09701,-1.48652 40.189,-1.63521 42.5368,-40.285585 2.34792,-38.650418 0.81691,-59.231568 8.4341,-72.581225 7.61722,-13.3496207 20.8984,-12.7189256 28.51562,-5.255757 7.61719,7.463209 14.55081,18.710545 25.48831,9.355252 10.9375,-9.355252 30.92216,-25.319837 53.15736,-15.5085801 22.2352,9.8112561 33.8362,26.9066361 27.2071,57.6782751 -6.6292,30.771681 -10.1985,32.462147 -13.5188,36.824402 -3.3203,4.362298 -6.6895,5.676248 -7.9102,-4.257168 -1.2207,-9.933383 9.5215,-14.821214 19.1895,-15.872408 9.668,-1.051137 33.1055,-2.365086 43.2129,5.676258 10.1074,8.041302 31.3965,38.577266 46.2402,47.932516 14.8438,9.35525 60.9375,19.131 85.0586,1.9972 24.1211,-17.13378 22.7539,-28.80156 13.9649,-50.245084 -8.7891,-21.443481 -11.1328,-18.710509 -9.7657,-35.423839 1.3672,-16.713297 21.5821,-27.224816 27.6368,-29.747592 6.0546,-2.522779 27.2461,-8.934805 33.8867,17.238905 6.6406,26.173676 8.4961,34.793144 13.3789,50.980877 4.88284,16.187763 12.50004,31.534583 47.26564,43.202373 34.7656,11.66778 63.8672,16.29284 75.1953,9.35524 11.3281,-6.93758 9.1797,-19.86675 6.25,-26.90948 -2.9297,-7.04273 -8.7402,-10.35387 -12.3535,-13.559866 -3.6133,-3.206033 -4.1992,-8.619472 -0.3906,-13.82267 3.8085,-5.2032 10.5886,-5.010689 18.1155,0.266468 7.5268,5.277276 19.7458,16.974438 25.3671,23.607658">
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
        left: -width * 0.05,
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
            width: width * 6,
            height: '100%',
            backgroundColor: 'white',
            zIndex: isIOS ? 1 : 0,
        },
        screen: {
            width: width,
            height: '100%',
        },
        line,
    });

    const onSwipeRight = () => {
        setBoard(prev => (prev !== MAX_BOARD ? prev + 1 : prev));
    };

    const onSwipeLeft = () => {
        setBoard(prev => (prev !== MIN_BOARD ? prev - 1 : prev));
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
                        <Screen_4
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_5
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_3
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_1
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
                            textH={textH}
                        />
                    </View>

                    <View style={styles.screen}>
                        <Screen_2
                            handleMeasurement={handleMeasurement}
                            wrapH={wrapH}
                            imgH={imgH}
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
                        goForward={() =>
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

export default Tutorial;
