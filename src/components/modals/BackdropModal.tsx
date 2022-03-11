import React, {ReactNode, useEffect} from 'react';
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
}

const BackdropModal: React.FC<IProps> = ({
    animationType = 'fade',
    transparent = true,
    containerStyle = {},
    visible,
    testID,
    children,
    ...props
}: IProps) => {
    const {top} = useSafeAreaInsets();
    const modalHeight = useSharedValue(top);

    useEffect(() => {
        if (visible) {
            modalHeight.value = top + getFVerticalPx(8);
        } else {
            modalHeight.value = screenHeight;
        }
    }, [modalHeight, visible, top]);
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
        backgroundColor: `${colors.black}BE`,
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
