import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

interface IProps {
    height?: number;
    style?: ViewStyle;
}

const HorizontalSpacer: React.FC<IProps> = ({height = 20, style}: IProps) => {
    return (
        <View
            style={[styles.container, {height: getFVerticalPx(height)}, style]}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        height: getFVerticalPx(20),
        paddingHorizontal: getFHorizontalPx(40),
        width: '100%',
    },
});

export default HorizontalSpacer;
