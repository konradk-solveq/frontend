import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {IconButton, SecondaryButton} from '@components/buttons';
import {ButtonsGroup} from '@containers/World/components';
import {MYKROSS_ICON_NATIVE_SHARE_ICON} from '@src/theme/utils/getNativeShareIcon';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    onPressIcon: (e: GestureResponderEvent) => void;
    isPublished?: boolean;
    testID?: string;
}

const PrivateActionButtons: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressIcon,
    isPublished = false,
    testID = 'private-action-buttons',
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');

    return (
        <ButtonsGroup testID={testID}>
            {isPublished ? (
                <>
                    <SecondaryButton
                        onPress={onPressPrimary}
                        text={t('published.plannedPrimaryAction')}
                        icon={MYKROSS_ICON_NATIVE_SHARE_ICON}
                        style={styles.primaryButton}
                        testID={`${testID}-primary-button`}
                    />
                    <SecondaryButton
                        onPress={onPressSecondary}
                        text={t('published.plannedSecondaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_EDIT}
                        style={styles.secondaryButton}
                        testID={`${testID}-secondary-button`}
                    />
                    <IconButton
                        onPress={onPressIcon}
                        icon={MykrossIconFont.MYKROSS_ICON_MORE}
                        style={styles.iconButton}
                        testID={`${testID}-icon-button`}
                    />
                </>
            ) : (
                <>
                    <SecondaryButton
                        onPress={onPressPrimary}
                        text={t('published.plannedPrimaryAlternativeAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_NAVIGATE}
                        style={styles.alternativePrimaryButton}
                        testID={`${testID}-alternative-primary-button`}
                    />
                    <SecondaryButton
                        onPress={onPressSecondary}
                        text={t('published.plannedSecondaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_EDIT}
                        style={styles.secondaryButton}
                        testID={`${testID}-secondary-button`}
                    />
                    <IconButton
                        onPress={onPressIcon}
                        icon={MykrossIconFont.MYKROSS_ICON_MORE}
                        style={styles.iconButton}
                        testID={`${testID}-icon-button`}
                    />
                </>
            )}
        </ButtonsGroup>
    );
};

const styles = StyleSheet.create({
    primaryButton: {
        width: getFHorizontalPx(151),
        height: getFVerticalPx(48),
    },
    secondaryButton: {
        width: getFHorizontalPx(143),
        height: getFVerticalPx(48),
    },
    iconButton: {
        width: getFHorizontalPx(48),
        height: getFVerticalPx(48),
    },
    alternativePrimaryButton: {
        width: getFHorizontalPx(151),
        height: getFVerticalPx(48),
    },
});

export default PrivateActionButtons;
