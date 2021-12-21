import React, {useEffect, useRef, useCallback, useState} from 'react';
import {Platform, StyleSheet, Animated, View, ViewStyle} from 'react-native';

import useStatusBarHeight from '@hooks/statusBarHeight';
import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

const isIOS = Platform.OS === 'ios';
const expanded = getVerticalPx(60);
const closed = 0;
const defaultDuration = 800;
const defaultHideoutTimeout = 1600;

interface IProps {
    content: string;
    onHideNotification: () => void;
    duration?: number;
    hideTimeout?: number;
    containerStyle?: ViewStyle;
    numberOfLines?: number;
}

const TopNotification: React.FC<IProps> = ({
    content,
    onHideNotification,
    duration,
    hideTimeout,
    containerStyle,
    numberOfLines,
}: IProps) => {
    const animHeightRef = useRef(new Animated.Value(0)).current;
    const animContentOpacitytRef = useRef(new Animated.Value(0)).current;

    const statusbarHeight = useStatusBarHeight();
    const expandedHeight = isIOS ? expanded + statusbarHeight / 2 : expanded;

    const [isVisible, setIsVisible] = useState(false);

    /**
     * Notification is visible when content exits.
     */
    useEffect(() => {
        if (content) {
            setIsVisible(true);
        }
    }, [content]);

    const setNotificationVisibility = useCallback(
        (visibility: boolean) => {
            Animated.timing(animHeightRef, {
                toValue: visibility ? expandedHeight : closed,
                duration: duration || defaultDuration,
                useNativeDriver: false,
            }).start();
            Animated.timing(animContentOpacitytRef, {
                toValue: visibility ? 1 : 0,
                duration: (duration || defaultDuration) / 1.5,
                useNativeDriver: false,
            }).start();
        },
        [animHeightRef, animContentOpacitytRef, duration, expandedHeight],
    );

    useEffect(() => {
        setNotificationVisibility(isVisible);

        /**
         * Auto hide notification
         */
        const hideAfter =
            (hideTimeout || defaultHideoutTimeout) +
            (duration || defaultDuration);
        const t = setTimeout(() => {
            setNotificationVisibility(false);
            setIsVisible(false);
            onHideNotification();
        }, hideAfter);

        return () => {
            clearTimeout(t);
        };
    }, [
        isVisible,
        setNotificationVisibility,
        onHideNotification,
        hideTimeout,
        duration,
    ]);

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.View
                style={[styles.animContainer, {height: animHeightRef}]}>
                <Animated.Text
                    numberOfLines={numberOfLines || 1}
                    style={[styles.content, {opacity: animContentOpacitytRef}]}>
                    {content}
                </Animated.Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
    },
    animContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: closed,
        zIndex: 1000,
        backgroundColor: '#313131',
        justifyContent: 'flex-end',
    },
    content: {
        fontFamily: 'DIN2014Narrow-Regular',
        paddingHorizontal: getHorizontalPx(20),
        paddingBottom: getVerticalPx(5),
        fontSize: getFontSize(13),
        letterSpacing: 0.4,
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default React.memo(TopNotification);
