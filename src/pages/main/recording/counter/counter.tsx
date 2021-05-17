import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import Svg, { G, Path, Circle } from 'react-native-svg';

import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getBike } from '../../../../helpers/transformUserBikeData';
import BikeSelectorList from './bikeSelectorList/bikeSelectorList';
import apla from '../../../../sharedComponents/modals/backGround';

import AnimSvg from '../../../../helpers/animSvg';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import StackHeader from './stackHeader/stackHeader';

import { pointToComa, twoDigits } from '../../../../helpers/stringFoo';

import webview from './webview';

const btnMapBackground = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15.4 -15.4 46.2 46.2">
<defs>
    <filter id="f1" x="-1" width="3" y="-1" height="3">
        <feGaussianBlur stdDeviation="6"/>
    </filter>
</defs>
<circle transform="translate(-107.1 -21.8)" cx="114.8" cy="29.5" r="7.6" fill="#dddddd" filter="url(#f1)" />
</svg>`;

interface Props {
    navigation: any;
}

const Counter: React.FC<Props> = ({ navigation }: Props) => {
    const trans = I18n.t('MainCounter');
    const dispatch = useAppDispatch();
    const bikes = useAppSelector<UserBike[]>(state => state.bikes.list);
    const [bike, setBike] = useState<UserBike | null>(bikes?.[0] || null);

    useEffect(() => {
        setBike(bikes?.[0] || null);
    }, [bikes]);

    const onChangeBikeHandler = (frameNumber: string) => {
        if (frameNumber === bike?.description.serial_number) {
            return;
        }
        const newBike = getBike(bikes, frameNumber);
        if (newBike) {
            setBike(newBike);
        }
    };

    const [distance, setDistance] = useState(34.66);
    const [time, setTime] = useState(['00:00', ':00']);
    const [startTime, setStartTime] = useState(Date.now());
    const [speed, setSpeed] = useState(2.3);
    const [averageSpeed, setAverageSpeed] = useState(15.1);

    const timer = useRef();
    const interval = useCallback(() => {
        let passed = Math.round((Date.now() - startTime) / 1000);
        let s = passed % 60;
        let m = Math.floor((passed / 60) % 60);
        let h = Math.floor((passed / (60 * 60)) % (60 * 60));

        setTime(['' + twoDigits(h) + ':' + twoDigits(m), ':' + twoDigits(s)]);
    }, [startTime]);

    useEffect(() => {
        timer.current = setInterval(interval, 1000);
        return () => {
            clearInterval(timer.current);
        };
    }, [interval]);

    const [areaHeigh, setAreaHeigh] = useState(0);
    const [headHeight, setHeadHeight] = useState(0);

    const [endRute, setEndRute] = useState(false);
    const [pause, setPause] = useState(null);
    const bikeSelectorListPositionY = useRef(
        new Animated.Value(headHeight + getVerticalPx(30)),
    ).current;

    const handleCancelOrPause = () => {
        if (endRute) {
            setEndRute(false);
        } else {
            if (pause) {
                let pauseTime = Date.now() - pause;
                setStartTime(startTime + pauseTime);
                timer.current = setInterval(interval, 1000);
                setPause(false);

                Animated.timing(bikeSelectorListPositionY, {
                    toValue: headHeight + getVerticalPx(-30),
                    duration: 500,
                    easing: Easing.quad,
                    useNativeDriver: false,
                }).start();
            } else {
                clearInterval(timer.current);
                setPause(Date.now());

                Animated.timing(bikeSelectorListPositionY, {
                    toValue: headHeight + getVerticalPx(30),
                    duration: 500,
                    easing: Easing.quad,
                    useNativeDriver: false,
                }).start();
            }
        }
    };

    const handleEnd = () => {
        if (!endRute) {
            setEndRute(true);
        }
    };

    const animSvgRef = useRef();

    useEffect(() => {
        animSvgRef.current.injectJavaScript(
            'init(' +
            getHorizontalPx(414) +
            ', ' +
            getVerticalPx(896) + ', { lat: 53.009342618210624, lng: 20.890509251985964 }' +
            ');true;',
        );
    }, [])

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        area: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            height: areaHeigh,
            minHeight: getHorizontalPx(305),
            marginTop: getVerticalPx(60),
        },
        // bikeList: {
        //     marginTop: bikeSelectorListPositionY,
        // },
        board: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        quart: {
            width: '50%',
            paddingTop: getVerticalPx(37),
            paddingBottom: getHorizontalPx(116) - 95,
        },
        name: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        counter: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
        },
        value: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 57,
            lineHeight: 72,
            color: '#313131',
        },
        unit: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 18,
            color: '#555555',
        },
        horisontalLine: {
            borderBottomColor: '#dddddd',
            borderBottomWidth: 1,
            paddingTop: getVerticalPx(5),
            paddingBottom: getHorizontalPx(152 - 5) - 95,
        },
        verticalLine: {
            borderLeftColor: '#dddddd',
            borderLeftWidth: 1,
            paddingLeft: getHorizontalPx(30),
        },
        btnMap: {
            width: getHorizontalPx(51),
            height: getHorizontalPx(51),
            position: 'absolute',
            left: getHorizontalPx(167 - 25),
            top: getHorizontalPx(152 - 25),
        },
        btnMapBackground: {
            position: 'absolute',
            width: getHorizontalPx(51 * 3),
            height: getHorizontalPx(51 * 3),
            left: getHorizontalPx(167 - 25 * 3 - 1),
            top: getHorizontalPx(152 - 25 * 3 - 1),
        },
        bottons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            position: 'absolute',
            bottom: getVerticalPx(65),
            height: 50,
        },
        btn: {
            width: getWidthPxOf(157),
        },
        apla: {
            position: 'absolute',
            width: getHorizontalPx(414),
            height: getHorizontalPx(800),
            left: 0,
            bottom: -(
                getHorizontalPx(800) -
                (getVerticalPx(35 + 65 + 145 + 90) + 50)
            ),
        },
        endText: {
            position: 'absolute',
            width: getHorizontalPx(352),
            left: getHorizontalPx(30),
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            lineHeight: 30,
            color: '#313131',
            textAlign: 'center',
            bottom: getHorizontalPx(65 + 40) + 50,
        },
        fullView: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
        },
    });

    return (
        <SafeAreaView style={styles.container}>



            <View style={styles.fullView}>
                <WebView
                    style={styles.fullView}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    useWebKit={Platform.OS === 'ios'}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    source={{
                        html:
                            '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                            webview +
                            '</body></html>',
                        baseUrl:
                            Platform.OS === 'ios'
                                ? ''
                                : 'file:///android_asset/',
                    }}
                    javaScriptEnabled={true}
                    ref={animSvgRef}
                />
            </View>

            <Animated.View
                style={{
                    marginTop: bikeSelectorListPositionY
                        ? bikeSelectorListPositionY
                        : headHeight + getVerticalPx(30),
                }}>
                <BikeSelectorList
                    list={bikes}
                    callback={onChangeBikeHandler}
                    currentBike={bike?.description?.serial_number}
                    buttonText={'add'}
                />
            </Animated.View>


            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={
                            endRute
                                ? trans.btnCancel
                                : pause
                                    ? trans.btnPauzaOff
                                    : trans.btnPauza
                        }
                        onpress={() => handleCancelOrPause()}
                    />
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.btnEnd}
                        onpress={() => handleEnd()}
                    />
                </View>
            </View>

            <StackHeader
                onpress={() => navigation.goBack()}
                getHeight={setHeadHeight}
                inner={pause ? trans.headerPause : trans.headerRecord}
                pause={pause}
            />
        </SafeAreaView>
    );
};

export default Counter;
