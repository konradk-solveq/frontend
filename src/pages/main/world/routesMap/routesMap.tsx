import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';

import {SafeAreaView, View, Platform} from 'react-native';
import I18n from 'react-native-i18n';

import {useAppDispatch} from '../../../../hooks/redux';
import {RouteMapType, Point} from '../../../../models/places.model';
import {MarkerDetailsType} from '../../../../models/map.model';
import {
    RootStackType,
    RoutesMapNavigationPropI,
    RoutesMapRouteType,
} from '../../../../types/rootStack';
import {RegularStackRoute} from '../../../../navigation/route';
import useGeolocation from '../../../../hooks/useGeolocation';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {fetchMapIfNotExistsLocally} from '../../../../storage/actions/maps';
import useGetRouteMapMarkers from '../../../../hooks/useGetRouteMapMarkers';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../helpers/animSvg';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import gradient from './gradientSvg';
import {ListBtn} from '../../../../sharedComponents/buttons';
import BottomInfoTile from './bottomList.tsx/bottomInfoTile';

import mapSource from './routesMapHtml';

import styles from './style';

interface Props {
    navigation: RoutesMapNavigationPropI;
    route: RoutesMapRouteType;
}

const RoutesMap: React.FC<Props> = ({navigation, route}: Props) => {
    const dispatch = useAppDispatch();
    const mapRef = useRef(null);
    const posRef = useRef(false);
    const statusBarHeight = useStatusBarHeight();

    const trans: any = I18n.t('MainRoutesMap');

    const [adress, setAdress] = useState<MarkerDetailsType | null>(null);
    const [canHideAddress, setCanHideAddress] = useState(true);
    const [currentMapType, setCurrentMapType] = useState<RouteMapType>(
        route.params.activeTab || RouteMapType.BIKE_MAP,
    );
    const [mapLoaded, setMapLoaded] = useState(false);

    const {location} = useGeolocation();
    const {fetchRoutesMarkers, routeMarkres} = useGetRouteMapMarkers();

    const heandleShowAdress = (adressDetails: MarkerDetailsType | null) => {
        console.log('[ON PRESSED -- heandleShowAdress]', adressDetails);
        /* TODO: check if locally route exists, fetch if not */
        if (adressDetails) {
            dispatch(
                fetchMapIfNotExistsLocally(adressDetails.id, currentMapType),
            );
        }
        setAdress(adressDetails);
    };

    const setJs = (foo: string) => mapRef.current?.injectJavaScript(foo);

    useEffect(() => {
        if (location && mapLoaded) {
            const pos = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            /**
             * Initially set map and user position.
             * Follow only user position.
             * */
            if (!posRef.current) {
                setJs(`setPosOnMap(${JSON.stringify(pos)});true;`);
                setJs(`setMyLocation(${JSON.stringify(pos)});true;`);
                posRef.current = true;
            } else {
                setJs(`setMyLocation(${JSON.stringify(pos)});true;`);
            }
        }
    }, [location, mapLoaded]);

    useEffect(() => {
        if (mapLoaded && routeMarkres.length > 0) {
            let p = JSON.stringify(routeMarkres);
            setJs(`setMarks(${p});`);
        }
    }, [routeMarkres]);

    /* TODO: extract as helper method */
    const setBtnRadio = (mapType: string) => {
        setAdress(null);
        setCurrentMapType(mapType);
    };

    const heandleBikeMap = () => {
        setAdress(null);
        setBtnRadio(RouteMapType.BIKE_MAP);
    };

    const heandleMyRoutes = () => {
        setAdress(null);
        setBtnRadio(RouteMapType.MY_ROUTES);
    };

    const heandlePlanning = () => {
        setAdress(null);
        setBtnRadio(RouteMapType.PLANNING);
    };

    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split('#$#');

        switch (val[0]) {
            case 'changeRegion':
                const newBox = JSON.parse(val[1]);
                const bbox: [Point, Point] = [
                    {lat: newBox.east, lng: newBox.north},
                    {lat: newBox.west, lng: newBox.south},
                ];

                fetchRoutesMarkers({
                    bbox: bbox,
                    width: 500,
                });
                break;
            case 'clickMarker':
                heandleShowAdress(JSON.parse(val[1]));
                setCanHideAddress(false);
                break;
            case 'clickMap':
                setTimeout(() => {
                    if (canHideAddress) {
                        heandleShowAdress(null);
                    }
                    setCanHideAddress(true);
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
        setCanHideAddress(false);
        navigation.navigate(
            RegularStackRoute.ROUTE_DETAILS_SCREEN as keyof RootStackType,
            {mapID: mapID, private: false},
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fullView}>
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
            </View>

            <AnimSvg style={styles.gradient} source={gradient} />

            <View style={styles.btns}>
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.bikeMap}
                    active={currentMapType === RouteMapType.BIKE_MAP}
                    onpress={heandleBikeMap}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.myRoutes}
                    active={currentMapType === RouteMapType.MY_ROUTES}
                    onpress={heandleMyRoutes}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.planning}
                    active={currentMapType === RouteMapType.PLANNING}
                    onpress={heandlePlanning}
                />
            </View>

            <BottomInfoTile
                key={JSON.stringify(adress)}
                data={adress}
                onPress={onNavigateDetails}
                show={!!adress}
                onHidePress={() => {
                    setCanHideAddress(false);
                }}
            />

            <StackHeader
                hideBackArrow
                inner={trans.header}
                style={{
                    top: getVerticalPx(-statusBarHeight),
                }}
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
