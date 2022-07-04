import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {DiscoverySvg, LocationIconSvg} from '@components/svg';

export type LocationButtonT =
    | 'follow' /* Follow user location */
    | 'center' /* Center on user location */
    | 'default'
    | 'north' /* Set to north */
    | 'heading'; /* Use phone heading */

interface IProps {
    onPress: (actionType: LocationButtonT) => void;
    inactive?: boolean;
    testID?: string;
}

const LocationButton: React.FC<IProps> = ({
    onPress,
    inactive = false,
    testID = 'location-button-test-id',
}: IProps) => {
    const [actionState, setActionState] = useState<LocationButtonT>('default');
    const showLocationIcon = useMemo(
        () => actionState === 'follow' || actionState === 'center',
        [actionState],
    );
    const locationIconColor = useMemo(
        () => (actionState === 'center' ? 'transparent' : undefined),
        [actionState],
    );

    useEffect(() => {
        if (inactive) {
            setActionState('center');
        }
    }, [inactive]);

    const onPressLocationHandler = useCallback(
        (_: GestureResponderEvent) => {
            setActionState(prev => {
                let updateState = prev;

                /**
                 * Does the action and set active state
                 */
                switch (prev) {
                    case 'default':
                        updateState = inactive ? 'center' : 'follow';
                        break;
                    case 'center':
                        updateState = 'follow';
                        break;
                    case 'follow':
                        updateState = 'default';
                        break;
                    case 'heading':
                        updateState = 'default';
                        break;
                    default:
                        updateState = 'default';
                        break;
                }

                if (updateState !== prev) {
                    onPress(prev);
                }

                return updateState;
            });
        },
        [onPress, inactive],
    );

    return (
        <Pressable onPress={onPressLocationHandler} testID={testID}>
            <View style={styles.container}>
                {showLocationIcon ? (
                    <LocationIconSvg
                        color={locationIconColor}
                        stroke={colors.red}
                        testID={`${testID}-location-icon`}
                    />
                ) : (
                    <DiscoverySvg testID={`${testID}-discovery-icon`} />
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: getFVerticalPx(48),
        height: getFVerticalPx(48),
        backgroundColor: colors.white,
        borderRadius: getFVerticalPx(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(LocationButton);
