import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, Animated, Platform} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';
import CrossBtn from './crossBtn';
import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';

import styles from './style';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const arrowPositionTop = getVerticalPx((isIOS ? 0 : 5) + 415);
const arrowPositionBottom = getVerticalPx(isIOS ? -60 : -65);

interface IProps {
    time: Date;
    isRunning: boolean;
    mapHiden: boolean;
    setMapHiden: Function;
}

/* TODO: add context for values */
const NativeCounter: React.FC<IProps> = ({
    time,
    isRunning,
    mapHiden,
    setMapHiden,
}: IProps) => {
    const containerHeight = useRef(new Animated.Value(height)).current;
    const displayContainer = useRef(new Animated.Value(0)).current;
    const arrowPos = useRef(new Animated.Value(arrowPositionTop)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;

    const startAnimation = (revert?: boolean) => {
        Animated.timing(containerHeight, {
            toValue: !revert ? getVerticalPx(200) : height,
            duration: 400,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayContainer, {
            toValue: !revert ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(labelOpacity, {
            toValue: !revert ? 0 : 1,
            duration: !revert ? 100 : 350,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowPos, {
            toValue: !revert ? arrowPositionBottom : arrowPositionTop,
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    const wrapHeight = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [getVerticalPx(334), getVerticalPx(100)],
    });

    const LOWER_LINE_PROPORTIOMS = 1.08;

    const cellWidth = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [
            (width - getHorizontalPx(80)) / 2,
            ((width - getHorizontalPx(80)) / 4) * LOWER_LINE_PROPORTIOMS,
        ],
    });

    const rowLeftDirection = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [
            0,
            ((width - getHorizontalPx(80)) / 2) * LOWER_LINE_PROPORTIOMS,
        ],
    });

    const rowTopPosition = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getVerticalPx(-30)],
    });

    const rowBottomPosition = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [getVerticalPx(12), getVerticalPx(-80)],
    });

    const arrowBtnActionHandler = () => {
        const containerH = containerHeight?.__getValue();

        if (containerH >= 500) {
            startAnimation();
            setMapHiden(false);
        } else {
            startAnimation(true);
            setMapHiden(true);
        }
    };

    return (
        <Animated.View style={[styles.container, {height: containerHeight}]}>
            <CurvedShape />

            <Animated.View style={[styles.wrap, {height: wrapHeight}]}>
                <View style={[styles.row]}>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowTopPosition,
                                width: cellWidth,
                                // backgroundColor: 'khaki',
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Animated.Text style={styles.label}>
                                Dystans
                            </Animated.Text>
                        </Animated.View>
                        <DisplayDistance fontSize={mapHiden ? 57 : 23} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowTopPosition,
                                width: cellWidth,
                                // backgroundColor: 'green',
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Text style={[styles.label, styles.rightLabel]}>
                                Czas
                            </Text>
                        </Animated.View>
                        <DisplayTimer
                            time={time}
                            isRunning={isRunning}
                            fontSize={mapHiden ? 57 : 23}
                        />
                    </Animated.View>
                </View>
                <Animated.View
                    style={[
                        styles.row,
                        {
                            marginLeft: rowLeftDirection,
                        },
                    ]}>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowBottomPosition,
                                width: cellWidth,
                                // backgroundColor: 'orange',
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Text style={styles.label}>Prędkość</Text>
                        </Animated.View>
                        <DisplaySpeed fontSize={mapHiden ? 57 : 23} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowBottomPosition,
                                width: cellWidth,
                                // backgroundColor: 'khaki',
                            },
                        ]}>
                        <Animated.View
                            style={[
                                styles.labelWrap,
                                styles.rightLabel,
                                {opacity: labelOpacity},
                            ]}>
                            <Text style={[styles.label]}>Średnia prędkość</Text>
                        </Animated.View>
                        <DisplayAverageSpeed
                            time={time}
                            fontSize={mapHiden ? 57 : 23}
                        />
                    </Animated.View>
                </Animated.View>
            </Animated.View>
            <Animated.View
                style={[
                    styles.arrowBtnWrap,
                    {
                        top: arrowPos,
                    },
                ]}>
                <CrossBtn onPress={arrowBtnActionHandler} down={mapHiden} />
            </Animated.View>
        </Animated.View>
    );
};

export default React.memo(NativeCounter);
