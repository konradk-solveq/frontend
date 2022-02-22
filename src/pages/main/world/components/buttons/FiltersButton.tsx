import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import React from 'react';
import {ViewStyle} from 'react-native';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

interface FilterBtnI {
    onPress: () => void;
    style?: ViewStyle;
}

const FiltersButton = ({onPress, style}: FilterBtnI) => {
    const {t} = useMergedTranslation('MainWorld');
    return (
        <TransparentButton
            text={t('btnFilters')}
            onPress={onPress}
            icon={MykrossIconFont.MYKROSS_ICON_FILTR}
            style={style}
        />
    );
};

export default FiltersButton;
