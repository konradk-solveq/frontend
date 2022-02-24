import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import colors from '@theme/colors';

interface IProps {
    color?: string;
    width?: number;
    style?: ViewStyle;
}

const HorizontalDivider = ({
    color = colors.greyish,
    width = 0.5,
    style,
}: IProps) => {
    const dividerStyle = useMemo(() => ({color, borderBottomWidth: width}), [
        color,
        width,
    ]);

    return <View style={[styles.container, dividerStyle, style]} />;
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.greyish,
        borderBottomWidth: 0.5,
        borderRadius: 1,
    },
});

export default HorizontalDivider;
