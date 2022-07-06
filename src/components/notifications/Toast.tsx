import colors from '@src/theme/colors';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import Notification from './Notification';
import {ToastItem} from '../../providers/ToastProvider/ToastProvider';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import {isIOS} from '@src/utils/platform';

const Toast: React.FC<ToastItem> = ({
    containerStyle,
    titleStyle,
    subtitleStyle,
    testID,
    onDismissAction = () => {},
    ...restProps
}: ToastItem) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    return (
        <AnimatedPressable
            entering={FadeInDown}
            exiting={FadeOut}
            key={`${testID}-container`}
            needsOffscreenAlphaCompositing={true}
            onPress={onDismissAction}
            style={styles.animatedPressableContainer}>
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
    animatedPressableContainer: {
        paddingVertical: !isIOS ? getFVerticalPx(4) : 0,
        marginTop: isIOS ? getFVerticalPx(8) : 0,
    },
    containerStyle: {
        width: '100%',
        alignSelf: 'center',
        elevation: 1,
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
