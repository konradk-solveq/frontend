import React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

import {getWidthPxOf} from '@helpers/layoutFoo';

import {IconButton} from '@components/buttons';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

interface Props {
    onPress: (event: GestureResponderEvent) => void;
}

const TopCrossBtn: React.FC<Props> = ({onPress}: Props) => {
    return (
        <View style={styles.buttonContainer}>
            <IconButton
                icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                onPress={onPress}
                iconColor={colors.black}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: getWidthPxOf(9),
        position: 'absolute',
        width: getWidthPxOf(40),
        height: getWidthPxOf(34),
        left: getWidthPxOf(30),
        zIndex: 20,
    },
});

export default TopCrossBtn;
