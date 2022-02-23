import React, {useMemo} from 'react';
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

interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
    adjustsTextSizeToFit?: boolean;
    color?: string;
    disabledColor?: string;
    textColor?: string;
    disabledTextColor?: string;
    icon?: MykrossIconFont /* Font symbol from 'mykross' font */;
    iconSize?: number;
    disabled?: boolean;
    withLoader?: boolean;
    loaderColor?: string;
    withoutShadow?: boolean;
    style?: ViewStyle | ViewStyle[];
    containerStyle?: ViewStyle | ViewStyle[];
    testID?: string;
}

/* TODO: add font */
const Button: React.FC<IProps> = ({
    text,
    adjustsTextSizeToFit = true,
    onPress,
    color = colors.white,
    disabledColor = colors.white,
    textColor = colors.black,
    disabledTextColor = colors.grey,
    icon,
    iconSize = 20,
    disabled = false,
    loaderColor,
    withLoader,
    withoutShadow = false,
    style,
    containerStyle,
    testID = 'button-test-id',
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
    const shadowStyle = useMemo(() => (!withoutShadow ? styles.shadow : {}), [
        withoutShadow,
    ]);

    return (
        <Pressable
            onPress={onPress}
            testID={testID}
            disabled={disabled}
            style={[styles.innerContainer, shadowStyle, style]}>
            <View
                testID={`${testID}-container`}
                style={[
                    styles.innerContainer,
                    {backgroundColor: buttonColor},
                    containerStyle,
                ]}>
                {!withLoader ? (
                    <>
                        {icon && (
                            <TextIcon
                                icon={icon}
                                iconColor={tColor}
                                iconSize={iconSize}
                                style={styles.icon}
                                testID={`${testID}-icon`}
                            />
                        )}
                        <Demi18h28
                            testID={`${testID}-text`}
                            style={{color: tColor}}
                            adjustsFontSizeToFit={adjustsTextSizeToFit}>
                            {text}
                        </Demi18h28>
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
    icon: {
        marginRight: getFHorizontalPx(8),
    },
    shadow: {
        shadowColor: 'rgba(51, 51, 51, 0.07)',
        shadowRadius: getFHorizontalPx(8),
        shadowOffset: {height: 0, width: getFHorizontalPx(4)},
        elevation: 5,
    },
});

export default Button;
