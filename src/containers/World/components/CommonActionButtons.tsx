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
    testID?: string;
}

const CommonActionButtons: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressIcon,
    testID = 'common-action-buttons',
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details.actionButtons');

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
                text={t('published.secondaryAction')}
                icon={MykrossIconFont.MYKROSS_ICON_SAVE_OFF}
                style={{
                    width: getFHorizontalPx(143),
                    height: getFVerticalPx(48),
                }}
                testID={`${testID}-secondary-button`}
            />
            <IconButton
                onPress={onPressIcon}
                icon={MykrossIconFont.MYKROSS_ICON_SHARE}
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