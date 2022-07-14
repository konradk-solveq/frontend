import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import {
    LocationPermissionNotification,
    LocationStatusNotification,
} from '@notifications/';
import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {ViewStyle} from 'react-native';

interface IProps {
    locationNotAlwaysNotification?: boolean;
    showGPSStatus?: boolean;
    style?: ViewStyle | ViewStyle[];
}

const UnifiedLocationNotification: React.FC<IProps> = ({
    locationNotAlwaysNotification,
    showGPSStatus,
    style,
}: IProps) => {
    const {
        permissionGranted,
        permissionResult,
        permissionAlways,
    } = useCheckLocationType();
    const {t} = useMergedTranslation('Notifications.location.permissionAlways');

    /**
     * We're waiting for the permissions' status, don't return anything yet
     */
    if (!permissionResult) {
        return null;
    }

    /**
     * If there's no permission granted, show the notification informing about granting permissions
     */
    if (!permissionGranted) {
        return <LocationPermissionNotification style={style} />;
    }

    /**
     * If there's permission granted, show the notification about changing the permissions to
     * "always".
     * Controlled by the 'locationNotAlwaysNotification' parameter
     */
    if (!permissionAlways && locationNotAlwaysNotification) {
        return (
            <LocationPermissionNotification
                title={t('title')}
                subtitle={t('subtitle')}
                style={style}
            />
        );
    }

    /**
     * If there's permission granted, and there's no need to show the 'always' permission notification,
     * show the GPS status notification.
     * Controlled by the 'showGPSStatus' parameter
     */
    if (showGPSStatus) {
        return (
            <LocationStatusNotification
                showWhenLocationIsDisabled
                style={style}
            />
        );
    }

    /**
     * If there's no need to show any of the notifications, return null
     * to prevent the undefined return
     */
    return null;
};

export default UnifiedLocationNotification;
