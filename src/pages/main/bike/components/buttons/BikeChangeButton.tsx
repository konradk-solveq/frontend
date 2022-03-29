import {Button} from '@components/buttons';
import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

interface IProps {
    text: string;
    onPress: (e: GestureResponderEvent) => void;
}

const BikeChangeButton = ({text, onPress}: IProps) => (
    <Button
        text={text}
        onPress={onPress}
        style={styles.button}
        icon={MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN}
        textColor={colors.red}
        iconColor={colors.darkGrey}
        withoutShadow
        iconRight
    />
);

export default BikeChangeButton;

const styles = StyleSheet.create({
    button: {
        width: getFHorizontalPx(189),
        height: getFVerticalPx(48),
    },
});
