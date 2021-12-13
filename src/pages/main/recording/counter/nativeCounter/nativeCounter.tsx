import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import I18n from 'react-native-i18n';

import {trackerMapVisibilitySelector} from '@storage/selectors/routes';
import {useAppSelector} from '@hooks/redux';
import {
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {FindMeButton} from '@sharedComponents/buttons';

import DisplayAverageSpeed from './displayAverageSpeed/displayAveragaSpeed';
import DisplayDistance from './displayDistance/displayDistance';
import DisplaySpeed from './displaySpeed/displaySpeed';
import DisplayTimer from './displayTimer/displayTimer';
import CurvedShape from './curvedShape/curvedShape';
import CrossBtn from './crossBtn';
import CompassButton from '@sharedComponents/buttons/compassBtn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '@utils/platform';

import styles from './style';

const {width, height} = Dimensions.get('window');

const ACTION_BUTTONS_TOP = mainButtonsHeight(50) + getVerticalPx(65);

const CONSTRAINER_HEIGHT_MAP_OFF = getVerticalPx(896);
const CONSTRAINER_HEIGHT_MAP_ON = ACTION_BUTTONS_TOP + getHorizontalPx(80 + 26);

const CONSTRAINER_BOTTOM_MAP_OFF = 0;
const CONSTRAINER_BOTTOM_MAP_ON = 0;
const CONSTRAINER_BOTTOM_APLA_SHOW = getHorizontalPx(100);

const CENTER_VERTICAL_POS_OF_CROSS = getVerticalPx(896 / 2);

const CROSS_BTN_BOTTOM_MAP_OFF =
    CENTER_VERTICAL_POS_OF_CROSS - getHorizontalPx(51 / 2);
const CROSS_BTN_BOTTOM_MAP_ON =
    CONSTRAINER_HEIGHT_MAP_ON + getHorizontalPx(-23);
const CROSS_BTN_BOTTOM_APLA_SHOW =
    CONSTRAINER_HEIGHT_MAP_ON + getHorizontalPx(-26);

const WRAP_HEIGHT_MAP_OFF = getVerticalPx(334);
const WRAP_HEIGHT_MAP_ON = getVerticalPx(50);

const WRAP_TOP_MAP_OFF = CENTER_VERTICAL_POS_OF_CROSS - WRAP_HEIGHT_MAP_OFF / 2;
const WRAP_TOP_MAP_ON = getHorizontalPx(36);
const WRAP_TOP_APLA_SHOW = getHorizontalPx(24);

const CELL_ROW_HEIGHT_MAP_OFF = WRAP_HEIGHT_MAP_OFF / 2;
const CELL_ROW_HEIGHT_MAP_ON = WRAP_HEIGHT_MAP_ON;

const BIG_FONT = getFontSize(57);
const SMALL_FONT = getFontSize(23);
const LABEL_FONT = getFontSize(18);

const FIND_ME_BOTTOM_MAP_ON = ACTION_BUTTONS_TOP + getHorizontalPx(140);
const FIND_ME_BOTTOM_APLA_SHOW = ACTION_BUTTONS_TOP + getHorizontalPx(240);

const LOWER_LINE_PROPORTIONS = 1.08;

const CELL_WIDTH_MAP_OFF = (width - getHorizontalPx(80)) / 2;
const CELL_WIDTH_MAP_ON =
    ((width - getHorizontalPx(80)) / 4) * LOWER_LINE_PROPORTIONS;

const CELL_ROW_LEFT_MAP_OFF = 0;
const CELL_ROW_LEFT_MAP_ON =
    ((width - getHorizontalPx(80)) / 2) * LOWER_LINE_PROPORTIONS;

const CELL_ROW_TOP_MAP_OFF = getVerticalPx(12);
const CELL_ROW_TOP_MAP_ON = getVerticalPx(-50);

const PLUG_BOTTOM_MAP_OFF = 0;
const PLUG_BOTTOM_MAP_ON = -height + CONSTRAINER_HEIGHT_MAP_ON;

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
    const trans: any = I18n.t('MainHome.counters');

    const DURATION_06 = duration * 0.6;
    const DURATION_025 = duration * 0.25;
    const DURATION_0875 = duration * 0.875;

    const resortedRef = useRef(false);

    const trackerMapVisibility = useAppSelector(trackerMapVisibilitySelector);

    const containerHeight = useRef(
        new Animated.Value(CONSTRAINER_HEIGHT_MAP_OFF),
    ).current;
    const containerBottom = useRef(new Animated.Value(0)).current;
    const wrapHeight = useRef(new Animated.Value(WRAP_HEIGHT_MAP_OFF)).current;
    const wrapTop = useRef(new Animated.Value(WRAP_TOP_MAP_OFF)).current;
    const findMeBottom = useRef(
        new Animated.Value(getHorizontalPx(FIND_ME_BOTTOM_MAP_ON)),
    ).current;
    const displayContainer = useRef(new Animated.Value(0)).current;
    const crossBtnBottom = useRef(new Animated.Value(CROSS_BTN_BOTTOM_MAP_OFF))
        .current;
    const findMeZIndex = useRef(new Animated.Value(1)).current;
    const labelOpacity = useRef(new Animated.Value(1)).current;
    const plugBottom = useRef(new Animated.Value(0)).current;

    const [headingOn, setHeadingOn] = useState(true);

    const startAnimation = (isMapHiden?: boolean) => {
        const condition = aplaShow && !isMapHiden;

        Animated.timing(containerHeight, {
            toValue: isMapHiden
                ? CONSTRAINER_HEIGHT_MAP_OFF
                : CONSTRAINER_HEIGHT_MAP_ON,
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const containerBottomValue = condition ? CONSTRAINER_BOTTOM_APLA_SHOW : (isMapHiden ? CONSTRAINER_BOTTOM_MAP_OFF : CONSTRAINER_BOTTOM_MAP_ON);
        Animated.timing(containerBottom, {
            toValue: containerBottomValue,
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const arrowBottomValue = isMapHiden ? CROSS_BTN_BOTTOM_MAP_OFF : (aplaShow ? CROSS_BTN_BOTTOM_APLA_SHOW : CROSS_BTN_BOTTOM_MAP_ON);
        Animated.timing(crossBtnBottom, {
            toValue: arrowBottomValue,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(wrapHeight, {
            toValue: isMapHiden ? WRAP_HEIGHT_MAP_OFF : WRAP_HEIGHT_MAP_ON,
            duration: duration,
            useNativeDriver: false,
        }).start();

        // eslint-disable-next-line prettier/prettier
        const wrapTopValue = condition ? WRAP_TOP_APLA_SHOW : (isMapHiden ? WRAP_TOP_MAP_OFF : WRAP_TOP_MAP_ON);
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
                ? FIND_ME_BOTTOM_APLA_SHOW
                : FIND_ME_BOTTOM_MAP_ON,
            duration: duration,
            useNativeDriver: false,
        }).start();

        Animated.timing(plugBottom, {
            toValue: isMapHiden ? PLUG_BOTTOM_MAP_OFF : PLUG_BOTTOM_MAP_ON,
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
        outputRange: [CELL_WIDTH_MAP_OFF, CELL_WIDTH_MAP_ON],
    });

    const cellRowLeft = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_ROW_LEFT_MAP_OFF, CELL_ROW_LEFT_MAP_ON],
    });

    const cellRowTop = displayContainer.interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_ROW_TOP_MAP_OFF, CELL_ROW_TOP_MAP_ON],
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

        if (containerH > CONSTRAINER_HEIGHT_MAP_ON + 1) {
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
                    {height: containerHeight, bottom: containerTop},
                ]}>
                <View style={styles.test} />
                <CurvedShape />

                <Animated.View
                    style={[styles.wrap, {height: wrapHeight, top: wrapTop}]}>
                    <View
                        style={[
                            styles.row,
                            {
                                height: mapHiden
                                    ? CELL_ROW_HEIGHT_MAP_OFF
                                    : CELL_ROW_HEIGHT_MAP_ON,
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
                                        {fontSize: LABEL_FONT},
                                    ]}>
                                    {trans.distance}
                                </Animated.Text>
                            </Animated.View>
                            <DisplayDistance
                                fontSize={mapHiden ? BIG_FONT : SMALL_FONT}
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
                                        {fontSize: LABEL_FONT},
                                    ]}>
                                    {trans.time}
                                </Text>
                            </Animated.View>
                            <DisplayTimer
                                time={time}
                                isRunning={isRunning}
                                fontSize={mapHiden ? BIG_FONT : SMALL_FONT}
                            />
                        </Animated.View>
                    </View>
                    <Animated.View
                        style={[
                            styles.row,
                            {
                                marginLeft: cellRowLeft,
                                height: mapHiden
                                    ? CELL_ROW_HEIGHT_MAP_OFF
                                    : CELL_ROW_HEIGHT_MAP_ON,
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
                                        {fontSize: LABEL_FONT},
                                    ]}>
                                    {trans.speed}
                                </Text>
                            </Animated.View>
                            <DisplaySpeed
                                fontSize={mapHiden ? BIG_FONT : SMALL_FONT}
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
                                        {fontSize: LABEL_FONT},
                                    ]}>
                                    {trans.averageSpeed}
                                </Text>
                            </Animated.View>
                            <DisplayAverageSpeed
                                time={time}
                                fontSize={mapHiden ? BIG_FONT : SMALL_FONT}
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
