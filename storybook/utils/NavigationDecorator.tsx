import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const NavigationDecorator = story => {
    const Screen = () => story();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name="MyStorybookScreen"
                    component={Screen}
                    options={{header: () => null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
