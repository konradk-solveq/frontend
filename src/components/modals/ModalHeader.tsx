import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import colors from '@theme/colors';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFFontSize, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {IconButton} from '@components/buttons';
import {Header2} from '@components/texts/texts';

interface IProps {
    onPress: () => void;
    header?: string;
    style?: ViewStyle;
    testID?: string;
}

const ModalHeader: React.FC<IProps> = React.memo(
    ({
        onPress,
        header = '',
        style,
        testID = 'modal-header-test-id',
    }: IProps) => {
        return (
            <View style={[styles.modalHeaderContainer, style]} testID={testID}>
                <View style={styles.modalHeaderButtonContainer}>
                    <IconButton
                        icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                        iconColor={colors.black}
                        iconSize={24}
                        onPress={onPress}
                        style={styles.modalHeaderButton}
                    />
                </View>
                <Header2 algin="center" testID={`${testID}-header`}>
                    {header}
                </Header2>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    modalHeaderContainer: {
        width: '100%',
        marginBottom: getFVerticalPx(24),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeaderButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    modalHeaderButton: {
        height: getFFontSize(24),
    },
});

export default React.memo(ModalHeader);
