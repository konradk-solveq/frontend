

import React from "react";
import Stack from '../../../navigation/stack';

import ProfileSettings from './profileSettings';
import ViewSettings from './profileView';

interface Props {
    navigation: any,
    route: any,
};

const Profile: React.FC<Props> = (props: Props) => {


    const verticalAnim = {
        // gestureDirection: 'vertical',
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
                initialRouteName="ViewSettings"
                mode="modal"
                screenOptions={verticalAnim}
            >

                <Stack.Screen name="ViewSettings" component={ViewSettings} />
                <Stack.Screen name="ProfileSettings" component={ProfileSettings} />

            </Stack.Navigator>
    )
}

export default Profile