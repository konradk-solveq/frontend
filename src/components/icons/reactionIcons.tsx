import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@src/theme/colors';

const styles = StyleSheet.create({
    icon: {
        fontFamily: 'mykross',
        fontSize: getFHorizontalPx(24),
        width: getFHorizontalPx(24),
        height: getFHorizontalPx(24),
        textAlign: 'center',
        color: '#333',
    },
});

interface IProps {
    check?: boolean;
}

export const LikeIcon: FunctionComponent<IProps> = ({check}: IProps) => {
    return (
        <Text style={styles.icon}>
            {check
                ? MykrossIconFont.MYKROSS_ICON_LIKE_ON
                : MykrossIconFont.MYKROSS_ICON_LIKE_OFF}
        </Text>
    );
};

export const SaveIcon: FunctionComponent<IProps> = ({check}: IProps) => {
    return (
        <Text style={styles.icon}>
            {check
                ? MykrossIconFont.MYKROSS_ICON_SAVE_ON
                : MykrossIconFont.MYKROSS_ICON_SAVE_OFF}
        </Text>
    );
};
export const ShareIcon: FunctionComponent<IProps> = () => {
    return (
        <Text style={styles.icon}>
            {MykrossIconFont.MYKROSS_ICON_ALT_SHARE}
        </Text>
    );
};
export const MoreIcon: FunctionComponent<IProps> = () => {
    return <Text style={styles.icon}>{MykrossIconFont.MYKROSS_ICON_MORE}</Text>;
};
