import React, {useEffect, useRef} from 'react';
import {Animated, Image, View, ScrollView} from 'react-native';
import AnimSvg from '../../helpers/animSvg';

import {getVerticalPx} from '../../helpers/layoutFoo';
import RouteImagePlaceholder from '../images/routeListImagePlaceholder';

import gradient from './gradientSvg';
import styles from './styles';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 80;

interface IProps {
    children: React.ReactNode;
    minHeight?: number;
    maxHeight?: number;
    imgSrc?: string;
    scrollToTopPosition?: boolean;
    resetScrollPosition?: () => void;
}

const SliverTopBar: React.FC<IProps> = ({
    minHeight = HEADER_COLLAPSED_HEIGHT,
    maxHeight = HEADER_EXPANDED_HEIGHT,
    children,
    imgSrc,
    scrollToTopPosition,
    resetScrollPosition,
}: IProps) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<null | ScrollView>(null);
    const styleForEmptyImg = imgSrc ? '#ffffff' : '#f7f7f7';

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
        inputRange: [0, 30],
        outputRange: [300, 0],
    });

    const transformBorderRadiusStyle = {
        borderRadius: scale,
    };

    const onScrollToTop = () => {
        scrollRef.current?.scrollTo({
            y: getVerticalPx(HEADER_EXPANDED_HEIGHT),
            animated: true,
        });
    };

    useEffect(() => {
        if (scrollToTopPosition) {
            onScrollToTop();
            if (resetScrollPosition) {
                resetScrollPosition();
            }
        }
    }, [scrollToTopPosition, resetScrollPosition]);

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
                        {imgSrc ? (
                            <>
                                <AnimSvg
                                    style={styles.gradient}
                                    source={gradient}
                                />
                                <Image
                                    style={styles.image}
                                    source={{uri: imgSrc}}
                                    resizeMode="cover"
                                />
                            </>
                        ) : (
                            <View style={styles.placeholderWrapper}>
                                <RouteImagePlaceholder
                                    containerStyles={styles.placeholderImage}
                                />
                            </View>
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
        <>
            {renderSliverTopBar()}
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={5}
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
                        useNativeDriver: true,
                    },
                )}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={[
                    styles.scrollViewContainer,
                    {
                        marginTop: getVerticalPx(maxHeight - minHeight),
                        paddingBottom: getVerticalPx(maxHeight - minHeight),
                    },
                ]}
                style={styles.animatedScrollview}>
                {children}
            </Animated.ScrollView>
        </>
    );
};

SliverTopBar.defaultProps = {
    minHeight: HEADER_COLLAPSED_HEIGHT,
    maxHeight: HEADER_EXPANDED_HEIGHT,
};

export default SliverTopBar;
