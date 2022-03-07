import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {IconButton, PrimaryButton, SecondaryButton} from '@components/buttons';
import {ButtonsGroup} from '@containers/World/components';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    onPressIcon: (e: GestureResponderEvent) => void;
    isPublished?: boolean;
}

const PrivateActionButtons: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressIcon,
    isPublished = false,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');

    return (
        <ButtonsGroup>
            {isPublished ? (
                <>
                    <SecondaryButton
                        onPress={onPressPrimary}
                        text={t('published.plannedPrimaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_SHARE}
                        style={styles.primaryButton}
                    />
                    <SecondaryButton
                        onPress={onPressSecondary}
                        text={t('published.plannedSecondaryAction')}
                        icon={MykrossIconFont.MYKROSS_ICON_EDIT}
                        style={styles.secondaryButton}
                    />
                    <IconButton
                        onPress={onPressIcon}
                        icon={MykrossIconFont.MYKROSS_ICON_MORE}
                        style={styles.iconButton}
                    />
                </>
            ) : (
                <PrimaryButton
                    onPress={onPressPrimary}
                    text={t('published.plannedPrimaryAlternativeAction')}
                    icon={MykrossIconFont.MYKROSS_ICON_NAVIGATE}
                    style={styles.alternativePrimaryButton}
                />
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
        width: '100%',
        height: getFVerticalPx(48),
    },
});

export default PrivateActionButtons;
