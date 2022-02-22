import React from 'react';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';

import {Tab} from '@navigation/stack';

import Home from './home/home';
import World from './world/world';
import Bike from './bike/bike';
import Profile from './profile/profile';
import Counter from './recording/counter/counter';

import {
    HomeIcon,
    ExploreIcon,
    RecordIcon,
    BikeIcon,
    ProfileIcon,
} from '@components/icons/tabMenu';
import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import { verticalAnim } from '@src/helpers/positioningVerical';

interface Props {
    navigation: any;
    route: any;
}

/**
 * Contains screens (tabs): HOME, WORLD, BIKE, PROFILE
 */
const TabMenu: React.FC<Props> = () => {
    const tabBarOptions: BottomTabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#fff',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: getFHorizontalPx(83),
            elevation: 0,
            margin: 0,
            padding: 0,
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
    };

    return (
        <Tab.Navigator initialRouteName="HomeTab" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="HomeTab"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <HomeIcon />,
                }}
            />

            <Tab.Screen
                name="WorldTab"
                component={World}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <ExploreIcon />,
                }}
            />

            <Tab.Screen
                name="RecordTab"
                component={Counter}
                options={{
                    tabBarLabel: '',
                    tabBarVisible: false,
                    tabBarIcon: ({focused}) => (
                        <RecordIcon hideIcon={focused} />
                    ),
                    unmountOnBlur: true,
                }}
            />

            <Tab.Screen
                name="BikeTab"
                component={Bike}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <BikeIcon />,
                }}
            />

            <Tab.Screen
                name="ProfileTab"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <ProfileIcon />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabMenu;
