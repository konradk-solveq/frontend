import React, {ReactNode, useEffect, useMemo} from 'react';
import {
    Modal,
    StyleSheet,
    ModalBaseProps,
    ViewStyle,
    StatusBar,
    Dimensions,
    View,
} from 'react-native';
import colors from '@theme/colors';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height: screenHeight} = Dimensions.get('window');

interface IProps extends ModalBaseProps {
    containerStyle?: ViewStyle | ViewStyle[];
    testID?: string;
    children?: ReactNode;
    height?: number;
}

const BackdropModal: React.FC<IProps> = ({
    animationType = 'fade',
    transparent = true,
    containerStyle = {},
    visible,
    testID,
    children,
    height,
    ...props
}: IProps) => {
    const {top} = useSafeAreaInsets();
    const marginTop = useMemo(
        () => (height ? screenHeight - height : top + getFVerticalPx(8)),
        [height, top],
    );
    const modalHeight = useSharedValue(
        height ? screenHeight - height : top + getFVerticalPx(8),
    );

    useEffect(() => {
        if (visible) {
            modalHeight.value = marginTop;
        } else {
            modalHeight.value = screenHeight;
        }
    }, [modalHeight, visible, marginTop]);
    const modalAnimation = useAnimatedStyle(() => ({
        paddingTop: withTiming(modalHeight.value, {duration: 750}),
    }));

    return (
        <>
            {visible && (
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={`${colors.black}BE`}
                    animated={true}
                />
            )}
            <Modal
                animationType={animationType}
                transparent={transparent}
                testID={testID}
                visible={visible}
                {...props}>
                <Animated.View style={[styles.backdrop, modalAnimation]}>
                    <View style={[styles.container, containerStyle]}>
                        {children}
                    </View>
                </Animated.View>
            </Modal>
        </>
    );
};

export default BackdropModal;

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: `${colors.black}7F`,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    container: {
        backgroundColor: colors.whiteGrey,
        borderTopLeftRadius: getFHorizontalPx(16),
        borderTopRightRadius: getFHorizontalPx(16),
        position: 'relative',
        flex: 1,
    },
});
