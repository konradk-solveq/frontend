import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import {getFHorizontalPx, getFFontSize} from '@theme/utils/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {TextIcon} from '@components/icons';

interface IProps {
    onPress: (e: GestureResponderEvent) => void;
    icon: MykrossIconFont /* Font symbol from 'mykross' font */;
    iconColor?: string;
    iconSize?: number;
    style?: ViewStyle;
    testID?: string;
}

const IconButton: React.FC<IProps> = ({
    onPress,
    icon,
    iconColor = colors.red,
    iconSize = 24,
    style,
    testID = 'icon-btn-test-id',
}: IProps) => {
    const iSize = getFFontSize(iconSize);
    return (
        <Pressable onPress={onPress} testID={testID}>
            <View style={[styles.container, style]}>
                <TextIcon
                    icon={icon}
                    iconColor={iconColor}
                    iconSize={iSize}
                    testID={`${testID}-icon`}
                />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: getFHorizontalPx(44),
        height: getFHorizontalPx(44),
        backgroundColor: colors.white,
        borderRadius: getFHorizontalPx(16),
        justifyContent: 'center',
        alignContent: 'center',
    },
    icon: {
        fontFamily: 'mykross',
        textAlign: 'center',
    },
});

export default IconButton;
