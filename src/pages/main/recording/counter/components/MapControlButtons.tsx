import React, {useEffect} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    CompassButton,
    LocationButton,
} from '@pages/main/recording/counter/components/index';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {
    BOTTOM_MODAL_HEIGHT,
    BOTTOM_MODAL_HEIGHT_AFTER_START,
} from '@containers/Recording/CounterContainer';
import {LocationButtonT} from '@pages/main/recording/counter/components/LocationButton';

const BEFORE_RECORDING_NAV_BUTTONS_MARGIN_BOTTOM = BOTTOM_MODAL_HEIGHT + 16;
const DURING_RECORDING_BUTTONS_MARGIN_BOTTOM =
    BOTTOM_MODAL_HEIGHT_AFTER_START + 16;

interface IProps {
    isActive: boolean;
    mapRotated: boolean;
    onCompassButtonPressHandler: (e: GestureResponderEvent) => void;
    onPressLocationButtonHandler: (actionType: LocationButtonT) => void;
    compassHeading: number;
    locationInactive: boolean;
    inactiveMarginBottom?: number;
    activeMarginBottom?: number;
    animationDuration?: number;
}

const MapControlButtons = ({
    isActive,
    mapRotated,
    onCompassButtonPressHandler,
    onPressLocationButtonHandler,
    compassHeading,
    locationInactive,
    inactiveMarginBottom = getFVerticalPx(
        BEFORE_RECORDING_NAV_BUTTONS_MARGIN_BOTTOM,
    ),
    activeMarginBottom = getFVerticalPx(DURING_RECORDING_BUTTONS_MARGIN_BOTTOM),
    animationDuration = 1500,
}: IProps) => {
    const navigationButtonsMarginBottom = useSharedValue(inactiveMarginBottom);

    useEffect(() => {
        if (isActive) {
            navigationButtonsMarginBottom.value = withTiming(
                activeMarginBottom,
                {duration: animationDuration},
            );
        }
    }, [
        activeMarginBottom,
        animationDuration,
        isActive,
        navigationButtonsMarginBottom,
    ]);

    const animatedNavigationButtonsStyle = useAnimatedStyle(() => ({
        marginBottom: navigationButtonsMarginBottom.value,
    }));

    return (
        <View pointerEvents="box-none" style={styles.mapButtonsContainer}>
            <Animated.View style={animatedNavigationButtonsStyle}>
                {mapRotated && (
                    <CompassButton
                        onPress={onCompassButtonPressHandler}
                        compassHeading={compassHeading}
                        style={styles.compassButton}
                    />
                )}
                <LocationButton
                    onPress={onPressLocationButtonHandler}
                    inactive={locationInactive}
                />
            </Animated.View>
        </View>
    );
};

export default MapControlButtons;

const styles = StyleSheet.create({
    mapButtonsContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
        paddingHorizontal: appContainerHorizontalMargin,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    compassButton: {
        marginBottom: getFVerticalPx(16),
    },
});
