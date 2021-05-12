import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
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

    const [endRute, setEndRute] = useState(false);
    const [pause, setPause] = useState(null);

    const handleCancelOrPause = () => {
        if (endRute) {
            setEndRute(false);
        } else {
            if (pause) {
                let pauseTime = Date.now() - pause;
                setStartTime(startTime + pauseTime);
                timer.current = setInterval(interval, 1000);
                setPause(false);
            } else {
                clearInterval(timer.current);
                setPause(Date.now());
            }
        }
    };

    const handleEnd = () => {
        if (!endRute) {
            setEndRute(true);
        }
    };

    const [areaHeigh, setAreaHeigh] = useState(0);
    const [headHeight, setHeadHeight] = useState(0);

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
        bikeList: {
            marginTop: headHeight + getVerticalPx(30),
        },
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
    });

    return (
        <SafeAreaView style={styles.container}>
            <BikeSelectorList
                style={styles.bikeList}
                list={bikes}
                callback={onChangeBikeHandler}
                currentBike={bike?.description?.serial_number}
                buttonText={'add'}
            />

            <View style={styles.area}>
                <View style={styles.board}>
                    <AnimSvg
                        style={styles.btnMapBackground}
                        source={btnMapBackground}
                    />

                    <View style={[styles.quart, styles.horisontalLine]}>
                        <Text style={styles.name}>{trans.distance}</Text>
                        <Text style={styles.value}>
                            {pointToComa(distance)}
                            <Text style={styles.unit}>
                                {' ' + trans.distanceUnit}
                            </Text>
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.quart,
                            styles.horisontalLine,
                            styles.verticalLine,
                        ]}>
                        <Text style={styles.name}>{trans.time}</Text>
                        <Text style={styles.value}>
                            {time[0]}
                            <Text style={styles.unit}>{time[1]}</Text>
                        </Text>
                    </View>
                    <View style={styles.quart}>
                        <Text style={styles.name}>{trans.speed}</Text>
                        <Text style={styles.value}>
                            {pointToComa(speed)}
                            <Text style={styles.unit}>
                                {' ' + trans.speedUnit}
                            </Text>
                        </Text>
                    </View>
                    <View style={[styles.quart, styles.verticalLine]}>
                        <Text style={styles.name}>{trans.averageSpeed}</Text>
                        <Text style={styles.value}>
                            {pointToComa(averageSpeed)}
                            <Text style={styles.unit}>
                                {' ' + trans.averageSpeedUnit}
                            </Text>
                        </Text>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={() => { }}>
                    <Svg viewBox="0 0 15.4 15.4" style={styles.btnMap}>
                        <G transform="translate(-107.1 -21.8)">
                            <Circle
                                cx="114.8"
                                cy="29.5"
                                r="7.6"
                                fill="#ffffff"
                            />
                            <Path
                                fill="#313131"
                                fill-rule="nonzero"
                                d="M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z"
                            />
                        </G>
                    </Svg>
                </TouchableWithoutFeedback>
            </View>

            {endRute && (
                <>
                    <AnimSvg style={styles.apla} source={apla} />
                    <Text style={styles.endText}>{trans.endText}</Text>
                </>
            )}

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={endRute ? trans.btnCancel : (pause ? trans.btnPauzaOff : trans.btnPauza)}
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
