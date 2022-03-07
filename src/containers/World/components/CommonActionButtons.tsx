import React from 'react';
import {GestureResponderEvent} from 'react-native';

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
}

const CommonActionButtons: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressIcon,
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');

    return (
        <ButtonsGroup>
            <PrimaryButton
                onPress={onPressPrimary}
                text={t('published.primaryAction')}
                icon={MykrossIconFont.MYKROSS_ICON_NAVIGATE}
                style={{
                    width: getFHorizontalPx(151),
                    height: getFVerticalPx(48),
                }}
            />
            <SecondaryButton
                onPress={onPressSecondary}
                text={t('published.secondaryAction')}
                icon={MykrossIconFont.MYKROSS_ICON_SAVE_OFF}
                style={{
                    width: getFHorizontalPx(143),
                    height: getFVerticalPx(48),
                }}
            />
            <IconButton
                onPress={onPressIcon}
                icon={MykrossIconFont.MYKROSS_ICON_SHARE}
                style={{
                    width: getFHorizontalPx(48),
                    height: getFVerticalPx(48),
                }}
            />
        </ButtonsGroup>
    );
};

export default CommonActionButtons;
