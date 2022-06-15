import colors from '@src/theme/colors';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import Notification from './Notification';
import {ToastItem} from '../../providers/ToastProvider/ToastProvider';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';

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
                titleStyle={{...styles.titleStyle, ...titleStyle}}
                subtitleStyle={{...styles.subtitleStyle, ...subtitleStyle}}
                containerStyle={{...styles.containerStyle, ...containerStyle}}
            />
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        alignSelf: 'center',
        marginTop: getFVerticalPx(8),
    },
    subtitleStyle: {
        color: colors.black,
    },
    titleStyle: {
        color: colors.black,
        marginLeft: getFVerticalPx(8),
    },
});

export default React.memo(Toast);
