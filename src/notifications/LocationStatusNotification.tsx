import React, {useMemo} from 'react';
import {ViewStyle} from 'react-native';

import {useLocationProvider} from '@hooks/';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {GPSNotification} from '@components/notifications';

interface IProps {
    title?: string;
    showWhenLocationIsDisabled?: boolean;
    containerStyle?: ViewStyle;
    style?: ViewStyle;
}

const LocationStatusNotification: React.FC<IProps> = ({
    title = '',
    showWhenLocationIsDisabled = false,
    containerStyle,
    style,
}: IProps) => {
    const {t} = useMergedTranslation('Notifications.location');

    const {
        gpsAvailable,
        locationEnabled,
        highDesiredAccuracy,
        initialized,
    } = useLocationProvider();
    /**
     * Show notification when location is disabled and user wants to see it
     */
    const whenLocationIsDsiabled = useMemo(
        () => initialized && showWhenLocationIsDisabled && !locationEnabled,
        [initialized, locationEnabled, showWhenLocationIsDisabled],
    );
    /**
     * Show notification when location service is enabled but gps is not available
     */
    const showNotification = useMemo(
        () =>
            initialized &&
            locationEnabled &&
            (!gpsAvailable || !highDesiredAccuracy),
        [initialized, gpsAvailable, highDesiredAccuracy, locationEnabled],
    );

    return showNotification || whenLocationIsDsiabled ? (
        <GPSNotification
            title={title || t('searchSignal.title')}
            containerStyle={containerStyle}
            style={style}
        />
    ) : null;
};

export default React.memo(LocationStatusNotification);
