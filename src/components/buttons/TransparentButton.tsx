import React from 'react';
import {StyleSheet, GestureResponderEvent, ViewStyle} from 'react-native';

import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {Button} from '@components/buttons/index';

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

const TransparentButton: React.FC<IProps> = ({
    text,
    onPress,
    textColor = colors.black,
    icon,
    disabled = false,
    withLoader = false,
    style,
    testID = 'transparent-btn-test-id',
}: IProps) => {
    return (
        <Button
            text={text}
            onPress={onPress}
            color={'transparent'}
            icon={icon}
            disabled={disabled}
            withLoader={withLoader}
            testID={testID}
            textColor={textColor}
            disabledTextColor={colors.grey}
            loaderColor={colors.black}
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

export default TransparentButton;
