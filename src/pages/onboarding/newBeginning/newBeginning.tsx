import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Animated, Easing, Text } from 'react-native';
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

import StaticElements from './../staticElements';

interface Props {
    navigation: any;
}

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

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

    // TODO add GestureEvent

    const [titleH, setTitleH] = useState(0);
    const [imgH, setImgH] = useState(0);
    const [textH, setTextH] = useState(0);
    const [linePosX, setH] = useState(0);
    const [lineSvg, setLineSvg] = useState('');

    const wrapH = wh - getVerticalPx(138) - getVerticalPx(65) * 2 - 50;

    let numTitle = 0;
    let numText = 0;
    const ELEMENTS_SUM = 3;

    let title_h = 0;
    let text_h = 0;
    let pathScaleY = 0.9;

    const handleMeasurement = (layout, type) => {
        if (type == 'title') {
            if (layout.height > title_h) {
                title_h = layout.height;
                // console.log('%c title_h:', title_h);
            }
            numTitle++;
        }

        if (type == 'text') {
            if (layout.height > text_h) {
                text_h = layout.height;
                // console.log('%c text_h:', title_h);
            }
            numText++;
        }

        // console.log('>>>>>>', numTitle, numText)
        if (numTitle >= ELEMENTS_SUM && numText >= ELEMENTS_SUM) {
            setTitleH(title_h);
            // console.log('>>> title_h:', title_h)

            setTextH(text_h);
            // console.log('>>> text_h:', text_h)

            let img_h = wrapH - title_h - text_h - getVerticalPx(40);
            // console.log('>>> img_h:', img_h);
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
                console.log(
                    '%c linePosX:',
                    linePosX,
                    (path_propo - 1) / 2,
                    img_h,
                );
            }
            setH(linePosX);

            let allLine = (ww / 780.5) * 1394.3299560546875;

            console.log('---> propro:', img_propo, orygin_propo, path_propo);
            setLineSvg(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780.5 235" transform-origin="0 0" transform="translate(0 ' +
                getVerticalPx(100) +
                `)" >
    <path transform="scale(1.02 ` +
                pathScaleY +
                `)" fill="none" stroke="#d8232a" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="5 7" stroke-dashoffset="0"; vector-effect="non-scaling-stroke" d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -2.87185,-29.009897 3.40768,-38.553631 6.27954,-9.54374 37.17924,-13.14823 49.24162,-11.27257 12.06239,1.87566 14.60912,8.14121 23.66008,15.28384 11.09168,8.753081 19.31443,28.787311 45.75125,43.711191 20.26088,11.43749 69.55032,15.72861 87.00064,-7.99076 22.40008,-30.447317 -1.65971,-40.128391 -15.82147,-46.812111 -16.44999,-7.76367 -29.68408,-17.31023 -14.5904,-36.20505 13.34169,-16.70164 46.39547,-26.87056 52.14177,-28.9419 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 2.86125,79.063171 39.01591,85.775031 45.45597,8.43858 79.32968,10.10927 100.46973,0.22117 19.97739,-9.34426 12.69799,-28.590337 2.06122,-34.553791 -13.36183,-7.49126 -13.49505,-13.54368 -11.79416,-21.48118 1.70089,-7.9375 7.76314,-14.56906 24.00149,-0.56696 15.65972,13.50315 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 26.55284,-0.99218 31.46653,3.7325192 4.91369,4.7247 10.53608,13.18192 22.25334,3.92151 11.71726,-9.2604192 27.22626,-19.9774989 51.30953,-13.2805489 24.98971,6.9490099 29.61967,20.9669889 29.88694,32.9941189 0.33112,14.90034 -5.60443,37.21785 -11.45345,46.61069 -5.67947,9.12057 -9.82215,10.08941 -10.95805,3.60813 -1.13589,-6.48128 6.36413,-7.257408 28.14956,14.238181 l 21.30841,21.02492">
        <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -700"/>
    </path>
    <path transform="scale(1.02 ` +
                pathScaleY +
                ')" stroke-dashoffset="0" stroke-dasharray="' +
                allLine +
                ' ' +
                allLine +
                `" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke="#fff"  vector-effect="non-scaling-stroke"  d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -2.87185,-29.009897 3.40768,-38.553631 6.27954,-9.54374 37.17924,-13.14823 49.24162,-11.27257 12.06239,1.87566 14.60912,8.14121 23.66008,15.28384 11.09168,8.753081 19.31443,28.787311 45.75125,43.711191 20.26088,11.43749 69.55032,15.72861 87.00064,-7.99076 22.40008,-30.447317 -1.65971,-40.128391 -15.82147,-46.812111 -16.44999,-7.76367 -29.68408,-17.31023 -14.5904,-36.20505 13.34169,-16.70164 46.39547,-26.87056 52.14177,-28.9419 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 2.86125,79.063171 39.01591,85.775031 45.45597,8.43858 79.32968,10.10927 100.46973,0.22117 19.97739,-9.34426 12.69799,-28.590337 2.06122,-34.553791 -13.36183,-7.49126 -13.49505,-13.54368 -11.79416,-21.48118 1.70089,-7.9375 7.76314,-14.56906 24.00149,-0.56696 15.65972,13.50315 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 26.55284,-0.99218 31.46653,3.7325192 4.91369,4.7247 10.53608,13.18192 22.25334,3.92151 11.71726,-9.2604192 27.22626,-19.9774989 51.30953,-13.2805489 24.98971,6.9490099 29.61967,20.9669889 29.88694,32.9941189 0.33112,14.90034 -5.60443,37.21785 -11.45345,46.61069 -5.67947,9.12057 -9.82215,10.08941 -10.95805,3.60813 -1.13589,-6.48128 6.36413,-7.257408 28.14956,14.238181 l 21.30841,21.02492">
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

    setObjSize(414 * 4, 0.3 * 414 * 4);
    const line: any = {
        position: 'absolute',
        width: getWidthPx(),
        height: getRelativeHeight(),
        left: -ww * 0.01,
        top: linePosX,
        // backgroundColor: '#00ff9933',
    };

    setObjSize(414, 175);
    const styles = StyleSheet.create({
        static: {
            position: 'absolute',
            left: 0,
            top: 0,
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: ww * 4,
            height: '100%',
            backgroundColor: 'white',
        },
        screen: {
            width: ww,
            height: '100%',
        },
        line,
        // test: {
        //     position: 'absolute',
        //     top: 3,
        //     left: 10
        // }
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateX: position }],
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
            </Animated.View>

            <Animated.View
                style={[
                    styles.line,
                    {
                        transform: [{ translateX: position }],
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
                        props.navigation.navigate('PermitsDeclarations')
                    }
                    board={board}
                    list={list}
                    setBoard={setBoard}
                />
            </Animated.View>

            {/* <Text style={styles.test}>test</Text> */}
        </>
    );
};

export default NewBeginning;
