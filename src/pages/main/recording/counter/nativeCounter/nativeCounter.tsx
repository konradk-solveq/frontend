import React, {useRef, useState} from 'react';
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
    const displayContainer = useRef(new Animated.Value(0)).current;
    const arrowPos = useRef(new Animated.Value(arrowPositionTop)).current;
    const arrowDirection = useRef(new Animated.Value(1)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;

    const [down, setDown] = useState(true);

    const startAnimation = (revert?: boolean) => {
        Animated.timing(containerHeight, {
            toValue: !revert ? 200 : height,
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

    const displayContainerInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [getVerticalPx(334), 150],
    });

    const displayCellWidthInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [(width - 80) / 2, (width - 80) / 4],
    });

    const displayRowLeftDirectionInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (width - 80) / 2],
    });

    const displayRowTopDirectionInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50],
    });

    const displayCellLeftMarginInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    const displayBorderWidthInterpolation = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    const arrowBtnActionHandler = () => {
        const containerH = containerHeight?.__getValue();

        if (containerH >= 500) {
            startAnimation();
            setDown(false);
        } else {
            startAnimation(true);
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
                        {height: displayContainerInterpolation},
                    ]}>
                    <View>
                        <View style={styles.displayRow}>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    styles.displayLeftTopCell,
                                    {
                                        borderRightWidth: displayBorderWidthInterpolation,
                                        borderBottomWidth: displayBorderWidthInterpolation,
                                        width: displayCellWidthInterpolation,
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
                                        width: displayCellWidthInterpolation,
                                        marginLeft: displayCellLeftMarginInterpolation,
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
                                    marginTop: displayRowTopDirectionInterpolation,
                                    marginLeft: displayRowLeftDirectionInterpolation,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.displayCell,
                                    {width: displayCellWidthInterpolation},
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
                                        borderLeftWidth: displayBorderWidthInterpolation,
                                        borderTopWidth: displayBorderWidthInterpolation,
                                        width: displayCellWidthInterpolation,
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
                                    time={time}
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
