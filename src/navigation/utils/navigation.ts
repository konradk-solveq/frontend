import {RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

import {RootStackType} from '@type/rootStack';
import {TabStackType} from '@type/tabStack';
import {shareContentT} from '@type/navigation';

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

/**
 * Map shareType to screen name
 *
 * @param shareType
 * @returns
 */
export const getScreenNameToNavigate = (
    shareType?: shareContentT,
): keyof RootStackType | keyof TabStackType | undefined => {
    if (!shareType) {
        return;
    }

    switch (shareType) {
        case 'cyclingMap':
            return 'RouteDetails';
        default:
            return;
    }
};
