import React, {useRef} from 'react';
import {Animated, Image, View} from 'react-native';

import {getVerticalPx} from '../../helpers/layoutFoo';

import styles from './styles';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 80;

interface IProps {
    children: React.ReactNode;
    minHeight?: number;
    maxHeight?: number;
    imgSrc?: string;
}

const SliverTopBar: React.FC<IProps> = ({
    minHeight = HEADER_COLLAPSED_HEIGHT,
    maxHeight = HEADER_EXPANDED_HEIGHT,
    children,
    imgSrc,
}: IProps) => {
    const scrollY = useRef(new Animated.Value(0)).current;
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
        height: maxHeight,
    };

    const scale = scrollY.interpolate({
        inputRange: [0, 30],
        outputRange: [300, 0],
    });

    const transformBorderRadiusStyle = {
        borderRadius: scale,
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
                        {imgSrc ? (
                            <Image
                                style={styles.image}
                                source={{uri: imgSrc}}
                                resizeMode="cover"
                            />
                        ) : null}
                        {/* TODO: replace with image from https://app.zeplin.io/project/5fbf658b936bbbb842e3c43c/screen/6036c0178dfa142fdb6662d5 */}
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
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
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
