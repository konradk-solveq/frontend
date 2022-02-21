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
    color?: string;
    disabledColor?: string;
    textColor?: string;
    disabledTextColor?: string;
    icon?: MykrossIconFont /* Font symbol from 'mykross' font */;
    iconSize?: number;
    disabled?: boolean;
    withLoader?: boolean;
    loaderColor?: string;
    style?: ViewStyle | ViewStyle[];
    testID?: string;
}

/* TODO: add font */
const Button: React.FC<IProps> = ({
    text,
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
    style,
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

    return (
        <Pressable onPress={onPress} testID={testID} disabled={disabled}>
            <View
                testID={`${testID}-container`}
                style={[
                    styles.container,
                    {backgroundColor: buttonColor},
                    style,
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
                            style={{color: tColor}}>
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
        borderRadius: getFHorizontalPx(16),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(51, 51, 51, 0.07)',
        shadowRadius: getFHorizontalPx(8),
        shadowOffset: {height: 0, width: getFHorizontalPx(4)},
        elevation: 5,
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
});

export default Button;
