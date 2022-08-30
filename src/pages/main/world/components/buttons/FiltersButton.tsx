import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TransparentButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import colors from '@src/theme/colors';

interface FilterBtnI {
    onPress: () => void;
    style?: ViewStyle;
    testID?: string;
    isFiltersActive?: boolean;
}

const FiltersButton = ({
    onPress,
    style,
    testID = 'header-filter-btn',
    isFiltersActive = false,
}: FilterBtnI) => {
    const {t} = useMergedTranslation('MainWorld');
    return (
        <>
            <TransparentButton
                text={t('btnFilters')}
                onPress={onPress}
                icon={MykrossIconFont.MYKROSS_ICON_FILTR}
                textColorHighlight={colors.darkGrey}
                style={style}
                testID={testID}
            />
            {isFiltersActive ? <View style={styles.activeDot} /> : null}
        </>
    );
};

const styles = StyleSheet.create({
    activeDot: {
        position: 'absolute',
        top: getFVerticalPx(10),
        right: -getFVerticalPx(5),
        width: getFVerticalPx(8),
        height: getFVerticalPx(8),
        backgroundColor: colors.red,
        borderRadius: getFVerticalPx(10),
    },
});

export default FiltersButton;
