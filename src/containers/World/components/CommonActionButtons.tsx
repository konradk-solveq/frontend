import React, {useMemo} from 'react';
import {GestureResponderEvent} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {IconButton, PrimaryButton, SecondaryButton} from '@components/buttons';
import {ButtonsGroup} from '@containers/World/components';
import {MYKROSS_ICON_NATIVE_SHARE_ICON} from '@src/theme/utils/getNativeShareIcon';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    onPressIcon: (e: GestureResponderEvent) => void;
    isSecondaryButtonActive?: boolean;
    secondaryButtonWithLoader?: boolean;
    testID?: string;
}

const CommonActionButtons: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressIcon,
    isSecondaryButtonActive = false,
    secondaryButtonWithLoader = false,
    testID = 'common-action-buttons',
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');
    const icon = useMemo(
        () =>
            !isSecondaryButtonActive
                ? MykrossIconFont.MYKROSS_ICON_SAVE_OFF
                : MykrossIconFont.MYKROSS_ICON_SAVE_ON,
        [isSecondaryButtonActive],
    );
    const buttonText = useMemo(
        () =>
            !isSecondaryButtonActive
                ? t('published.secondaryAction')
                : t('published.secondaryActionActive'),
        [isSecondaryButtonActive, t],
    );

    return (
        <ButtonsGroup testID={testID}>
            <PrimaryButton
                onPress={onPressPrimary}
                text={t('published.primaryAction')}
                icon={MykrossIconFont.MYKROSS_ICON_NAVIGATE}
                style={{
                    width: getFHorizontalPx(151),
                    height: getFVerticalPx(48),
                }}
                testID={`${testID}-primary-button`}
            />
            <SecondaryButton
                onPress={onPressSecondary}
                text={buttonText}
                icon={icon}
                style={{
                    width: getFHorizontalPx(143),
                    height: getFVerticalPx(48),
                }}
                withLoader={secondaryButtonWithLoader}
                testID={`${testID}-secondary-button`}
            />
            <IconButton
                onPress={onPressIcon}
                icon={MYKROSS_ICON_NATIVE_SHARE_ICON}
                style={{
                    width: getFHorizontalPx(48),
                    height: getFVerticalPx(48),
                }}
                testID={`${testID}-icon-button`}
            />
        </ButtonsGroup>
    );
};

export default CommonActionButtons;
