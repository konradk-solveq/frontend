import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {trackerMapVisibilitySelector} from '@storage/selectors/routes';
import {useAppSelector} from '@hooks/redux';
import {getHorizontalPx} from '@helpers/layoutFoo';
import {FindMeButton} from '@sharedComponents/buttons';

import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';
import CrossBtn from './crossBtn';
import CompassButton from '@sharedComponents/buttons/compassBtn';
import {counterPositions as cp} from '@helpers/counterPositions';

import styles from './style';

interface IProps {
    time: Date | undefined;
    isRunning: boolean;
    mapHiden: boolean;
    setMapHiden: Function;
    duration: number;
    aplaShow: boolean;
    autoFindMeSwith: (e: number) => void;
    autoFindMe: number;
    headingSwitch: (e: boolean) => void;
    compassHeading: any;
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
    autoFindMe,
    headingSwitch,
    compassHeading,
}: IProps) => {
    const {t} = useMergedTranslation('MainHome.counters');

    const DURATION_06 = duration * 0.6;
    const DURATION_025 = duration * 0.25;
    const DURATION_0875 = duration * 0.875;

    const resortedRef = useRef(false);

    const trackerMapVisibility = useAppSelector(trackerMapVisibilitySelector);

    const containerHeight = useRef(
        new Animated.Value(cp.constrainerHeight.getMapOff()),
    ).current;
    const containerBottom = useRef(new Animated.Value(0)).current;
    const wrapHeight = useRef(new Animated.Value(cp.wrapHeight.getMapOff()))
        .current;
    const wrapTop = useRef(new Animated.Value(cp.wrapTop.getMapOff())).current;
    const findMeBottom = useRef(
        new Animated.Value(getHorizontalPx(cp.findMeBottom.getMapOn())),
    ).current;
    const displayContainer = useRef(new Animated.Value(0)).current;
    const crossBtnBottom = useRef(
        new Animated.Value(cp.crossBtnBottom.getMapOff()),
    ).current;
    const findMeZIndex = useRef(new Animated.Value(1)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;
    const plugBottom = useRef(new Animated.Value(0)).current;

    const [headingOn, setHeadingOn] = useState(true);

    const startAnimation = (isMapHiden?: boolean) => {
        const condition = aplaShow && !isMapHiden;

        Animated.timing(containerHeight, {
            toValue: isMapHiden
                ? cp.constrainerHeight.getMapOff()
                : cp.constrainerHeight.getMapOn(),
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const containerBottomValue = condition ? cp.constrainerBottom.getAplaShow() : (isMapHiden ? cp.constrainerBottom.getMapOff() : cp.constrainerBottom.getMapOn());
        Animated.timing(containerBottom, {
            toValue: containerBottomValue,
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const arrowBottomValue = isMapHiden ? cp.crossBtnBottom.getMapOff() : (aplaShow ? cp.crossBtnBottom.getAplaShow() : cp.crossBtnBottom.getMapOn());
        Animated.timing(crossBtnBottom, {
            toValue: arrowBottomValue,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(wrapHeight, {
            toValue: isMapHiden
                ? cp.wrapHeight.getMapOff()
                : cp.wrapHeight.getMapOn(),
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const wrapTopValue = condition ? cp.wrapTop.getAplaShow() : (isMapHiden ? cp.wrapTop.getMapOff() : cp.wrapTop.getMapOn());
        Animated.timing(wrapTop, {
            toValue: wrapTopValue,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(labelOpacity, {
            toValue: isMapHiden ? 1 : 0,
            duration: isMapHiden ? DURATION_0875 : DURATION_025,
            useNativeDriver: false,
        }).start();

        Animated.timing(findMeZIndex, {
            toValue: isMapHiden ? 1 : 2,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(findMeBottom, {
            toValue: condition
                ? cp.findMeBottom.getAplaShow()
                : cp.findMeBottom.getMapOn(),
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(plugBottom, {
            toValue: isMapHiden
                ? cp.plugBottom.getMapOff()
                : cp.plugBottom.getMapOn(),
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(displayContainer, {
            toValue: isMapHiden ? 0 : 1,
            duration: DURATION_06,
            useNativeDriver: false,
        }).start();
    };

    const cellWidth = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [cp.cellWidth.getMapOff(), cp.cellWidth.getMapOn()],
    });

    const cellRowLeft = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [cp.cellRowLeft.getMapOff(), cp.cellRowLeft.getMapOn()],
    });

    const cellRowTop = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [cp.cellRowTop.getMapOff(), cp.cellRowTop.getMapOn()],
    });

    useEffect(() => {
        startAnimation(mapHiden);
    }, []);

    useEffect(() => {
        startAnimation(mapHiden);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aplaShow]);

    /**
     * Set previus state on app resume.
     */
    useEffect(() => {
        let t: NodeJS.Timeout;
        if (isRunning && trackerMapVisibility && !resortedRef.current) {
            t = setTimeout(() => {
                startAnimation(mapHiden);
                setMapHiden(false);
            }, 1500);

            resortedRef.current = true;
        }

        return () => {
            resortedRef.current = false;
            clearTimeout(t);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);

    const arrowBtnActionHandler = () => {
        const containerH = containerHeight?.__getValue();

        if (containerH > cp.constrainerHeight.getMapOn() + 1) {
            startAnimation();
            setMapHiden(false);
        } else {
            setMapHiden(true);
            startAnimation(true);
        }
    };

    const handleAutoFindMeSwith = () => {
        autoFindMeSwith(autoFindMe + 1);
    };

    const heandleHeadingSwitch = () => {
        headingSwitch(!headingOn);
        setHeadingOn(!headingOn);
    };

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    {height: containerHeight, bottom: containerBottom},
                ]}>
                <CurvedShape />

                <Animated.View
                    style={[styles.wrap, {height: wrapHeight, top: wrapTop}]}>
                    <View
                        style={[
                            styles.row,
                            {
                                height: mapHiden
                                    ? cp.cellRowHeight.getMapOff()
                                    : cp.cellRowHeight.getMapOn(),
                            },
                        ]}>
                        <Animated.View
                            style={[
                                styles.cell,
                                {
                                    width: cellWidth,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
                                <Animated.Text
                                    style={[
                                        styles.label,
                                        {fontSize: cp.font.getLabel()},
                                    ]}>
                                    {t('distance')}
                                </Animated.Text>
                            </Animated.View>
                            <DisplayDistance
                                fontSize={
                                    mapHiden
                                        ? cp.font.getBig()
                                        : cp.font.getSmall()
                                }
                            />
                        </Animated.View>
                        <Animated.View
                            style={[
                                styles.cell,
                                {
                                    width: cellWidth,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
                                <Text
                                    style={[
                                        styles.label,
                                        styles.rightLabel,
                                        {fontSize: cp.font.getLabel()},
                                    ]}>
                                    {t('time')}
                                </Text>
                            </Animated.View>
                            <DisplayTimer
                                time={time}
                                isRunning={isRunning}
                                fontSize={
                                    mapHiden
                                        ? cp.font.getBig()
                                        : cp.font.getSmall()
                                }
                            />
                        </Animated.View>
                    </View>
                    <Animated.View
                        style={[
                            styles.row,
                            {
                                marginLeft: cellRowLeft,
                                height: mapHiden
                                    ? cp.cellRowHeight.getMapOff()
                                    : cp.cellRowHeight.getMapOn(),
                            },
                        ]}>
                        <Animated.View
                            style={[
                                styles.cell,
                                {
                                    top: cellRowTop,
                                    width: cellWidth,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    {opacity: labelOpacity},
                                ]}>
                                <Text
                                    style={[
                                        styles.label,
                                        {fontSize: cp.font.getLabel()},
                                    ]}>
                                    {t('speed')}
                                </Text>
                            </Animated.View>
                            <DisplaySpeed
                                fontSize={
                                    mapHiden
                                        ? cp.font.getBig()
                                        : cp.font.getSmall()
                                }
                            />
                        </Animated.View>
                        <Animated.View
                            style={[
                                styles.cell,
                                {
                                    top: cellRowTop,
                                    width: cellWidth,
                                },
                            ]}>
                            <Animated.View
                                style={[
                                    styles.labelWrap,
                                    styles.rightLabel,
                                    {opacity: labelOpacity},
                                ]}>
                                <Text
                                    style={[
                                        styles.label,
                                        {fontSize: cp.font.getLabel()},
                                    ]}>
                                    {t('averageSpeed')}
                                </Text>
                            </Animated.View>
                            <DisplayAverageSpeed
                                time={time}
                                fontSize={
                                    mapHiden
                                        ? cp.font.getBig()
                                        : cp.font.getSmall()
                                }
                            />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>

            {!mapHiden && (
                <Animated.View
                    style={[
                        styles.bottomPlug,
                        {
                            bottom: plugBottom,
                        },
                    ]}
                />
            )}

            <Animated.View
                style={[
                    styles.findMeWrap,
                    {
                        bottom: findMeBottom,
                        zIndex: findMeZIndex,
                    },
                ]}>
                <CompassButton
                    onpress={heandleHeadingSwitch}
                    toggle={!headingOn}
                    compassHeading={compassHeading}
                />
                <FindMeButton
                    onpress={handleAutoFindMeSwith}
                    toggle={!autoFindMe}
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.arrowBtnWrap,
                    {
                        bottom: crossBtnBottom,
                    },
                ]}>
                <CrossBtn
                    onPress={arrowBtnActionHandler}
                    down={mapHiden}
                    duration={duration}
                />
            </Animated.View>
        </>
    );
};

export default React.memo(NativeCounter);
