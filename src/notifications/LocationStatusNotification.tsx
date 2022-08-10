import React, {useEffect, useMemo} from 'react';
import {
    LayoutChangeEvent,
    ViewStyle,
    StyleSheet,
    StyleProp,
} from 'react-native';

import {useLocationProvider} from '@hooks/';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {GPSNotification} from '@components/notifications';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import useOpenGPSSettings from '@hooks/useOpenGPSSettings';
import SettingsNotification from '@components/notifications/SettingsNotification';
import Approved from '@components/icons/Approved';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';

const defaultLayoutEvent = {
    nativeEvent: {layout: {height: 0, x: 0, y: 0, width: 0}},
    currentTarget: 0,
    target: 0,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    preventDefault: function (): void {
        throw new Error('Function not implemented.');
    },
    isDefaultPrevented: function (): boolean {
        throw new Error('Function not implemented.');
    },
    stopPropagation: function (): void {
        throw new Error('Function not implemented.');
    },
    isPropagationStopped: function (): boolean {
        throw new Error('Function not implemented.');
    },
    persist: function (): void {
        throw new Error('Function not implemented.');
    },
    timeStamp: 0,
    type: '',
    isDefault: 'default',
};

interface IProps {
    title?: string;
    showWhenLocationIsDisabled?: boolean;
    hideSearchSignal?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: StyleProp<ViewStyle>;
}

const LocationStatusNotification: React.FC<IProps> = ({
    title = '',
    showWhenLocationIsDisabled = false,
    hideSearchSignal = false,
    containerStyle,
    onLayout,
    style,
}: IProps) => {
    const {t} = useMergedTranslation('Notifications.location');

    const {
        openLocationSettings,
        isGPSEnabled,
        isGPSStatusRead,
    } = useOpenGPSSettings();

    const {
        locationEnabled,
        highDesiredAccuracy,
        initialized,
        gpsAvailable,
    } = useLocationProvider();
    /**
     * Show notification when location is disabled and user wants to see it
     */
    const whenLocationIsDsiabled = useMemo(
        () => initialized && showWhenLocationIsDisabled && !isGPSEnabled,
        [initialized, isGPSEnabled, showWhenLocationIsDisabled],
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

    useEffect(() => {
        if (!showNotification && !whenLocationIsDsiabled) {
            onLayout && onLayout(defaultLayoutEvent);
        }
    }, [showNotification, whenLocationIsDsiabled, onLayout]);

    if (showWhenLocationIsDisabled && !isGPSEnabled && isGPSStatusRead) {
        return (
            <SettingsNotification
                title={t('disabled.title')}
                subtitle={t('disabled.subtitle')}
                actionText={t('disabled.action')}
                icon={<Approved style={styles.notificationIcon} />}
                action={openLocationSettings}
                containerStyle={style}
            />
        );
    }

    return showNotification && !hideSearchSignal ? (
        <GPSNotification
            title={title || t('searchSignal.title')}
            containerStyle={[styles.locationNotification, containerStyle]}
            style={style}
            onLayout={onLayout}
        />
    ) : null;
};

export default React.memo(LocationStatusNotification);

const styles = StyleSheet.create({
    locationNotification: {
        marginHorizontal: appContainerHorizontalMargin,
        zIndex: 25,
    },
    notificationIcon: {
        marginRight: getFHorizontalPx(12),
    },
});
