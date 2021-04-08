

import React from "react";
import { Stack } from '../../../navigation/stack';

import CyclingProfileView from './cyclingProfileView';
import CyclingProfileSettings from './cyclingProfileSettings';

interface Props {
    navigation: any,
    route: any,
};

const CyclingProfile: React.FC<Props> = (props: Props) => {


    const verticalAnim = {
        gestureDirection: 'vertical',
        cardStyleInterpolator: ({ current, layouts }) => {
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
            initialRouteName="CyclingProfileView"
            mode="modal"
            screenOptions={verticalAnim}
        >

            <Stack.Screen name="CyclingProfileView" component={CyclingProfileView} />
            <Stack.Screen name="CyclingProfileSettings" component={CyclingProfileSettings} />

        </Stack.Navigator>
    )
}

export default CyclingProfile