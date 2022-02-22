import React, {useMemo, useState} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Point} from '@models/places.model';
import {RegularStackRoute} from '@navigation/route';
import {RootStackType} from '@type/rootStack';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {jsonParse} from '@utils/transformJson';

import GenericScreen from '@pages/template/GenericScreen';
import {RoutesMapContainer} from '@containers/World';
import {useAppSelector} from '@hooks/redux';
import {selectorMapTypeEnum} from '@storage/selectors';
import {selectMapPathByIDBasedOnTypeSelector} from '@storage/selectors/map';

const RoutesMap: React.FC = () => {
    const navigation = useNavigation();
    const {location} = useLocationProvider();
    const [mapId, setMapId] = useState('');
    const mapPath = useAppSelector(
        selectMapPathByIDBasedOnTypeSelector(
            mapId,
            selectorMapTypeEnum.regular,
        ),
    );

    const {fetchRoutesMarkers, routeMarkres} = useGetRouteMapMarkers();
    const routeMapMarkers = useMemo(
        () => ({fetchRoutesMarkers, routeMarkres}),
        [fetchRoutesMarkers, routeMarkres],
    );

    const onNavigateBack = () => {
        navigation.navigate(
            RegularStackRoute.KROSS_WORLD_SCREEN as keyof RootStackType,
            {activeTab: ''},
        );
    };

    const onWebViewMessageHandler = (e: WebViewMessageEvent) => {
        let val = e.nativeEvent?.data?.split('#$#');

        switch (val?.[0]) {
            case 'changeRegion':
                const newBox = jsonParse(val?.[1]);
                if (!newBox) {
                    return;
                }

                const bbox: [Point, Point] = [
                    {lat: newBox.east, lng: newBox.north},
                    {lat: newBox.west, lng: newBox.south},
                ];

                if (location) {
                    routeMapMarkers.fetchRoutesMarkers(
                        {
                            bbox: bbox,
                            width: 500,
                        },
                        location,
                    );
                }
                break;
            case 'clickMarker':
                const routeDetails = jsonParse(val?.[1]);
                setMapId(routeDetails?.id);
                /* TODO: action on click marker */
                break;
            case 'clickMap':
                setMapId('');
                /* TODO: ction on click map */
                break;
        }
    };

    return (
        <GenericScreen hideBackArrow transculentStatusBar transculentBottom>
            <RoutesMapContainer
                location={location}
                onPressClose={onNavigateBack}
                onWebViewMessage={onWebViewMessageHandler}
                routesMarkers={routeMapMarkers.routeMarkres}
                mapPath={mapPath}
            />
        </GenericScreen>
    );
};

export default RoutesMap;
