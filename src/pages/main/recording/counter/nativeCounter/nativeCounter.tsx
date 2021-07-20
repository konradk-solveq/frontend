import React, {useRef} from 'react';
import {View, Text, Dimensions, Animated, Platform} from 'react-native';
import {getHorizontalPx, getVerticalPx} from '../../../../../helpers/layoutFoo';
import CrossBtn from './crossBtn';
import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';

import styles from './style';
import useAppState from '../../../../../hooks/useAppState';
import {useState} from 'react';
import {useEffect} from 'react';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const arrowPositionTop = getVerticalPx((isIOS ? 0 : 5) + 415);
const arrowPositionBottom = getVerticalPx(isIOS ? -60 : -65);

interface IProps {
    time: Date;
    isRunning: boolean;
    mapHiden: boolean;
    setMapHiden: Function;
    duration: number;
}

/* TODO: add context for values */
const NativeCounter: React.FC<IProps> = ({
    time,
    isRunning,
    mapHiden,
    setMapHiden,
    duration,
}: IProps) => {
    const containerHeight = useRef(new Animated.Value(height)).current;
    const displayContainer = useRef(new Animated.Value(0)).current;
    const arrowPos = useRef(new Animated.Value(arrowPositionTop)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;

    const [reloadCounter, setStateReloadCounter] = useState('stale');

    const {appIsActive} = useAppState();

    useEffect(() => {
        if (appIsActive) {
            setStateReloadCounter('reload');
            return;
        }
        if (!appIsActive) {
            setStateReloadCounter('stale');
        }
    }, [appIsActive]);

    const startAnimation = (revert?: boolean) => {
        Animated.timing(containerHeight, {
            toValue: !revert ? getVerticalPx(200) : height,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayContainer, {
            toValue: !revert ? 1 : 0,
            duration: duration * 0.75,
            useNativeDriver: false,
        }).start();

        Animated.timing(labelOpacity, {
            toValue: !revert ? 0 : 1,
            duration: !revert ? duration * 0.25 : duration * 0.875,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowPos, {
            toValue: !revert ? arrowPositionBottom : arrowPositionTop,
            duration: duration,
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
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Animated.Text style={styles.label}>
                                Dystans
                            </Animated.Text>
                        </Animated.View>
                        <DisplayDistance
                            key={reloadCounter}
                            fontSize={mapHiden ? 57 : 23}
                        />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowTopPosition,
                                width: cellWidth,
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Text style={[styles.label, styles.rightLabel]}>
                                Czas
                            </Text>
                        </Animated.View>
                        <DisplayTimer
                            {...(!isIOS && {key: reloadCounter})}
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
                            },
                        ]}>
                        <Animated.View
                            style={[styles.labelWrap, {opacity: labelOpacity}]}>
                            <Text style={styles.label}>Prędkość</Text>
                        </Animated.View>
                        <DisplaySpeed
                            key={reloadCounter}
                            fontSize={mapHiden ? 57 : 23}
                        />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.cell,
                            {
                                top: rowBottomPosition,
                                width: cellWidth,
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
                            key={reloadCounter}
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
                <CrossBtn
                    onPress={arrowBtnActionHandler}
                    down={mapHiden}
                    duration={duration}
                />
            </Animated.View>
        </Animated.View>
    );
};

export default React.memo(NativeCounter);
