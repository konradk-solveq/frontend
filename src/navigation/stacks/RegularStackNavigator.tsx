import React from 'react';
import { Stack } from './../stack';
import {horizontalAnim} from '../../helpers/positioning'

import ListPageInput from '../../sharedComponents/inputs/listPageInput';
import MineMenu from '../../pages/main/mainMenu';

const RegularStackNavigator: React.FC = () => {
    return(
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Onboarding"
            mode="modal"
            screenOptions={horizontalAnim}>

            <Stack.Screen name="MineMenu" component={MineMenu} />

            {/* univesal/generic pages */}
            <Stack.Screen name="ListPageInput" component={ListPageInput} />

        </Stack.Navigator>
    );
}

export default RegularStackNavigator;
