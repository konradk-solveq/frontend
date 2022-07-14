import React from 'react';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {NotificationDataI} from '@components/notifications/Notification';
import Approved from '@components/icons/Approved';
import {handleOpenSettings} from '@utils/system/settings';
import {MykrossIconFont, IconFont} from '@theme/enums/iconFonts';
import SettingsNotification from '@components/notifications/SettingsNotification';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';

interface IProps {
    title?: string;
    icon?: MykrossIconFont | IconFont | JSX.Element;
    subtitle?: string;
    action?: () => void;
    actionText?: string;
    style?: StyleProp<ViewStyle>;
}

const LocationPermissionNotification: React.FC<IProps> = ({
    title,
    icon,
    actionText,
    action,
    subtitle,
    style,
}: IProps) => {
    const {t} = useMergedTranslation('Notifications.location.permission');

    const notificationData: NotificationDataI = {
        title: title || t('title'),
        subtitle: subtitle || t('subtitle'),
        actionText: actionText || t('action'),
        icon: icon || <Approved style={styles.notificationIcon} />,
        action: action || handleOpenSettings,
    };
    return (
        <SettingsNotification {...notificationData} containerStyle={style} />
    );
};

export default React.memo(LocationPermissionNotification);

const styles = StyleSheet.create({
    notificationIcon: {
        marginRight: getFHorizontalPx(12),
    },
});
