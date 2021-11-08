import React, {
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    View,
    ScrollView,
    Easing,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Platform,
} from 'react-native';
import useStatusBarHeight from '../../hooks/statusBarHeight';

import {getVerticalPx} from '../../helpers/layoutFoo';
import {ArrowBtn} from '../buttons';
import BikeImage from '../images/bikeImage';

import styles from './style';

const HEADER_EXPANDED_HEIGHT = 450;
const HEADER_COLLAPSED_HEIGHT = 80;
const ARROW_POS = 310;

interface IProps {
    children: React.ReactNode;
    minHeight?: number;
    maxHeight?: number;
    imgSrc?: string;
    headerElement?: ReactElement;
    hideHeader?: boolean;
}

const SliverImage: React.FC<IProps> = ({
    minHeight = HEADER_COLLAPSED_HEIGHT,
    maxHeight = HEADER_EXPANDED_HEIGHT,
    children,
    imgSrc,
    headerElement,
    hideHeader,
}: IProps) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const spinValue = useRef(new Animated.Value(0)).current;
    const arrowPos = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<null | ScrollView>(null);
    const styleForEmptyImg = imgSrc ? '#ffffff' : '#f7f7f7';
    const statusBarHeight = useStatusBarHeight();

    const [isArrowBtnOnBottom, setArrowBtnIsOnBottom] = useState(true);
    const [arrowRotate, setArrowRotate] = useState(false);

    const interpolateOnImageHeight = (outputRange: Array<number>) => {
        const headerScrollDistance = maxHeight - minHeight;
        return scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange,
            extrapolate: 'clamp',
        });
    };

    const transformBarStyle = {
        height: getVerticalPx(maxHeight),
    };

    const scale = scrollY.interpolate({
        inputRange: [0, getVerticalPx(20)],
        outputRange: [HEADER_EXPANDED_HEIGHT, 0],
    });

    const transformBorderRadiusStyle = {
        borderRadius: scale,
    };

    const moveYAxisArrow = {
        transform: [{translateY: arrowPos}],
    };

    const onScrollToPosition = (position: number) => {
        scrollRef.current?.scrollTo({
            y: position,
            animated: true,
        });
    };

    const onScrollToTopHandler = useCallback(
        (direction: number) => {
            Animated.timing(spinValue, {
                toValue: direction,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        },
        [spinValue],
    );

    const onScrollHandler = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const currOffset = event.nativeEvent.contentOffset?.y;
        const direction = currOffset > getVerticalPx(100) ? 1 : 0;
        const arrowPosVal = arrowPos?.__getValue();

        const shouldOpen =
            arrowPosVal >= getVerticalPx(-3) &&
            currOffset >= 0 &&
            currOffset < 5;
        const shouldClose =
            arrowPosVal > -getVerticalPx(ARROW_POS) &&
            currOffset > getVerticalPx(ARROW_POS);

        onScrollToTopHandler(direction);
        if (currOffset < getVerticalPx(ARROW_POS) || shouldOpen) {
            arrowPos.setValue(-currOffset);
            setArrowBtnIsOnBottom(true);
            setArrowRotate(false);
            return;
        }
        if (shouldClose) {
            arrowPos.setValue(-getVerticalPx(ARROW_POS));
            setArrowBtnIsOnBottom(false);
            setArrowRotate(true);
        }
    };

    const arrowBtnActionHandler = () => {
        setArrowBtnIsOnBottom(prev => {
            if (!prev) {
                onScrollToPosition(0);
                onScrollToTopHandler(0);
                setArrowRotate(false);
                return true;
            }
            onScrollToPosition(
                getVerticalPx(HEADER_EXPANDED_HEIGHT - 100) - statusBarHeight,
            );
            onScrollToTopHandler(1);
            setArrowRotate(true);
            return false;
        });
    };

    const renderSliverTopBar = () => {
        return (
            <Animated.View
                style={[styles.animatedContainer, transformBarStyle]}>
                <View style={styles.imageContainer}>
                    <Animated.View
                        style={[
                            styles.circleShape,
                            transformBorderRadiusStyle,
                            {backgroundColor: styleForEmptyImg},
                        ]}>
                        <View style={styles.shadowBox} />
                        {imgSrc ? (
                            <BikeImage
                                imgUrl={imgSrc}
                                containerStyles={styles.image}
                            />
                        ) : (
                            <BikeImage containerStyles={styles.image} />
                        )}
                    </Animated.View>
                </View>
                <Animated.View
                    style={[
                        styles.animatedOverlay,
                        {
                            opacity: interpolateOnImageHeight([0, 1]),
                        },
                    ]}
                />
            </Animated.View>
        );
    };

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: getVerticalPx(100 + statusBarHeight),
                },
            ]}>
            <Animated.View
                style={[
                    styles.headerElement,
                    {
                        zIndex: isArrowBtnOnBottom ? 2 : 1,
                        opacity: interpolateOnImageHeight([1, -0.4]),
                    },
                ]}>
                {headerElement}
            </Animated.View>

            {!hideHeader && renderSliverTopBar()}
            {!hideHeader && (
                <Animated.View
                    pointerEvents="box-none"
                    style={[
                        styles.arrowBtnContainer,
                        {
                            top: getVerticalPx(
                                HEADER_EXPANDED_HEIGHT -
                                    (statusBarHeight > 30 ? 60 : 65),
                            ),
                        },
                        moveYAxisArrow,
                    ]}>
                    <ArrowBtn
                        onPress={arrowBtnActionHandler}
                        rotate={arrowRotate}
                    />
                </Animated.View>
            )}

            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                scrollToOverflowEnabled
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollY,
                                },
                            },
                        },
                    ],
                    {
                        listener: onScrollHandler,
                        useNativeDriver: true,
                    },
                )}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={[
                    styles.scrollViewContainer,
                    {
                        marginTop: getVerticalPx(
                            maxHeight - minHeight - statusBarHeight - 20,
                        ),
                        paddingBottom: getVerticalPx(maxHeight - minHeight),
                    },
                ]}
                style={styles.animatedScrollview}>
                {children}
            </Animated.ScrollView>
        </View>
    );
};

SliverImage.defaultProps = {
    minHeight: HEADER_COLLAPSED_HEIGHT,
    maxHeight: HEADER_EXPANDED_HEIGHT,
};

export default SliverImage;
