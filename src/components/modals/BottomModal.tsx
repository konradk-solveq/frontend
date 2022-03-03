import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import Swipe from '@sharedComponents/navi/swipe/swipe';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';
import useStatusBarHeight from '@hooks/statusBarHeight';

import {HorizontalSpacer} from '@components/divider';

const {height} = Dimensions.get('window');
const containerHeight = getFVerticalPx(270);
// const containerFullHeight = getFVerticalPx(832);

interface IProps {
    show?: boolean;
    openModalHeight?: number;
    openModalFullHeight?: number;
    children?: ReactNode;
}

const BottomModal: React.FC<IProps> = ({
    show,
    openModalHeight = containerHeight,
    openModalFullHeight = height,
    children,
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

    const onSwipeFlatButton = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <Animated.View style={[styles.container, modalAnimation]}>
            <View style={styles.innerContainer}>
                <Swipe
                    direction={!isOpen ? 4 : 8}
                    onSwipeAction={onSwipeFlatButton}>
                    <View style={styles.flatButtonContainer}>
                        <View style={styles.flatButton} />
                    </View>
                </Swipe>
                <HorizontalSpacer />
                <ScrollView
                    scrollEnabled={isOpen}
                    showsVerticalScrollIndicator={false}>
                    <HorizontalSpacer />
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
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        zIndex: 10,
        borderTopEndRadius: getFHorizontalPx(16),
        borderTopStartRadius: getFHorizontalPx(16),
    },
    innerContainer: {
        width: '100%',
    },
    flatButtonContainer: {
        position: 'absolute',
        top: getFVerticalPx(0),
        left: 0,
        right: 0,
        height: getFVerticalPx(44),
        alignItems: 'center',
        zIndex: 10,
    },
    flatButton: {
        marginTop: getFVerticalPx(16),
        height: getFVerticalPx(4),
        width: getFHorizontalPx(33),
        borderRadius: getFHorizontalPx(4),
        backgroundColor: colors.greyish,
        zIndex: 10,
    },
});

export default BottomModal;
