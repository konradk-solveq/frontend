import {RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const getScreenName = async (
    navigationRef?: RefObject<NavigationContainerRef>,
) => {
    let currentRouteName;
    if (navigationRef?.current) {
        const routeName = navigationRef.current.getCurrentRoute()?.name;
        if (routeName) {
            currentRouteName = routeName;
        }
    }

    return currentRouteName;
};