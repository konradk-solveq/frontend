import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {InteractionManager} from 'react-native';
import {WebViewMessageEvent} from 'react-native-webview';

import {Point, RouteMapType} from '@models/places.model';
import {RouteDetailsActionT} from '@type/screens/routesMap';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {jsonParse} from '@utils/transformJson';
import {getImagesThumbs} from '@utils/transformData';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {globalLocationSelector} from '@storage/selectors/app';

import GenericScreen from '@pages/template/GenericScreen';
import {
    RouteMapDetailsContainer,
    RoutesMapContainer,
    RoutesMapDetailsPlaceholderContainer,
} from '@containers/World';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectorMapTypeEnum} from '@storage/selectors';
import {
    addPlannedMap,
    fetchMapIfNotExistsLocally,
    removePrivateMapMetaData,
    removePlannedMap,
} from '@storage/actions/maps';
import {useAppRoute} from '@navigation/hooks/useAppRoute';
import {BasicCoordsType} from '@type/coords';
import {selectMapDataByIDBasedOnTypeSelector} from '@storage/selectors/map';
import BottomModal from '@pages/main/world/routesMap/bottomModal/BottomModal';
import {MoreActionsModal} from '@pages/main/world/components/modals';

const initRouteInfo = {
    id: '',
    mapType: selectorMapTypeEnum.regular,
    routeMapType: RouteMapType.BIKE_MAP,
};

const RoutesMap: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const {mapID, nearestPoint} = useAppRoute<'RoutesMap'>()?.params || {};
    const globalLcation = useAppSelector(globalLocationSelector);

    const {location} = useLocationProvider();
    const [loc, setLoc] = useState<BasicCoordsType | undefined>(globalLcation);
    const [centerMapAtLocation, setCenterMapAtLocation] = useState<
        BasicCoordsType | undefined
    >();
    const [routeInfo, setRouteInfo] = useState(initRouteInfo);
    const isCreatedByUser = useMemo(
        () => routeInfo?.mapType === selectorMapTypeEnum.private,
        [routeInfo?.mapType],
    );

    const [bottomSheetWithDetails, setBottomSheetWithDetails] = useState(false);
    const [
        bottomSheetWithMoreActions,
        setBottomSheetWithMoreActions,
    ] = useState(false);

    const handleMarkerClick = (id: string, types: string[]) => {
        const isPlanned = types.includes('FAVORITE');
        const isPrivate =
            types.includes('PRIVATE') ||
            types.includes(
                'OWN',
            ); /* when route is published tag is 'OWN' type*/
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
    const mapImages = getImagesThumbs(mapData?.pictures);
    /* Route has been published */
    const isPublished = useMemo(() => mapData?.isPublic || false, [
        mapData?.isPublic,
    ]);
    const canOpenModal = useMemo(() => !!mapData, [mapData]);
    /* Route has been added to favourites */
    const isFavourited = useMemo(
        () =>
            !!mapData?.isUserFavorite ||
            routeInfo.mapType === selectorMapTypeEnum.favourite,
        [mapData?.isUserFavorite, routeInfo.mapType],
    );
    /* When adding to favrourites show loader on 'Save' button */
    const [isAddingToFavourites, setIsAddingToFavourites] = useState(false);

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
                    setCenterMapAtLocation(locationToSet);
                }
            }
        }
    }, [markerToShowDetails, navigation, loc, nearestPoint, mapID]);

    const onNavigateBack = () => {
        navigation.navigate('WorldTab');
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
     * Show route data summary whenever mapID exists.
     * When no data exists placeholder will be shown.
     */
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setBottomSheetWithDetails(routeInfo.id || mapID ? true : false);
        });
    }, [routeInfo.id, mapID]);

    const onPressHandler = useCallback(
        async (actionType: RouteDetailsActionT) => {
            const mapId = mapData?.id;
            if (!mapId) {
                setBottomSheetWithMoreActions(false);
                return;
            }

            switch (actionType) {
                case 'record':
                    setBottomSheetWithMoreActions(false);
                    navigation.navigate('Counter', {mapID: mapId});
                    break;
                case 'add_to_planned':
                    setIsAddingToFavourites(true);
                    await dispatch(addPlannedMap(mapId));
                    setIsAddingToFavourites(false);
                    break;
                case 'remove_from_planned':
                    setIsAddingToFavourites(true);
                    await dispatch(removePlannedMap(mapId));
                    setRouteInfo(prev => ({
                        ...prev,
                        mapType: selectorMapTypeEnum.regular,
                        routeMapType: RouteMapType.BIKE_MAP,
                    }));
                    setIsAddingToFavourites(false);
                    break;
                case 'share':
                    navigation.navigate('ShareRouteScreen', {
                        mapID: mapId,
                        mapType: routeInfo.mapType,
                    });
                    break;
                case 'edit':
                    navigation.navigate('EditDetails', {
                        mapID: mapId,
                        private: isCreatedByUser,
                    });
                    break;
                case 'publish':
                    navigation.navigate('EditDetails', {
                        mapID: mapId,
                        publish: true,
                        private: isCreatedByUser,
                    });
                    break;
                case 'do_more':
                    /**
                     * Shows bottom sheet with addtitional action buttons
                     */
                    setBottomSheetWithMoreActions(true);
                    break;
                case 'remove':
                    setRouteInfo(initRouteInfo);
                    dispatch(removePrivateMapMetaData(mapId));
                    break;
                default:
                    break;
            }
        },
        [dispatch, navigation, mapData?.id, routeInfo.mapType, isCreatedByUser],
    );

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
                centerMapAtLocation={centerMapAtLocation}
            />
            <BottomModal show={bottomSheetWithDetails} canOpen={canOpenModal}>
                {mapData ? (
                    <RouteMapDetailsContainer
                        mapData={mapData}
                        mapImages={mapImages}
                        onPressAction={onPressHandler}
                        isPrivate={isCreatedByUser}
                        isPublished={isPublished}
                        isFavourited={isFavourited}
                        isFetching={isAddingToFavourites}
                    />
                ) : (
                    <RoutesMapDetailsPlaceholderContainer />
                )}
            </BottomModal>

            <MoreActionsModal
                show={bottomSheetWithMoreActions}
                onPressAction={onPressHandler}
                onClose={() => setBottomSheetWithMoreActions(false)}
            />
        </GenericScreen>
    );
};

export default RoutesMap;
