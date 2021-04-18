import React from 'react';
import {Stack} from '../../navigation/stack';

import TabMenu from './tabMenu';
import BikeParams from './bike/bikeParams/bikeParams';
import WarrantyDetails from './bike/warrantyDetails/warrantyDetails';
import Regulations from '../../pages/onboarding/permitsDeclarations/regulations';
import PrivacyPolicy from '../../pages/onboarding/permitsDeclarations/privacyPolicy';
import Contact from '../main/profile/contact/contact';

interface Props {
    navigation: any;
    route: any;
}

const MineMenu: React.FC<Props> = (props: Props) => {
    const horizontalAnim = {
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({current, layouts}) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    // const verticalAnim = {
    //     gestureDirection: 'vertical',
    //     cardStyleInterpolator: ({current, layouts}) => {
    //         return {
    //             cardStyle: {
    //                 transform: [
    //                     {
    //                         translateY: current.progress.interpolate({
    //                             inputRange: [0, 1],
    //                             outputRange: [layouts.screen.height, 0],
    //                         }),
    //                     },
    //                 ],
    //             },
    //         };
    //     },
    // };

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="TabMenu"
            mode="modal"
            screenOptions={horizontalAnim}>
            <Stack.Screen name="TabMenu" component={TabMenu} />
            <Stack.Screen name="BikeParams" component={BikeParams} />
            <Stack.Screen name="WarrantyDetails" component={WarrantyDetails} />
            <Stack.Screen name="Regulations" component={Regulations} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
    );
};

export default MineMenu;
