import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Animated,
    Easing,
    Text,
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
            }
            numTitle++;
        }

        if (type == 'text') {
            if (layout.height > text_h) {
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
            setH(linePosX);

            let allLine = (ww / 780.5) * 1394.3299560546875;

            setLineSvg(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780.5 235" transform-origin="0 0" transform="translate(0 ' +
                    getVerticalPx(100) +
                    `)" >
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    `)" fill="none" stroke="#d8232a" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="5 7" stroke-dashoffset="0"; vector-effect="non-scaling-stroke" d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -4.13146,-26.68449 2.14808,-36.228223 8.89059,-13.512047 38.43884,-15.473638 50.50122,-13.597978 12.06239,1.87566 20.73793,16.629252 27.53576,25.941961 3.631,4.97429 11.99908,19.77635 31.36279,31.98726 19.68,12.41036 80.06309,16.79441 97.51342,-6.92495 15.08597,-20.50561 12.41098,-39.463919 5.61301,-49.829535 -9.97549,-15.210733 -20.36178,-27.497651 -5.26811,-46.392482 6.22047,-7.78702 15.6387,-13.665704 21.385,-15.737044 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 6.38261,62.033691 37.49889,81.147731 15.14441,9.30287 67.68357,18.45429 101.98675,4.84847 13.79925,-5.47326 14.79695,-25.106047 6.7201,-34.416765 -8.86927,-10.224199 -22.11358,-6.540667 -18.78248,-23.262518 1.32079,-6.630265 13.78401,-9.741677 26.33093,1.077352 15.65972,13.503153 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 28.11392,-1.2509792 34.33837,4.9734742 4.82012,4.820122 12.81219,8.656904 22.18483,1.249504 11.71726,-9.2604141 24.42293,-18.5464479 48.5062,-11.8494979 24.98971,6.9490099 33.88292,18.8353649 33.76262,37.6449349 -0.0953,14.903714 -4.90293,26.537929 -9.63055,36.542234 -7.42353,15.709226 -16.21486,19.117829 -15.7542,8.113608 0.46066,-11.004221 17.7787,3.950183 27.24713,15.150343 9.46843,11.20016 21.85651,28.69838 21.85651,28.69838">
        <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; -700"/>
    </path>
    <path transform="scale(1.02 ` +
                    pathScaleY +
                    ')" stroke-dashoffset="0" stroke-dasharray="' +
                    allLine +
                    ' ' +
                    allLine +
                    `" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" stroke="#fff"  vector-effect="non-scaling-stroke"  d="m -0.33771156,111.59275 c 0,0 21.80715956,1.34357 31.19404956,-5.54053 9.38689,-6.884097 12.90885,-14.805211 27.57231,-12.645271 14.66347,2.159934 31.74926,28.636311 50.914372,41.705521 19.16511,13.06921 37.18624,3.73257 42.62949,-7.61718 5.44325,-11.34976 -4.13146,-26.68449 2.14808,-36.228223 8.89059,-13.512047 38.43884,-15.473638 50.50122,-13.597978 12.06239,1.87566 20.73793,16.629252 27.53576,25.941961 3.631,4.97429 11.99908,19.77635 31.36279,31.98726 19.68,12.41036 80.06309,16.79441 97.51342,-6.92495 15.08597,-20.50561 12.41098,-39.463919 5.61301,-49.829535 -9.97549,-15.210733 -20.36178,-27.497651 -5.26811,-46.392482 6.22047,-7.78702 15.6387,-13.665704 21.385,-15.737044 13.04064,-4.70069 24.22456,-6.170339 28.53102,22.11655 4.19803,27.57462 6.38261,62.033691 37.49889,81.147731 15.14441,9.30287 67.68357,18.45429 101.98675,4.84847 13.79925,-5.47326 14.79695,-25.106047 6.7201,-34.416765 -8.86927,-10.224199 -22.11358,-6.540667 -18.78248,-23.262518 1.32079,-6.630265 13.78401,-9.741677 26.33093,1.077352 15.65972,13.503153 29.10662,33.967711 35.6715,3.63802 4.72471,-21.82813 3.87426,-52.16072 18.9933,-62.7440592 15.1135,-10.5794497 28.11392,-1.2509792 34.33837,4.9734742 4.82012,4.820122 12.81219,8.656904 22.18483,1.249504 11.71726,-9.2604141 24.42293,-18.5464479 48.5062,-11.8494979 24.98971,6.9490099 33.88292,18.8353649 33.76262,37.6449349 -0.0953,14.903714 -4.90293,26.537929 -9.63055,36.542234 -7.42353,15.709226 -16.21486,19.117829 -15.7542,8.113608 0.46066,-11.004221 17.7787,3.950183 27.24713,15.150343 9.46843,11.20016 21.85651,28.69838 21.85651,28.69838">
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
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
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
                        props.navigation.navigate('PermitsDeclarations')
                    }
                    board={board}
                    list={list}
                    setBoard={setBoard}
                />
            </Animated.View>
        </>
    );
};

export default NewBeginning;
