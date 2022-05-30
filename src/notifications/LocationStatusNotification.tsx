import React, {useEffect, useMemo} from 'react';
import {LayoutChangeEvent, ViewStyle} from 'react-native';

import {useLocationProvider} from '@hooks/';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {GPSNotification} from '@components/notifications';

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
};

interface IProps {
    title?: string;
    showWhenLocationIsDisabled?: boolean;
    containerStyle?: ViewStyle | ViewStyle[];
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: ViewStyle;
}

const LocationStatusNotification: React.FC<IProps> = ({
    title = '',
    showWhenLocationIsDisabled = false,
    containerStyle,
    onLayout,
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

    useEffect(() => {
        if (!showNotification && !whenLocationIsDsiabled) {
            onLayout && onLayout(defaultLayoutEvent);
        }
    }, [showNotification, whenLocationIsDsiabled, onLayout]);

    return showNotification || whenLocationIsDsiabled ? (
        <GPSNotification
            title={title || t('searchSignal.title')}
            containerStyle={containerStyle}
            style={style}
            onLayout={onLayout}
        />
    ) : null;
};

export default React.memo(LocationStatusNotification);
