import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Animated, Platform} from 'react-native';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {ArrowBtn} from '../../../../../sharedComponents/buttons';
import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';

import styles from './style';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const arrowPositionTop = height / 2 - getVerticalPx(isIOS ? 55 : 60);
const arrowPositionBottom = getVerticalPx(isIOS ? -60 : -65);

interface IProps {
    time: Date;
    isRunning: boolean;
}

/* TODO: add context for values */
const NativeCounter: React.FC<IProps> = ({time, isRunning}: IProps) => {
    const containerHeight = useRef(new Animated.Value(height)).current;
    const arrowPos = useRef(new Animated.Value(arrowPositionTop)).current;
    const arrowDirection = useRef(new Animated.Value(1)).current;
    const borderWidth = useRef(new Animated.Value(1)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;
    const displayCellWidth = useRef(new Animated.Value((width - 80) / 2))
        .current;
    const displayCellLeftMargin = useRef(new Animated.Value(20)).current;
    const rowLeftDirection = useRef(new Animated.Value(0)).current;
    const rowTopDirection = useRef(new Animated.Value(0)).current;

    const displayContainerHeight = useRef(
        new Animated.Value(getVerticalPx(334)),
    ).current;
    const [down, setDown] = useState(true);

    console.log(`[NativeCounter -- render - ${containerHeight?.__getValue()}]`);

    // const redirect = rowDirection.setValue({
    //     inputRange: [0, 1],
    //     outputRange: ['column', 'row'],
    // });

    const startAnimation = () => {
        Animated.timing(containerHeight, {
            toValue: 200,
            duration: 400,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayContainerHeight, {
            toValue: 150,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(labelOpacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayCellWidth, {
            toValue: (width - 80) / 4,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(rowLeftDirection, {
            toValue: (width - 80) / 2,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(rowTopDirection, {
            toValue: -50,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayCellLeftMargin, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(borderWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowPos, {
            toValue: arrowPositionBottom,
            duration: 400,
            useNativeDriver: false,
        }).start();

        // setDirection('row');
    };

    const stopAnimation = () => {
        Animated.timing(containerHeight, {
            toValue: height,
            duration: 400,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayContainerHeight, {
            toValue: getVerticalPx(334),
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(labelOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayCellWidth, {
            toValue: (width - 80) / 2,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(rowLeftDirection, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(rowTopDirection, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayCellLeftMargin, {
            toValue: 20,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(borderWidth, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowPos, {
            toValue: arrowPositionTop,
            duration: 400,
            useNativeDriver: false,
        }).start();

        // setDirection('column');
    };

    const arrowBtnActionHandler = () => {
        console.log('[onPress -- ArrowBtn]');
        const containerH = containerHeight?.__getValue();

        if (containerH >= 500) {
            startAnimation();
            setDown(false);
        } else {
            stopAnimation();
            setDown(true);
        }
    };

    return (
        <>
            <Animated.View
                style={[styles.container, {height: containerHeight}]}>
                <CurvedShape />

                <Animated.View
                    style={[
                        styles.displayContainer,
                        {height: displayContainerHeight},
                    ]}>
                    <View>
                        <View style={styles.displayRow}>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    styles.displayLeftTopCell,
                                    {
                                        borderRightWidth: borderWidth,
                                        borderBottomWidth: borderWidth,
                                        width: displayCellWidth,
                                    },
                                ]}>
                                <Animated.View
                                    style={[
                                        styles.displayLabelContainer,
                                        {opacity: labelOpacity},
                                    ]}>
                                    <Animated.Text style={styles.displayLabel}>
                                        Dystans
                                    </Animated.Text>
                                </Animated.View>
                                <DisplayDistance fontSize={down ? 57 : 23} />
                            </Animated.View>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    styles.displayRightCell,
                                    {
                                        width: displayCellWidth,
                                        marginLeft: displayCellLeftMargin,
                                    },
                                ]}>
                                <Animated.View
                                    style={[
                                        styles.displayLabelContainer,
                                        {opacity: labelOpacity},
                                    ]}>
                                    <Text style={styles.displayLabel}>
                                        Czas
                                    </Text>
                                </Animated.View>
                                <DisplayTimer
                                    time={time}
                                    isRunning={isRunning}
                                    fontSize={down ? 57 : 23}
                                />
                            </Animated.View>
                        </View>
                        <Animated.View
                            style={[
                                styles.displayRow,
                                {
                                    marginTop: rowTopDirection,
                                    marginLeft: rowLeftDirection,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    {width: displayCellWidth},
                                ]}>
                                <Animated.View
                                    style={[
                                        styles.displayLabelContainer,
                                        {opacity: labelOpacity},
                                    ]}>
                                    <Text style={styles.displayLabel}>
                                        Prędkość
                                    </Text>
                                </Animated.View>
                                <DisplaySpeed fontSize={down ? 57 : 23} />
                            </Animated.View>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    styles.displayRightBottomCell,
                                    {
                                        borderLeftWidth: borderWidth,
                                        borderTopWidth: borderWidth,
                                        width: displayCellWidth,
                                    },
                                ]}>
                                <Animated.View
                                    style={[
                                        styles.displayLabelContainer,
                                        styles.displayRightBottomLabel,
                                        {opacity: labelOpacity},
                                    ]}>
                                    <Text style={[styles.displayLabel]}>
                                        Średnia prędkość
                                    </Text>
                                </Animated.View>
                                <DisplayAverageSpeed
                                    fontSize={down ? 57 : 23}
                                />
                            </Animated.View>
                        </Animated.View>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.arrowBtnContainer,
                        {
                            top: arrowPos,
                            transform: [{scaleY: arrowDirection}],
                        },
                    ]}>
                    <ArrowBtn onPress={arrowBtnActionHandler} down={down} />
                </Animated.View>
            </Animated.View>
        </>
    );
};

export default React.memo(NativeCounter);
