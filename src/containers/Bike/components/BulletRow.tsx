import React from 'react';
import {ViewStyle, StyleSheet, View} from 'react-native';
import {Paragraph} from '@components/texts/texts';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    content: string;
    bullet?: string;
    containerStyle?: ViewStyle;
    bulletStyle?: ViewStyle;
    contentStyle?: ViewStyle;
}

const BulletRow = ({
    content,
    bullet = '\u2022',
    containerStyle,
    bulletStyle,
    contentStyle,
}: IProps) => {
    return (
        <View style={[styles.row, containerStyle]}>
            <Paragraph style={[styles.bullet, bulletStyle]}>{bullet}</Paragraph>
            <Paragraph style={[styles.content, contentStyle]}>
                {content}
            </Paragraph>
        </View>
    );
};

export default BulletRow;

const styles = StyleSheet.create({
    row: {flexDirection: 'row', width: getFHorizontalPx(358)},
    bullet: {
        marginHorizontal: getFHorizontalPx(8),
    },
    content: {
        flexShrink: 1,
    },
});
