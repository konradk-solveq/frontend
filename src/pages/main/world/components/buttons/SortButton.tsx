import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@src/theme/utils/appLayoutDimensions';

interface SortBtnI {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
}

const SortButton = ({onPress, style, title}: SortBtnI) => {
    return (
        <TransparentButton
            text={title}
            onPress={onPress}
            icon={MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN}
            style={style}
            containerStyle={styles.buttonContainer}
        />
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'flex-start',
    },
});

export default SortButton;
