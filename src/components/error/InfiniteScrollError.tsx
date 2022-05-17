import {Paragraph} from '@components/texts/texts';
import colors from '@theme/colors';
import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {ViewStyle, StyleSheet} from 'react-native';

interface IProps {
    style?: ViewStyle;
    color?: string;
}

const InfiniteScrollError = ({style, color = colors.red}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.maps');
    return (
        <Paragraph color={color} style={[styles.message, style]}>
            {t('infiniteScrollError')}
        </Paragraph>
    );
};

export default InfiniteScrollError;

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
    },
});
