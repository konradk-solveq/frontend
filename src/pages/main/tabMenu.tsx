import React from 'react';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs';

import {Tab} from '@navigation/stack';
import {BOTTOM_TAB_HEIGHT} from '@theme/commonStyle';

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
import CounterThankYouPage from '@pages/main/recording/counterThankYouPage/counterThankYouPage';

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
            height: BOTTOM_TAB_HEIGHT,
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
        <Tab.Navigator
            initialRouteName="HomeTab"
            tabBarOptions={tabBarOptions}
            // hides the thank you page icon completely
            screenOptions={({route}) => ({
                tabBarButton: ['ThankYouPageTab'].includes(route.name)
                    ? () => null
                    : undefined,
            })}>
            <Tab.Screen
                name="HomeTab"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <HomeIcon isFocused={focused} />,
                }}
            />

            <Tab.Screen
                name="WorldTab"
                component={World}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <ExploreIcon isFocused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name="RecordTab"
                component={Counter}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <RecordIcon />,
                    unmountOnBlur: true,
                }}
            />

            <Tab.Screen
                name="BikeTab"
                component={Bike}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => <BikeIcon isFocused={focused} />,
                }}
            />

            <Tab.Screen
                name="ProfileTab"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({focused}) => (
                        <ProfileIcon isFocused={focused} />
                    ),
                }}
            />

            <Tab.Screen
                name={'ThankYouPageTab'}
                component={CounterThankYouPage}
                options={{
                    tabBarLabel: '',
                    tabBarVisible: false,
                    unmountOnBlur: true,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabMenu;
