import React, {useMemo, useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebViewMessageEvent} from 'react-native-webview';
import {StackActions} from '@react-navigation/native';

import {Point, RouteMapType} from '@models/places.model';
import {RouteDetailsActionT} from '@type/screens/routesMap';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {jsonParse} from '@utils/transformJson';
import {getImagesThumbs} from '@utils/transformData';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';
import {
    globalLocationSelector,
    mapReactionsConfigSelector,
} from '@storage/selectors/app';
import {useSharedMapData} from '@hooks/useSharedMapData';

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
    modifyReaction,
} from '@storage/actions/maps';
import {useAppRoute} from '@navigation/hooks/useAppRoute';
import {BasicCoordsType} from '@type/coords';
import {selectMapDataByIDBasedOnTypeSelector} from '@storage/selectors/map';
import BottomModal from '@pages/main/world/routesMap/bottomModal/BottomModal';
import {MoreActionsModal} from '@pages/main/world/components/modals';
import {useToastContext} from '@providers/ToastProvider/ToastProvider';
import {useMergedTranslation} from '@src/utils/translations/useMergedTranslation';
import Bookmark from '@src/components/icons/Bookmark';
import NotificationList from '@components/notifications/NotificationList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UnifiedLocationNotification from '@notifications/UnifiedLocationNotification';
import {debounce} from '@utils/input/debounce';
import {mapMarkersDebounceTime} from '@utils/constants';
import RouteShareModal from '@src/containers/World/components/RouteShareModal';

const initRouteInfo = {
    id: '',
    mapType: selectorMapTypeEnum.regular,
    routeMapType: RouteMapType.BIKE_MAP,
};

/**
 * Equal to animation duration time
 */
const FETCH_DATA_DELAY = 750;

const RoutesMap: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const mapIDToNavigateRef = useRef<string>();
    const {mapID: regularMapId, nearestPoint: regularNearestPoint, shareID} =
        useAppRoute<'RoutesMap'>()?.params || {};
    /**
     * Helper for navigation back
     */
    const cameFromSharedLinkRef = useRef(false);
    const globalLocation = useAppSelector(globalLocationSelector);
    const {addToast} = useToastContext();
    const {t} = useMergedTranslation('Toasts');
    const {top} = useSafeAreaInsets();
    const config = useAppSelector(mapReactionsConfigSelector);
    const reaction = useMemo(() => config?.find(c => c.enumValue === 'like'), [
        config,
    ]);

    useEffect(() => {
        if (shareID) {
            cameFromSharedLinkRef.current = true;
        }
    }, [shareID]);

    const [centerMapAtLocation, setCenterMapAtLocation] = useState<
        BasicCoordsType | undefined
    >();
    const [routeInfo, setRouteInfo] = useState(initRouteInfo);
    const isCreatedByUser = useMemo(
        () => routeInfo?.mapType === selectorMapTypeEnum.private,
        [routeInfo?.mapType],
    );

    /**
     * If user was navigated trough shared link, we need to fetch map data
     */
    const {mapData: sharedMapData} = useSharedMapData(shareID);

    const [mapID, setMapID] = useState(regularMapId);
    /**
     * Set mapID when data comes from shared link
     */
    useEffect(() => {
        if (sharedMapData?.id && shareID) {
            setMapID(sharedMapData?.id);
        }
    }, [regularMapId, sharedMapData?.id, shareID]);

    const [nearestPoint, setNearestPoint] = useState<Point | undefined>(
        regularNearestPoint,
    );
    /**
     * When user comes from shared link, we need to set nearest point
     */
    useEffect(() => {
        if (shareID && sharedMapData?.nearestPoint) {
            setNearestPoint(sharedMapData?.nearestPoint);
        }
    }, [shareID, sharedMapData?.nearestPoint]);

    const [bottomSheetWithDetails, setBottomSheetWithDetails] = useState(false);
    const [
        bottomSheetWithMoreActions,
        setBottomSheetWithMoreActions,
    ] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

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
        mapIDToNavigateRef.current = id;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const {id, routeMapType} = routeInfo;
        if (id) {
            /**
             * Delay fetching for smooth animation
             */
            timer = setTimeout(() => {
                dispatch(fetchMapIfNotExistsLocally(id, routeMapType, true));
            }, FETCH_DATA_DELAY);
        }

        return () => {
            clearTimeout(timer);
        };
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
        () => routeMapMarkers.routeMarkres?.find(r => r.details.id === mapID),
        [routeMapMarkers.routeMarkres, mapID],
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
            mapIDToNavigateRef.current = mapID;
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
                if (globalLocation !== locationToSet) {
                    /**
                     * Clear param after new location has been set.
                     */
                    navigation.setParams({nearestPoint: undefined});
                    setCenterMapAtLocation(locationToSet);
                    setNearestPoint(undefined);
                }
            }
        }
    }, [
        markerToShowDetails,
        navigation,
        globalLocation,
        nearestPoint,
        mapID,
        shareID,
        sharedMapData?.id,
    ]);

    const onNavigateBack = useCallback(() => {
        navigation.setParams({ID: undefined});
        if (cameFromSharedLinkRef.current && !navigation.canGoBack()) {
            /**
             * we use replace instead of navigate, because if you open the app using the shared link,
             * this screen ends up as the top screen of the stack navigator
             */
            navigation.dispatch(StackActions.replace('TabMenu'));
        } else {
            navigation.navigate('WorldTab');
        }
    }, [navigation]);

    const debouncedMarkersFetch = useMemo(
        () =>
            debounce(
                routeMapMarkers.fetchRoutesMarkers,
                mapMarkersDebounceTime,
            ),
        [routeMapMarkers.fetchRoutesMarkers],
    );

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

                    if (globalLocation) {
                        debouncedMarkersFetch(
                            {
                                bbox: bbox,
                                width: 500,
                            },
                            globalLocation,
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
                    setMapID('');
                    navigation.setParams({ID: undefined});
                    setNearestPoint(undefined);
                    handleMarkerClick('', []);
                    break;
            }
        },
        [globalLocation, navigation, debouncedMarkersFetch],
    );

    /**
     * Show route data summary whenever mapID exists.
     * When no data exists placeholder will be shown.
     */
    useEffect(() => {
        setBottomSheetWithDetails(routeInfo.id || mapID ? true : false);
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
                    navigation.navigate('RecordTab', {
                        mapID: mapIDToNavigateRef.current,
                    });
                    mapIDToNavigateRef.current = '';
                    break;
                case 'add_to_planned':
                    setIsAddingToFavourites(true);
                    await dispatch(addPlannedMap(mapId));
                    setIsAddingToFavourites(false);
                    addToast({
                        key: 'toast-route-added-to-favorites',
                        title: t('addRouteToPlanned'),
                        icon: <Bookmark />,
                    });
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
                    addToast({
                        key: 'toast-route-removed-from-favorites',
                        title: t('removeRouteFromPlanned'),
                        icon: <Bookmark />,
                    });
                    break;
                case 'share':
                    setShareModalOpen(true);
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
                case 'reactions':
                    /**
                     * Can like only published routes
                     */
                    if (reaction?.enumValue && mapData?.isPublic) {
                        dispatch(
                            modifyReaction(
                                mapId,
                                reaction.enumValue,
                                !!mapData?.reaction,
                            ),
                        );
                    }
                    break;
                default:
                    break;
            }
        },
        [
            dispatch,
            navigation,
            mapData?.id,
            mapData?.reaction,
            mapData?.isPublic,
            isCreatedByUser,
            reaction?.enumValue,
            t,
            addToast,
        ],
    );

    const closeShareModal = useCallback(() => {
        setShareModalOpen(false);
    }, [setShareModalOpen]);

    return (
        <GenericScreen hideBackArrow transculentStatusBar transculentBottom>
            <View style={[styles.notificationsContainer, {top}]}>
                <NotificationList>
                    {[
                        <UnifiedLocationNotification
                            showGPSStatus
                            key={'location-notification'}
                        />,
                    ]}
                </NotificationList>
            </View>
            <RoutesMapContainer
                location={globalLocation}
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
                        likeReaction={reaction}
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
            {shareModalOpen && (
                <RouteShareModal
                    showModal={shareModalOpen}
                    mapId={mapID ? mapID : ''}
                    onClose={closeShareModal}
                />
            )}

            <MoreActionsModal
                show={bottomSheetWithMoreActions}
                onPressAction={onPressHandler}
                onClose={() => setBottomSheetWithMoreActions(false)}
            />
        </GenericScreen>
    );
};

export default RoutesMap;

const styles = StyleSheet.create({
    notificationsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
    },
});
