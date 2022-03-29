import React from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';

import {getFFontSize} from '@theme/utils/appLayoutDimensions';

import {IconFont, MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

interface IProps {
    icon: MykrossIconFont | IconFont /* Font symbol from 'mykross' font */;
    iconColor?: string;
    iconSize?: number;
    style?: ViewStyle | ViewStyle[];
    testID?: string;
}

const TextIcon: React.FC<IProps> = ({
    icon,
    iconColor = colors.red,
    iconSize = 20,
    style,
    testID = 'text-icon-test-id',
}: IProps) => {
    const iSize = getFFontSize(iconSize);
    return (
        <Text
            testID={testID}
            style={[styles.icon, {color: iconColor, fontSize: iSize}, style]}>
            {icon}
        </Text>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontFamily: 'mykross',
        textAlign: 'center',
    },
});

export default TextIcon;
