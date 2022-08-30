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
    textColorHighlight?: string;
    icon?: MykrossIconFont /* Font symbol from 'mykross' font */;
    disabled?: boolean;
    withLoader?: boolean;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    testID?: string;
}

const TransparentButton: React.FC<IProps> = ({
    text,
    onPress,
    textColor = colors.black,
    textColorHighlight,
    icon,
    disabled = false,
    withLoader = false,
    style,
    containerStyle,
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
            highlightTextColor={textColorHighlight}
            disabledTextColor={colors.darkGrey}
            loaderColor={colors.black}
            style={[styles.button, style || {}]}
            containerStyle={containerStyle || {}}
            withoutShadow
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
