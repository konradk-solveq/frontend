import React from 'react';
import {ViewStyle} from 'react-native';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

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
        />
    );
};

export default SortButton;
