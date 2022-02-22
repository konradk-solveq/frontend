import React from 'react';
import {GestureResponderEvent, StyleSheet, ViewStyle} from 'react-native';

import {Button} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';

interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
    textColor?: string;
    icon?: MykrossIconFont /* Font symbol from 'mykross' font */;
    disabled?: boolean;
    withLoader?: boolean;
    style?: ViewStyle;
    testID?: string;
}

const SecondaryButton: React.FC<IProps> = ({
    text,
    onPress,
    textColor = colors.red,
    icon,
    disabled = false,
    withLoader = false,
    style,
    testID = 'secondary-btn-test-id',
}: IProps) => {
    return (
        <Button
            text={text}
            onPress={onPress}
            color={colors.white}
            icon={icon}
            disabled={disabled}
            withLoader={withLoader}
            testID={testID}
            textColor={textColor}
            disabledTextColor={colors.lightRed}
            loaderColor={colors.red}
            style={[styles.button, style || {}]}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: getFHorizontalPx(294),
        height: getFHorizontalPx(48),
    },
});

export default SecondaryButton;
