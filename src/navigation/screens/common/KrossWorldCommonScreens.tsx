import React from 'react';

import {Stack} from '@navigation/stack';
import {verticalAnim} from '@helpers/positioningVerical';

import FeaturedRoutesScreen from '@pages/main/world/featuredRoutes/FeaturedRoutesScreen';
import RouteDetails from '@pages/main/world/routeDetails/routeDetails';
import MapPreview from '@pages/main/world/routeDetails/mapPreview/mapPreview';
import EditDetails from '@pages/main/world/editDetails/editDetails';
import RoutesMap from '@pages/main/world/routesMap/routesMap';

const KrossWorldCommonScreens = () => {
    return (
        <>
            <Stack.Screen
                name="FeaturedRoutesScreen"
                component={FeaturedRoutesScreen}
            />
            <Stack.Screen name="RouteDetails" component={RouteDetails} />
            <Stack.Screen
                name="MapPreview"
                component={MapPreview}
                options={{gestureEnabled: false}}
            />
            <Stack.Screen
                name="EditDetails"
                component={EditDetails}
                options={{gestureEnabled: false}}
            />
            <Stack.Screen
                name="RoutesMap"
                component={RoutesMap}
                options={{
                    ...verticalAnim,
                }}
            />
        </>
    );
};

export default KrossWorldCommonScreens;
