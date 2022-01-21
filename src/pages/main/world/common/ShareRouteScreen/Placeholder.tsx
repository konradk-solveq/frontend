import React, {useEffect, useMemo} from 'react';
import {Animated, View, StyleSheet, Easing, Dimensions} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import colors from '@theme/colors';

const {width} = Dimensions.get('window');

interface PlaceholderPropsI {
    showPlaceholder: boolean;
    layout: {
        width: number;
        height: number;
    };
    children: JSX.Element;
    backgroundColor?: string;
    highlightColor?: string;
    speed?: number;
    direction?: 'left' | 'right';
    testID?: string;
}

const Placeholder = ({
    showPlaceholder,
    layout,
    children,
    backgroundColor = colors.lightGrey,
    speed = 1200,
    highlightColor = colors.grey,
    direction = 'right',
    testID = "share-route-placeholder",
}: PlaceholderPropsI) => {
    const animatedValue = useMemo(() => new Animated.Value(0), []);
    const translateX = useMemo(
        () =>
            animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange:
                    direction === 'right' ? [-width, width] : [width, -width],
            }),
        [animatedValue, direction],
    );

    useEffect(() => {
        if (speed > 0) {
            const infiniteLoop = Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: speed,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            );
            if (layout?.width && layout?.height) {
                infiniteLoop.start();
            }
            return () => {
                infiniteLoop.stop();
            };
        }
    }, [animatedValue, speed, layout?.width, layout?.height]);

    const absoluteTranslateXStyle = React.useMemo(
        () => ({...StyleSheet.absoluteFillObject, transform: [{translateX}]}),
        [translateX],
    );

    return showPlaceholder ? (
        <MaskedView
            testID={testID}
            style={{
                height: layout.height,
                width: layout.width,
            }}
            maskElement={
                <View style={styles.childrenWrapper}>{children}</View>
            }>
            <>
                <View style={[styles.expander, {backgroundColor}]} />
                {speed > 0 && (
                    <Animated.View style={absoluteTranslateXStyle}>
                        <MaskedView
                            style={StyleSheet.absoluteFill}
                            maskElement={
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    style={[StyleSheet.absoluteFill]}
                                    colors={[
                                        'transparent',
                                        '#000000',
                                        'transparent',
                                    ]}
                                />
                            }>
                            <View
                                style={[
                                    StyleSheet.absoluteFill,
                                    {backgroundColor: highlightColor},
                                ]}
                            />
                        </MaskedView>
                    </Animated.View>
                )}
            </>
        </MaskedView>
    ) : (
        <View>{children}</View>
    );
};

const styles = StyleSheet.create({
    childrenWrapper: {
        backgroundColor: 'transparent',
    },
    expander: {
        flexGrow: 1,
    },
});

export default Placeholder;
