import React from 'react';
import {Stack} from '../../../navigation/stack';

import CyclingProfileView from './cyclingProfileView';
import CyclingProfileSettings from './cyclingProfileSettings';
import {CyclingProfileRoute} from '../../../navigation/route';

interface Props {
    navigation: any;
    route: any;
}

const CyclingProfile: React.FC<Props> = (props: Props) => {
    const verticalAnim = {
        gestureDirection: 'vertical',
        cardStyleInterpolator: ({current, layouts}) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateY: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.height, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={
                CyclingProfileRoute.CYCLING_PROFILE_SETTINGS_SCREEN
            }
            mode="modal"
            screenOptions={verticalAnim}>
            <Stack.Screen
                name={CyclingProfileRoute.CYCLING_PROFILE_VIEW_SCREEN}
                component={CyclingProfileView}
            />
            <Stack.Screen
                name={CyclingProfileRoute.CYCLING_PROFILE_SETTINGS_SCREEN}
                component={CyclingProfileSettings}
            />
        </Stack.Navigator>
    );
};

export default CyclingProfile;
