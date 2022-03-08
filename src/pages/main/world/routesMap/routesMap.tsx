import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {InteractionManager} from 'react-native';
import {WebViewMessageEvent} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Point, RouteMapType} from '@models/places.model';
import {RegularStackRoute} from '@navigation/route';
import {RootStackType} from '@type/rootStack';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {jsonParse} from '@utils/transformJson';
import {getImagesThumbs} from '@utils/transformData';
import {globalLocationSelector} from '@storage/selectors/app';

import GenericScreen from '@pages/template/GenericScreen';
import {RouteMapDetailsContainer, RoutesMapContainer} from '@containers/World';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectorMapTypeEnum} from '@storage/selectors';
import {fetchMapIfNotExistsLocally} from '@storage/actions/maps';
import {useAppRoute} from '@navigation/hooks/useAppRoute';
import {BasicCoordsType} from '@type/coords';
import {selectMapDataByIDBasedOnTypeSelector} from '@storage/selectors/map';
import BottomModal from '@components/modals/BottomModal';

const RoutesMap: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const {mapID, nearestPoint} = useAppRoute<'RoutesMap'>()?.params || {};
    const globalLcation = useAppSelector(globalLocationSelector);

    const {location} = useLocationProvider();
    const [loc, setLoc] = useState<BasicCoordsType | undefined>(globalLcation);
    const [routeInfo, setRouteInfo] = useState({
        id: '',
        mapType: selectorMapTypeEnum.regular,
        routeMapType: RouteMapType.BIKE_MAP,
    });

    const [bottomSheetWithDetails, setBottomSheetWithDetails] = useState(false);

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
        if (location) {
            setLoc(location);
        }
    }, [location]);

    useEffect(() => {
        const {id, routeMapType} = routeInfo;
        if (id) {
            dispatch(fetchMapIfNotExistsLocally(id, routeMapType, true));
        }
    }, [dispatch, routeInfo]);

    const mapData = useAppSelector(
        selectMapDataByIDBasedOnTypeSelector(routeInfo.id, routeInfo.mapType),
    );
    const mapImages = getImagesThumbs(mapData?.images || []);

    const {fetchRoutesMarkers, routeMarkres} = useGetRouteMapMarkers();
    const routeMapMarkers = useMemo(
        () => ({fetchRoutesMarkers, routeMarkres}),
        [fetchRoutesMarkers, routeMarkres],
    );

    const markerToShowDetails = useMemo(
        () => routeMarkres?.find(r => r.details.id === mapID),
        [routeMarkres, mapID],
    );

    /**
     * When redirects from routes list checks
     * if marker exists.
     * If not set the position on nearest point to
     * clicked route which user has chosen to see it detials.
     */
    useEffect(() => {
        if (markerToShowDetails) {
            handleMarkerClick(
                markerToShowDetails.details.id,
                markerToShowDetails.markerTypes,
            );
            /**
             * Clear param after path has been showed.
             */
            navigation.setParams({mapID: undefined});
        } else {
            if (nearestPoint) {
                const locationToSet = {
                    latitude: nearestPoint.lat,
                    longitude: nearestPoint.lng,
                };
                /**
                 * Check if location is already set
                 * to avoid uneccessary http requests.
                 */
                if (loc !== locationToSet) {
                    /**
                     * Clear param after new location has been set.
                     */
                    navigation.setParams({nearestPoint: undefined});
                    setLoc(locationToSet);
                }
            }
        }
    }, [markerToShowDetails, navigation, loc, nearestPoint, mapID]);

    const onNavigateBack = () => {
        navigation.navigate(
            RegularStackRoute.KROSS_WORLD_SCREEN as keyof RootStackType,
            {activeTab: ''},
        );
    };

    const onWebViewMessageHandler = useCallback(
        (e: WebViewMessageEvent) => {
            const webviewMessage = e.nativeEvent?.data?.split('#$#');
            const actionType = webviewMessage?.[0];
            const contextData = webviewMessage?.[1];
            switch (actionType) {
                case 'changeRegion':
                    const newBox = jsonParse(contextData);
                    if (!newBox) {
                        return;
                    }

                    const bbox: [Point, Point] = [
                        {lat: newBox.east, lng: newBox.north},
                        {lat: newBox.west, lng: newBox.south},
                    ];

                    if (loc) {
                        routeMapMarkers.fetchRoutesMarkers(
                            {
                                bbox: bbox,
                                width: 500,
                            },
                            loc,
                        );
                    }
                    break;
                case 'clickMarker':
                    const routeDetails = jsonParse(contextData);
                    handleMarkerClick(
                        routeDetails?.id,
                        routeDetails.markerTypes,
                    );
                    break;
                case 'clickMap':
                    handleMarkerClick('', []);
                    break;
            }
        },
        [loc, routeMapMarkers],
    );

    /**
     * Show route details component only when data exists
     */
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setBottomSheetWithDetails(mapData ? true : false);
        });
    }, [mapData]);

    return (
        <GenericScreen hideBackArrow transculentStatusBar transculentBottom>
            <RoutesMapContainer
                location={loc}
                onPressClose={onNavigateBack}
                onWebViewMessage={onWebViewMessageHandler}
                routesMarkers={routeMapMarkers.routeMarkres}
                mapPath={mapData?.path}
                pathType={routeInfo.mapType}
                animateButtonsPosition={bottomSheetWithDetails}
            />
            <BottomModal show={bottomSheetWithDetails}>
                <RouteMapDetailsContainer
                    mapData={mapData}
                    mapImages={mapImages}
                />
            </BottomModal>
        </GenericScreen>
    );
};

export default RoutesMap;
