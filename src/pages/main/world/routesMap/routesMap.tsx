import React, {useEffect, useState, useRef, useCallback} from 'react';
import {SafeAreaView, View, Platform, Animated} from 'react-native';
import {WebView} from 'react-native-webview';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppDispatch} from '@hooks/redux';
import useGetRouteMapMarkers from '@hooks/useGetRouteMapMarkers';
import {fetchMapIfNotExistsLocally} from '@storage/actions/maps';
import {RouteMapType, Point} from '@models/places.model';
import {MarkerDetailsType} from '@models/map.model';
import {RegularStackRoute} from '@navigation/route';
import {BasicCoordsType} from '@type/coords';
import {
    RootStackType,
    RoutesMapNavigationPropI,
    RoutesMapRouteType,
} from '@type/rootStack';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {getMapInitLocation} from '@utils/webView';
import {jsonParse, jsonStringify} from '@utils/transformJson';
import {getHorizontalPx} from '@helpers/layoutFoo';

import AnimSvg from '@helpers/animSvg';
import {FindMeButton, ListBtn, TypicalRedBtn} from '@sharedComponents/buttons';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';

import BottomInfoTile from './bottomList.tsx/bottomInfoTile';
import gradient from './gradientSvg';
import mapSource from './routesMapHtml';

import styles from './style';

const isIOS = Platform.OS === 'ios';

interface Props {
    navigation: RoutesMapNavigationPropI;
    route: RoutesMapRouteType;
}

const RoutesMap: React.FC<Props> = ({navigation, route}: Props) => {
    const dispatch = useAppDispatch();
    const mapRef = useRef(null);
    const posRef = useRef(false);

    const {location} = useLocationProvider();
    const [initLocation, setInitLocation] = useState<
        BasicCoordsType | undefined
    >();

    const {t} = useMergedTranslation('MainRoutesMap');

    const [showWebView, setShowWebView] = useState(true);
    const [adress, setAdress] = useState<MarkerDetailsType | null>(null);
    const [currentMapType, setCurrentMapType] = useState<RouteMapType>(
        route.params.activeTab || RouteMapType.BIKE_MAP,
    );
    const [mapLoaded, setMapLoaded] = useState(false);

    const {fetchRoutesMarkers, routeMarkres} = useGetRouteMapMarkers();

    const findBtnPosY = useRef(new Animated.Value(getHorizontalPx(40))).current;
    const maxFindBtnPosY = isIOS
        ? getHorizontalPx(148 + 16) + 20
        : getHorizontalPx(148 + 16);

    useEffect(() => {
        if (location) {
            setInitLocation(location);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        Animated.timing(findBtnPosY, {
            toValue: adress === null ? getHorizontalPx(40) : maxFindBtnPosY,
            duration: 800,
            useNativeDriver: false,
        }).start();
    }, [adress, findBtnPosY, maxFindBtnPosY]);

    const heandleShowAdress = (adressDetails: MarkerDetailsType | null) => {
        if (adressDetails) {
            dispatch(
                fetchMapIfNotExistsLocally(adressDetails.id, currentMapType),
            );
        }
        /* Wait for HTTP request */
        setTimeout(() => {
            setAdress(adressDetails);
        }, 200);
    };

    const setJs = (foo: string) => mapRef.current?.injectJavaScript(foo);

    useEffect(() => {
        if (location && mapLoaded) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (!p) {
                return;
            }

            /**
             * Initially set map and user position.
             * Follow only user position.
             * */
            if (!posRef.current) {
                setJs(`setMyLocation(${p});true;`);
                setJs(`setPosOnMap(${p});true;`);
                posRef.current = true;
            } else {
                setJs(`setMyLocation(${p});true;`);
            }
        }
    }, [location, mapLoaded]);

    const switchVisibleMarkers = useCallback(() => {
        switch (currentMapType) {
            case RouteMapType.BIKE_MAP:
                setJs('setPublic();true;');
                break;
            case RouteMapType.MY_ROUTES:
                setJs('setPrivate();true;');
                break;
            case RouteMapType.PLANNING:
                setJs('setFavourites();true;');
                break;
        }
    }, [currentMapType]);

    useEffect(() => {
        if (mapLoaded && routeMarkres.length > 0 && posRef.current) {
            let p = jsonStringify(routeMarkres);
            setJs('clearMarkersCluster();true;');
            if (p) {
                setJs(`setMarks(${p});true;`);
            }
            switchVisibleMarkers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeMarkres, mapLoaded]);

    useEffect(() => {
        switchVisibleMarkers();
    }, [switchVisibleMarkers]);

    /**
     * On Android webView blocks location event (?).
     * This is temporary workaround.
     *
     * TODO: find better solution.
     */
    useEffect(() => {
        if (!isIOS) {
            const t = setTimeout(() => {
                setShowWebView(true);
            }, 150);

            return () => {
                clearTimeout(t);
            };
        }
    }, []);

    /* TODO: extract as helper method */
    const setBtnRadio = (mapType: string) => {
        setAdress(null);
        setCurrentMapType(mapType);
    };

    const heandleBikeMap = () => {
        setBtnRadio(RouteMapType.BIKE_MAP);
    };

    const heandleMyRoutes = () => {
        setBtnRadio(RouteMapType.MY_ROUTES);
    };

    const heandlePlanning = () => {
        setBtnRadio(RouteMapType.PLANNING);
    };

    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split('#$#');

        switch (val[0]) {
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
                    fetchRoutesMarkers(
                        {
                            bbox: bbox,
                            width: 500,
                        },
                        location,
                    );
                }
                break;
            case 'clickMarker':
                const a = jsonParse(val?.[1]);
                if (!a) {
                    return;
                }

                heandleShowAdress(a);
                break;
            case 'clickMap':
                setTimeout(() => {
                    heandleShowAdress(null);
                }, 300);
                break;
        }
    };

    const heandleMapLoaded = () => {
        setMapLoaded(true);
    };

    const onNavigateBack = () => {
        navigation.navigate(
            RegularStackRoute.KROSS_WORLD_SCREEN as keyof RootStackType,
            {activeTab: currentMapType},
        );
    };

    const onNavigateDetails = (mapID: string) => {
        navigation.navigate(
            RegularStackRoute.ROUTE_DETAILS_SCREEN as keyof RootStackType,
            {
                mapID: mapID,
                private: currentMapType === RouteMapType.MY_ROUTES,
                favourite: currentMapType === RouteMapType.PLANNING,
            },
        );
    };

    const hendleFindMyLocation = () => {
        if (location && mapLoaded) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (p) {
                setJs(`setPosOnMap(${p});true;`);
            }
        }
    };

    const initMapPos = getMapInitLocation(initLocation);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fullView}>
                {showWebView && (
                    <WebView
                        style={styles.fullView}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={Platform.OS === 'ios'}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onLoadEnd={() => heandleMapLoaded()}
                        source={{
                            html:
                                '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent}</style></head><body>' +
                                initMapPos +
                                mapSource +
                                '</body></html>',
                            baseUrl:
                                Platform.OS === 'ios'
                                    ? ''
                                    : 'file:///android_asset/',
                        }}
                        javaScriptEnabled={true}
                        ref={mapRef}
                        onMessage={heandleOnMessage}
                    />
                )}
            </View>

            <AnimSvg style={styles.gradient} source={gradient} />

            <View style={styles.btns}>
                <TypicalRedBtn
                    style={styles.btn}
                    title={t('bikeMap')}
                    active={currentMapType === RouteMapType.BIKE_MAP}
                    onpress={heandleBikeMap}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={t('myRoutes')}
                    active={currentMapType === RouteMapType.MY_ROUTES}
                    onpress={heandleMyRoutes}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={t('planning')}
                    active={currentMapType === RouteMapType.PLANNING}
                    onpress={heandlePlanning}
                />
            </View>

            <Animated.View
                style={[
                    styles.findWrap,
                    {
                        bottom: findBtnPosY,
                    },
                ]}>
                <FindMeButton onpress={hendleFindMyLocation} />
            </Animated.View>

            <BottomInfoTile
                key={adress?.id}
                data={adress}
                onPress={onNavigateDetails}
                show={!!adress}
                onHidePress={() => {}}
            />

            <StackHeader
                hideBackArrow
                inner={t('header')}
                rightActions={
                    <View style={styles.actionButtonsContainer}>
                        <ListBtn
                            onPress={onNavigateBack}
                            iconStyle={styles.actionButton}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default RoutesMap;
