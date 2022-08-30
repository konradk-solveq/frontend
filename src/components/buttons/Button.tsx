import React, {
    ReactNode,
    useCallback,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import colors from '@theme/colors';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFFontSize, getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

import {TextIcon} from '@components/icons/index';
import {Loader} from '@components/loader';
import {Demi18h28} from '@components/texts/texts';

const setComponentColor = (
    callback: (color: string) => void,
    primaryColor: string,
    secondaryColor?: string,
    revert?: boolean,
) => {
    if (!secondaryColor) {
        return;
    }

    callback(!revert ? secondaryColor : primaryColor);
};

export interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
    adjustsTextSizeToFit?: boolean;
    color?: string;
    highlightColor?: string;
    highlightTextColor?: string;
    highlightIconColor?: string;
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
    highlightColor,
    highlightTextColor,
    highlightIconColor,
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
    /**
     * Text color
     */
    const [tHColor, setTHColor] = useState(tColor);
    /**
     * Icon color
     */
    const [iHColor, setIHColor] = useState(iColor);

    const Icon = useCallback(
        ({iconStyle}) =>
            icon ? (
                <TextIcon
                    icon={icon}
                    iconColor={iHColor}
                    iconSize={iconSize}
                    style={iconStyle}
                    testID={`${testID}-icon`}
                />
            ) : null,
        [iHColor, icon, iconSize, testID],
    );

    const changeHighlightColor = useCallback(
        (_: GestureResponderEvent, revert?: boolean) => {
            /**
             * Set button text color
             */
            setComponentColor(setTHColor, tColor, highlightTextColor, revert);
            /**
             * Set button icon color
             */
            setComponentColor(
                setIHColor,
                iColor,
                highlightIconColor || highlightTextColor,
                revert,
            );
        },
        [highlightIconColor, highlightTextColor, iColor, tColor],
    );

    useLayoutEffect(() => {
        setTHColor(tColor);
        setIHColor(iColor);
    }, [iColor, tColor]);

    return (
        <Pressable
            onPress={onPress}
            testID={testID}
            onPressIn={changeHighlightColor}
            onPressOut={e => changeHighlightColor(e, true)}
            disabled={disabled || disableTouch}
            style={({pressed}) => [
                styles.innerContainer,
                shadowStyle,
                style,
                {
                    backgroundColor:
                        pressed && !highlightTextColor && highlightColor
                            ? highlightColor
                            : buttonColor,
                },
            ]}>
            <View
                testID={`${testID}-container`}
                style={[styles.innerContainer, containerStyle]}>
                {isFillUp && !disabled && !withLoader ? (
                    <View style={styles.fillUpContainer}>{children}</View>
                ) : null}
                {!withLoader ? (
                    <>
                        {!iconRight && <Icon iconStyle={styles.leftIcon} />}
                        <Demi18h28
                            testID={`${testID}-text`}
                            style={{color: tHColor}}
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
