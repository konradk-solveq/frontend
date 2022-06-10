import colors from '@src/theme/colors';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import Notification from './Notification';
import {ToastItem} from '../../providers/ToastProvider/ToastProvider';

const Toast: React.FC<ToastItem> = ({
    containerStyle,
    titleStyle,
    subtitleStyle,
    testID,
    key,
    onDismissAction = () => {},
    ...restProps
}: ToastItem) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    return (
        <AnimatedPressable
            entering={FadeInDown}
            exiting={FadeOut}
            key={`${testID}-container-${key}`}
            onPress={onDismissAction}>
            <Notification
                {...restProps}
                titleStyle={titleStyle || styles.titleStyle}
                subtitleStyle={subtitleStyle || styles.titleStyle}
                containerStyle={containerStyle || styles.containerStyle}
            />
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        alignSelf: 'center',
    },
    titleStyle: {
        color: colors.black,
    },
});

export default React.memo(Toast);
