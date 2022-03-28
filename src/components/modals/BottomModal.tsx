import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

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
    openModalHeight?: number;
    openModalFullHeight?: number;
    children?: ReactNode;
    header?: ReactNode;
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

    const modalHeight = useSharedValue(0);

    const modalAnimation = useAnimatedStyle(() => ({
        height: withTiming(modalHeight.value, {duration: 750}),
    }));

    useEffect(() => {
        if (show && !isVisible) {
            modalHeight.value = openModalHeight;
            setIsVisible(true);
        } else if (!show && isVisible) {
            modalHeight.value = 0;
            setIsVisible(false);
        }
    }, [show, isVisible, modalHeight, openModalHeight]);

    useEffect(() => {
        if (isVisible) {
            modalHeight.value = isOpen ? openModalH : openModalHeight;
        }
    }, [isOpen, isVisible, openModalH, modalHeight, openModalHeight]);

    /**
     * Set full height of modal
     */
    useEffect(() => {
        setIsOpen(openModal);
    }, [openModal]);

    return (
        <Animated.View
            style={[styles.container, modalAnimation, style]}
            testID={testID}>
            <View style={styles.innerContainer}>
                {header}
                <ScrollView
                    scrollEnabled={isOpen || enableScroll}
                    showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </View>
        </Animated.View>
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
