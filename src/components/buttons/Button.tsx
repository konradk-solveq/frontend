import React, {useMemo, useCallback, ReactNode} from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import {getFFontSize, getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {TextIcon} from '@components/icons/index';
import {Loader} from '@components/loader';
import {Demi18h28} from '@components/texts/texts';

export interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
    adjustsTextSizeToFit?: boolean;
    color?: string;
    disabledColor?: string;
    textColor?: string;
    disabledTextColor?: string;
    icon?: MykrossIconFont /* Font symbol from 'mykross' font */;
    iconRight?: boolean /* Font symbol from 'mykross' font */;
    iconSize?: number;
    iconColor?: string;
    disabled?: boolean;
    /**
     * Disable onPress events
     */
    disableTouch?: boolean;
    withLoader?: boolean;
    loaderColor?: string;
    withoutShadow?: boolean;
    style?: ViewStyle | ViewStyle[];
    containerStyle?: ViewStyle | ViewStyle[];
    iconStyle?: ViewStyle | ViewStyle[];
    testID?: string;
    children?: ReactNode;
    isFillUp?: boolean;
}

/* TODO: add font */
const Button: React.FC<IProps> = ({
    text,
    adjustsTextSizeToFit = true,
    onPress,
    color = colors.white,
    disabledColor = colors.white,
    textColor = colors.black,
    iconColor,
    disabledTextColor = colors.grey,
    icon,
    iconSize = 20,
    iconRight = false,
    disabled = false,
    disableTouch = false,
    loaderColor,
    withLoader,
    withoutShadow = false,
    style,
    containerStyle,
    testID = 'button-test-id',
    children,
    isFillUp = false,
}: IProps) => {
    const buttonColor = useMemo(() => (disabled ? disabledColor : color), [
        disabled,
        disabledColor,
        color,
    ]);
    const tColor = useMemo(() => (disabled ? disabledTextColor : textColor), [
        disabled,
        textColor,
        disabledTextColor,
    ]);
    const iColor = useMemo(() => (iconColor ? iconColor : tColor), [
        iconColor,
        tColor,
    ]);
    const shadowStyle = useMemo(() => (!withoutShadow ? styles.shadow : {}), [
        withoutShadow,
    ]);

    const Icon = useCallback(
        ({iconStyle}) =>
            icon ? (
                <TextIcon
                    icon={icon}
                    iconColor={iColor}
                    iconSize={iconSize}
                    style={iconStyle}
                    testID={`${testID}-icon`}
                />
            ) : null,
        [iColor, icon, iconSize, testID],
    );

    return (
        <Pressable
            onPress={onPress}
            testID={testID}
            disabled={disabled || disableTouch}
            style={[styles.innerContainer, shadowStyle, style]}>
            <View
                testID={`${testID}-container`}
                style={[
                    styles.innerContainer,
                    {backgroundColor: buttonColor},
                    containerStyle,
                ]}>
                {isFillUp && !disabled && !withLoader ? (
                    <View style={styles.fillUpContainer}>{children}</View>
                ) : null}
                {!withLoader ? (
                    <>
                        {!iconRight && <Icon iconStyle={styles.leftIcon} />}
                        <Demi18h28
                            testID={`${testID}-text`}
                            style={{color: tColor}}
                            adjustsFontSizeToFit={adjustsTextSizeToFit}>
                            {text}
                        </Demi18h28>
                        {iconRight && <Icon iconStyle={styles.rightIcon} />}
                    </>
                ) : (
                    <Loader testID={`${testID}-loader`} color={loaderColor} />
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
    },
    fillUpContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        borderRadius: getFHorizontalPx(16),
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        borderRadius: getFHorizontalPx(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontWeight: '600',
        fontSize: getFFontSize(18),
        lineHeight: getFFontSize(24),
    },
    leftIcon: {
        marginRight: getFHorizontalPx(8),
    },
    rightIcon: {
        marginLeft: getFHorizontalPx(8),
    },
    shadow: {
        shadowColor: colors.black,
        shadowRadius: getFHorizontalPx(8),
        shadowOffset: {height: 0, width: getFHorizontalPx(4)},
        shadowOpacity: 0.07,
        elevation: 5,
    },
});

export default Button;
