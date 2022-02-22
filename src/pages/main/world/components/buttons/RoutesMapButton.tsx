import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {isIOS} from '@utils/platform';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import {SecondaryButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';

interface RouteMapBtnI {
    onPress: () => void;
    style?: ViewStyle;
}

const CustomButton = ({onPress, style}: RouteMapBtnI) => {
    const {t} = useMergedTranslation('MainWorld');
    return (
        <SecondaryButton
            text={t('BikeMap.showOnMapAction')}
            onPress={onPress}
            icon={MykrossIconFont.MYKROSS_ICON_MAP}
            style={style}
        />
    );
};

const RoutesMapButton = ({onPress, style}: RouteMapBtnI) => {
    return isIOS ? (
        <View style={style}>
            <CustomButton onPress={onPress} style={styles.btn} />
        </View>
    ) : (
        <CustomButton onPress={onPress} style={{...styles.btn, ...style}} />
    );
};

const styles = StyleSheet.create({
    btn: {
        height: getFVerticalPx(48),
        width: getFHorizontalPx(200),
    },
});

export default RoutesMapButton;
