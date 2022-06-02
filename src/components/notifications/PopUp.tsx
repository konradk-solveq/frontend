import React, {ReactElement, useCallback, useEffect} from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {BodyPrimary} from '@components/texts/texts';
import {BubbleSvg} from '@components/svg';

const CONTENT_CONTAINER_WIDTH = getFHorizontalPx(243);
const CONTENT_CONTAINER_HEIGHT = getFVerticalPx(64);
const CONTAINER_BORDER_RADIUS = getFVerticalPx(12);
const ANIMATION_DURATION = 500;
const DELAY = 3000;

interface IProps {
    show?: boolean;
    text?: string;
    icon?: ReactElement;
    onPress?: (event: GestureResponderEvent) => void;
    autoHide?: boolean;
    /**
     * Auto hide time delay in milliseconds
     */
    delay?: number;
    /**
     * Animation duration in milliseconds
     */
    duration?: number;
    style?: ViewStyle;
    testID?: string;
}

const PopUp: React.FC<IProps> = ({
    show = false,
    text = '',
    icon,
    onPress,
    autoHide = false,
    delay = DELAY,
    duration = ANIMATION_DURATION,
    style,
    testID = 'popup-test-id',
}: IProps) => {
    const viewOpacity = useSharedValue(0);
    const viewAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(viewOpacity.value, {duration: duration}),
    }));

    /**
     * Show the pop up
     */
    useEffect(() => {
        if (show) {
            viewOpacity.value = 1;
        } else {
            viewOpacity.value = 0;
        }
    }, [show, viewOpacity]);

    /**
     * Auto hide the pop up after a delay
     */
    useEffect(() => {
        if (!autoHide) {
            return;
        }

        const timeout = setTimeout(() => {
            viewOpacity.value = 0;
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [autoHide, viewOpacity, delay]);

    const onPressHandler = useCallback(
        (e: GestureResponderEvent) => {
            if (onPress) {
                onPress(e);
            }
        },
        [onPress],
    );

    return (
        <Animated.View
            style={[styles.container, viewAnimation, style]}
            testID={testID}>
            <Pressable
                onPress={onPressHandler}
                disabled={!show}
                style={styles.pressableArea}
                testID={`${testID}-press`}>
                <View style={styles.background}>
                    <BubbleSvg />
                </View>
                <View style={styles.contentContainer}>
                    {icon}
                    <BodyPrimary
                        color={colors.black}
                        algin="left"
                        testID={`${testID}-text`}>
                        {text}
                    </BodyPrimary>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: CONTENT_CONTAINER_HEIGHT,
        width: CONTENT_CONTAINER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CONTAINER_BORDER_RADIUS,
        shadowColor: colors.black,
        shadowRadius: 16,
        shadowOffset: {
            height: getFVerticalPx(8),
            width: 0,
        },
        shadowOpacity: 0.12,
        elevation: CONTENT_CONTAINER_WIDTH * 0.08,
    },
    pressableArea: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        borderRadius: CONTAINER_BORDER_RADIUS,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: getFHorizontalPx(18),
        height: '100%',
        width: '100%',
        marginTop: getFVerticalPx(10),
    },
    icon: {
        marginRight: getFHorizontalPx(18),
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: CONTAINER_BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
});

export default React.memo(PopUp);
