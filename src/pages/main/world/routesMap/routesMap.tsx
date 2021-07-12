import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';

import {SafeAreaView, View, Platform} from 'react-native';
import I18n from 'react-native-i18n';

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
    RouteMapType,
    PointDetails,
    Place,
} from '../../../../models/places.model';
import {
    RootStackType,
    RoutesMapNavigationPropI,
    RoutesMapRouteType,
} from '../../../../types/rootStack';
import {RegularStackRoute} from '../../../../navigation/route';
import useGeolocation from '../../../../hooks/useGeolocation';
import {mapsListSelector} from '../../../../storage/selectors';
import {
    favouritesMapsSelector,
    privateMapsListSelector,
} from '../../../../storage/selectors/map';
import {getVerticalPx} from '../../../../helpers/layoutFoo';
import useStatusBarHeight from '../../../../hooks/statusBarHeight';
import {fetchPlacesData} from '../../../../storage/actions';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../helpers/animSvg';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import gradient from './gradientSvg';
import {ListBtn} from '../../../../sharedComponents/buttons';
import BottomInfoTile from './bottomList.tsx/bottomInfoTile';

import AddressBox from './addressBox/addressBox';

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
    const statusBarHeight = useStatusBarHeight();

    /* TODO: routes should be updated every tab change */
    const regularRoutesData = useAppSelector(mapsListSelector);
    const privateRoutesData = useAppSelector(privateMapsListSelector);
    const favouriteRoutesData = useAppSelector(favouritesMapsSelector);

    const privateData = route.params?.private ? privateRoutesData : undefined;
    const favouriteData = route.params?.favourite
        ? favouriteRoutesData
        : undefined;

    const [routesData, setRoutesData] = useState(
        privateData || favouriteData || regularRoutesData,
    );
    // dodać listę tras

    const places = useAppSelector<Place[]>(state => state.places.places);

    const trans: any = I18n.t('MainRoutesMap');
    const params = route.params;
    // console.log('[PARAMS]', params);

    const [adress, setAdress] = useState<PointDetails | null>(null);
    const [currentMapType, setCurrentMapType] = useState<RouteMapType>(
        route.params.activeTab || RouteMapType.BIKE_MAP,
    );
    const [mapLoaded, setMapLoaded] = useState(false);

    const {locations} = useGeolocation();

    useEffect(() => {
        if (currentMapType === RouteMapType.MY_ROUTES) {
            setRoutesData(privateRoutesData);
        }
        if (currentMapType === RouteMapType.PLANNING) {
            setRoutesData(favouriteRoutesData);
        }
        if (currentMapType === RouteMapType.BIKE_MAP) {
            setRoutesData(regularRoutesData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMapType]);

    // const [regionData, setRegionData] = useState<Region>(param.region);

    const heandleShowAdress = (adressDetails: PointDetails | null) => {
        console.log('[ON PRESSED -- heandleShowAdress]', adressDetails);
        // if (adressDetails && Platform.OS === 'android') {
        //     setRegionData(undefined);
        // }
        setAdress(adressDetails);
    };

    const setJs = (foo: string) => mapRef.current?.injectJavaScript(foo);

    useEffect(() => {
        if (locations?.length && mapLoaded) {
            const lastLocation = locations?.[locations.length - 1];
            if (!lastLocation) {
                return;
            }

            const pos = {
                latitude: lastLocation.coords.latitude,
                longitude: lastLocation.coords.longitude,
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
    }, [locations, mapLoaded]);

    useEffect(() => {
        if (mapLoaded && places.length > 0) {
            let p = JSON.stringify(places);
            setJs(`setMarks(${p});`);
        }
    }, [places]);

    /* TODO: extract as helper method */
    const setBtnRadio = (mapType: string) => {
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
                const newBox = JSON.parse(val[1]);
                const bbox = [
                    {lat: newBox.east, lng: newBox.north},
                    {lat: newBox.west, lng: newBox.south},
                ];
                const getMapData = async () => {
                    try {
                        await dispatch(
                            fetchPlacesData({
                                bbox: bbox,
                                width: 500,
                            }),
                        );
                    } catch (error) {
                        /* TODO: add ui info */
                        console.log('[Get places error]', error);
                    }
                };

                getMapData();
                break;
            case 'clickMarker':
                heandleShowAdress(JSON.parse(val[1]));
                break;
            case 'clickMap':
                heandleShowAdress(null);
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
            {adress && <AddressBox address={adress} />}

            {adress && (
                <BottomInfoTile
                    data={routesData?.[0]}
                    onPress={onNavigateDetails}
                />
            )}

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
