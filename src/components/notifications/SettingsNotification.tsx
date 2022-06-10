import React from 'react';
import {Notification} from '@components/notifications/index';
import {NotificationI} from '@components/notifications/Notification';
import {handleOpenSettings} from '@utils/system/settings';
import {StyleSheet} from 'react-native';
import colors from '@theme/colors';

const SettingsNotification: React.FC<NotificationI> = ({
    title,
    icon,
    actionText,
    action,
    subtitle,
    ...props
}: NotificationI) => {
    const notificationData: NotificationI = {
        title,
        subtitle,
        actionText,
        icon,
        action: action || handleOpenSettings,
    };
    return (
        <Notification
            {...notificationData}
            titleStyle={styles.title}
            {...props}
        />
    );
};

export default React.memo(SettingsNotification);

const styles = StyleSheet.create({
    title: {
        color: colors.black,
    },
});
