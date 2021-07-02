import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Animated, Platform} from 'react-native';
import AnimSvg from '../../../../../helpers/animSvg';
import {getVerticalPx} from '../../../../../helpers/layoutFoo';
import {ArrowBtn} from '../../../../../sharedComponents/buttons';
import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import DisplayValue from './displayValue/displayValue';

import Svg, {Path, G} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

import styles from './style';

const backGround = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414 332">
<filter id="filter" x="-1" width="3" y="-1" height="3">
    <feGaussianBlur stdDeviation="38.75575"/>
</filter>
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z"
 filter="url(#filter)" fill="#aaa" />
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 810.06156 H 0 Z" fill="#fff"/>
</svg>`;

interface IProps {
    time: Date;
    isRunning: boolean;
}

/* TODO: add context for values */
const NativeCounter: React.FC<IProps> = ({time, isRunning}: IProps) => {
    const containerHeight = useRef(new Animated.Value(height)).current;
    const arrowPos = useRef(new Animated.Value(height / 2 - 50)).current;
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
            toValue: -55,
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
            toValue: height / 2 - 50,
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
                <View
                    style={{
                        width: width,
                        aspectRatio: 414 / 132,
                        position: 'absolute',
                        top: -110,
                        left: 0,
                        right: 0,
                    }}>
                    <Svg
                        height="100%"
                        width="100%"
                        viewBox={`0 0 ${414} ${132}`}>
                        <Path
                            d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 180.06156 H 0 Z" // put your path here
                            fill="white"
                            stroke="white"
                        />
                    </Svg>
                </View>
                {/* <AnimSvg style={styles.backGround} source={backGround} /> */}
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
