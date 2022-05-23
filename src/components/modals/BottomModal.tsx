import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';
import useStatusBarHeight from '@hooks/statusBarHeight';

const {height} = Dimensions.get('window');
const containerHeight = getFVerticalPx(270);

interface IProps {
    show?: boolean;
    openModal?: boolean;
    enableScroll?: boolean;
    /**
     * Height of open modal (start point)
     */
    openModalHeight?: number;
    /**
     * Height of fully open modal (end point) - eg. height of entire screen
     */
    openModalFullHeight?: number;
    children?: ReactNode;
    header?: ReactNode;
    /**
     * It allows the user to smoothly change the height of the component when using the swipe gesture
     */
    isSwipeable?: boolean;
    /**
     * It defines if component react on swipe gesture
     */
    isReactive?: boolean;
    /**
     * The component will auto open or close with desired dimension
     */
    autoClose?: boolean;
    /**
     * Determines the point at which an auto-close starts opening the component
     */
    autoCloseTop?: number;
    /**
     * Determines the point at which an auto-close starts slosing the component
     */
    autoCloseBottom?: number;
    openDuration?: number;
    closeDuration?: number;
    style?: ViewStyle;
    testID?: string;
}

const BottomModal: React.FC<IProps> = ({
    show,
    openModal = false,
    enableScroll = false,
    openModalHeight = containerHeight,
    openModalFullHeight = height,
    children,
    header,
    isSwipeable = false,
    isReactive = false,
    autoClose = false,
    autoCloseTop,
    autoCloseBottom,
    openDuration = 750,
    closeDuration = 750,
    style,
    testID = 'bottom-modal-test-id',
}: IProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const statusBarHeight = useStatusBarHeight();
    const openModalH = useMemo(() => openModalFullHeight - statusBarHeight, [
        openModalFullHeight,
        statusBarHeight,
    ]);
    const autoCloseTopLimit = useMemo(() => autoCloseTop || 0.65 * openModalH, [
        autoCloseTop,
        openModalH,
    ]);
    const autoCloseBottomLimit = useMemo(
        () => autoCloseBottom || 0.7 * openModalH,
        [autoCloseBottom, openModalH],
    );

    const modalHeight = useSharedValue(0);
    const modalHeaderOpacity = useSharedValue(0);

    const modalAnimation = useAnimatedStyle(() => ({
        height: modalHeight.value,
    }));
    /**
     * Animate header
     */
    const modalHeaderAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(modalHeaderOpacity.value, {
            duration: modalHeaderOpacity.value ? 250 : 1000,
        }),
    }));

    useEffect(() => {
        if (show && !isVisible) {
            modalHeight.value = openModalHeight;
            modalHeaderOpacity.value = 1;
            setIsVisible(true);
        } else if (!show && isVisible) {
            modalHeight.value = 0;
            modalHeaderOpacity.value = 0;
            setIsVisible(false);
        }
    }, [show, isVisible, modalHeight, openModalHeight, modalHeaderOpacity]);

    useEffect(() => {
        if (isVisible) {
            modalHeight.value = withTiming(
                isOpen ? openModalH : openModalHeight,
                {duration: isOpen ? openDuration : closeDuration},
            );
        }
    }, [
        isOpen,
        isVisible,
        openModalH,
        modalHeight,
        openModalHeight,
        openDuration,
        closeDuration,
    ]);

    /**
     * Set full height of modal
     */
    useEffect(() => {
        setIsOpen(openModal);
    }, [openModal]);

    const panGestureEventHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        {x: number; y: number}
    >({
        onStart: (_, ctx) => {
            ctx.y = modalHeight.value;
        },
        onActive: ({translationY}, ctx) => {
            if (!isSwipeable || !isReactive) {
                return;
            }
            const currentHeight = ctx.y - translationY;
            /**
             * Doon't change dimensions if max or min height is reached
             */
            if (
                currentHeight <= openModalHeight ||
                currentHeight >= openModalH
            ) {
                return;
            } else {
                modalHeight.value = ctx.y - translationY;
            }
        },
        onEnd: ({translationY}) => {
            if (!isReactive) {
                return;
            }

            /**
             * Start opening the modal if swipe translationY is smaller than 0
             */
            if (
                (modalHeight.value >= autoCloseTopLimit ||
                    !isSwipeable ||
                    autoClose) &&
                translationY < 0
            ) {
                modalHeight.value = withTiming(openModalH, {
                    duration: openDuration,
                });
            } else if (
                /**
                 * Start closing the modal if swipe translationY is bigger or equal to 0
                 */
                (modalHeight.value <= autoCloseBottomLimit ||
                    !isSwipeable ||
                    autoClose) &&
                translationY >= 0
            ) {
                modalHeight.value = withTiming(openModalHeight, {
                    duration: closeDuration,
                });
            }
        },
    });

    return (
        <PanGestureHandler
            onGestureEvent={panGestureEventHandler}
            enabled={isReactive}>
            <Animated.View
                style={[styles.container, modalAnimation, style]}
                testID={testID}>
                <View style={styles.innerContainer}>
                    <Animated.View style={modalHeaderAnimation}>
                        {header}
                    </Animated.View>
                    <ScrollView
                        scrollEnabled={isOpen || enableScroll}
                        showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView>
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.whiteGrey,
        alignItems: 'center',
        zIndex: 10,
        borderTopEndRadius: getFHorizontalPx(16),
        borderTopStartRadius: getFHorizontalPx(16),
    },
    innerContainer: {
        width: '100%',
    },
});

export default BottomModal;
