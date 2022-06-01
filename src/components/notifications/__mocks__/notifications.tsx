import {MykrossIconFont} from '@theme/enums/iconFonts';
import {NotificationListItemI} from '@components/notifications/NotificationList';

export const notifications: NotificationListItemI[] = [
    {
        key: 'key-1',
        title: 'Example Notification I',
        icon: MykrossIconFont.MYKROSS_ICON_USER,
        action: () => {},
        actionText: 'Action',
        subtitle: 'Hello!',
    },
    {
        key: 'key-2',
        title: 'Example Notification II',
        icon: MykrossIconFont.MYKROSS_ICON_EXIT,
        action: () => {},
        actionText: 'Do sth.',
    },
    {
        key: 'key-3',
        title: 'Example Notification III',
        icon: MykrossIconFont.MYKROSS_ICON_BIKE,
    },
];
