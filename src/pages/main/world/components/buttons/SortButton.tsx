import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

interface SortBtnI {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    testID?: string;
}

const SortButton = ({
    onPress,
    style,
    title,
    testID = 'header-sort-btn',
}: SortBtnI) => {
    return (
        <TransparentButton
            text={title}
            onPress={onPress}
            icon={MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN}
            style={style}
            containerStyle={styles.buttonContainer}
            testID={testID}
        />
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'flex-start',
    },
});

export default SortButton;
