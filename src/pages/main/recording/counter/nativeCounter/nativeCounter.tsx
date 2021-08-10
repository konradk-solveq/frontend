import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Animated, Platform} from 'react-native';

import {trackerMapVisibilitySelector} from '@storage/selectors/routes';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {FindMeButton} from '@sharedComponents/buttons';

import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';
import CrossBtn from './crossBtn';

import styles from './style';

const isIOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
const arrowPositionTop = getVerticalPx((isIOS ? 0 : -25) + 437);
const arrowPositionBottom = getVerticalPx((isIOS ? -10 : -25) + 654);

interface IProps {
    time: Date | undefined;
    isRunning: boolean;
    mapHiden: boolean;
    setMapHiden: Function;
    duration: number;
    aplaShow: boolean;
    autoFindMeSwith: (e: boolean) => void;
}

/* TODO: add context for values */
const NativeCounter: React.FC<IProps> = ({
    time,
    isRunning,
    mapHiden,
    setMapHiden,
    duration,
    aplaShow,
    autoFindMeSwith,
}: IProps) => {
    const FIND_ME_BTN_BOTTOM = 235;
    const resotredRef = useRef(false);

    const trackerMapVisibility = useAppSelector(trackerMapVisibilitySelector);

    const containerHeight = useRef(new Animated.Value(height)).current;
    const containerBottom = useRef(new Animated.Value(0)).current;
    const findMeBottom = useRef(
        new Animated.Value(getHorizontalPx(FIND_ME_BTN_BOTTOM)),
    ).current;
    const displayContainer = useRef(new Animated.Value(0)).current;
    const arrowPos = useRef(new Animated.Value(arrowPositionTop)).current;
    const findMeBottonZIndex = useRef(new Animated.Value(1)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;

    const [autoFindMeOn, setAutoFindMeOn] = useState(true);

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

        Animated.timing(findMeBottonZIndex, {
            toValue: !revert ? 2 : 1,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowPos, {
            toValue: !revert ? arrowPositionBottom : arrowPositionTop,
            duration: duration,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        const condition = aplaShow && !mapHiden;
        Animated.timing(containerBottom, {
            toValue: condition ? getHorizontalPx(130) : 0,
            duration: duration,
            useNativeDriver: false,
        }).start();
        Animated.timing(findMeBottom, {
            toValue: condition
                ? getHorizontalPx(130 + FIND_ME_BTN_BOTTOM)
                : getHorizontalPx(FIND_ME_BTN_BOTTOM),
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [aplaShow, containerBottom, findMeBottom, duration, mapHiden]);

    /**
     * Set previus state on app resume.
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (isRunning && trackerMapVisibility && !resotredRef.current) {
            t = setTimeout(() => {
                startAnimation();
                setMapHiden(false);
            }, 1500);

            resotredRef.current = true;
        }

        return () => {
            resotredRef.current = false;
            clearTimeout(t);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

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

    const handleAutoFindMeSwith = () => {
        autoFindMeSwith(!autoFindMeOn);
        setAutoFindMeOn(!autoFindMeOn);
    };

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {height: containerHeight, bottom: containerBottom},
                ]}>
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
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
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
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
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
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
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
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    styles.rightLabel,
                                    {opacity: labelOpacity},
                                ]}>
                                <Text style={[styles.label]}>
                                    Średnia prędkość
                                </Text>
                            </Animated.View>
                            <DisplayAverageSpeed
                                time={time}
                                fontSize={mapHiden ? 57 : 23}
                            />
                        </Animated.View>
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

            {!mapHiden && (
                <Animated.View
                    style={[
                        styles.bottomPlug,
                        {
                            height: containerBottom,
                        },
                    ]}
                />
            )}

            <Animated.View
                style={[
                    styles.findMeWrap,
                    {
                        bottom: findMeBottom,
                        zIndex: findMeBottonZIndex,
                    },
                ]}>
                <FindMeButton
                    onpress={handleAutoFindMeSwith}
                    toggle={!autoFindMeOn}
                />
            </Animated.View>
        </>
    );
};

export default React.memo(NativeCounter);
