import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';

import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {IconButton} from '@src/components/buttons';
import {MYKROSS_ICON_NATIVE_SHARE_ICON} from '@src/theme/utils/getNativeShareIcon';

const LEFT_ACTION_BUTON_TEST_ID = 'left-action-button-test-id';
const RIGHT_ACTION_BUTON_TEST_ID = 'right-action-button-test-id';

interface IProps {
    onPressLeft: (e: GestureResponderEvent) => void;
    onPressRight: (e: GestureResponderEvent) => void;
}
const ActionButtons: React.FC<IProps> = ({
    onPressLeft,
    onPressRight,
}: IProps) => (
    <>
        <IconButton
            icon={MykrossIconFont.MYKROSS_ICON_EDIT}
            iconColor={colors.black}
            style={{
                ...styles.actionButton,
                marginRight: getFHorizontalPx(5),
            }}
            onPress={onPressLeft}
            testID={LEFT_ACTION_BUTON_TEST_ID}
        />
        <IconButton
            icon={MYKROSS_ICON_NATIVE_SHARE_ICON}
            iconColor={colors.black}
            style={styles.actionButton}
            onPress={onPressRight}
            testID={RIGHT_ACTION_BUTON_TEST_ID}
        />
    </>
);

const styles = StyleSheet.create({
    placeholderContainer: {
        backgroundColor: '#000000',
    },
    actionButton: {
        height: 'auto',
        width: 'auto',
        backgroundColor: 'transparent',
    },
});

export default ActionButtons;
