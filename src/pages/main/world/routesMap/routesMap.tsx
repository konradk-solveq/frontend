import React, {useMemo, useState, useEffect} from 'react';
import {WebViewMessageEvent} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Point, RouteMapType} from '@models/places.model';
import {RegularStackRoute} from '@navigation/route';
import {RootStackType} from '@type/rootStack';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {jsonParse} from '@utils/transformJson';

import GenericScreen from '@pages/template/GenericScreen';
import {RoutesMapContainer} from '@containers/World';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectorMapTypeEnum} from '@storage/selectors';
import {fetchMapIfNotExistsLocally} from '@storage/actions/maps';
import {selectMapPathByIDBasedOnTypeSelector} from '@storage/selectors/map';

const RoutesMap: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const {location} = useLocationProvider();
    const [routeInfo, setRouteInfo] = useState({
        id: '',
        mapType: selectorMapTypeEnum.regular,
        routeMapType: RouteMapType.BIKE_MAP,
    });

    const handleMarkerClick = (id: string, types: string[]) => {
        const isPlanned = types.includes('FAVORITE');
        const isPrivate = types.includes('PRIVATE');
        if (isPrivate) {
            setRouteInfo({
                id,
                mapType: selectorMapTypeEnum.private,
                routeMapType: RouteMapType.MY_ROUTES,
            });
        } else if (isPlanned) {
            setRouteInfo({
                id,
                mapType: selectorMapTypeEnum.favourite,
                routeMapType: RouteMapType.PLANNING,
            });
        } else {
            setRouteInfo({
                id,
                mapType: selectorMapTypeEnum.regular,
                routeMapType: RouteMapType.BIKE_MAP,
            });
        }
    };

    useEffect(() => {
        const {id, routeMapType} = routeInfo;
        if (id) {
            dispatch(fetchMapIfNotExistsLocally(id, routeMapType, true));
        }
    }, [dispatch, routeInfo]);

    const mapPath = useAppSelector(
        selectMapPathByIDBasedOnTypeSelector(routeInfo.id, routeInfo.mapType),
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
                handleMarkerClick(routeDetails?.id, routeDetails.markerTypes);
                break;
            case 'clickMap':
                handleMarkerClick('', []);
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
