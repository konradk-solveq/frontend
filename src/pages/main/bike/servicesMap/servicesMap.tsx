import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';

import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    View,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {fetchPlacesData} from '../../../../storage/actions';

import {
    markerTypes,
    Place,
    PointDetails,
} from '../../../../models/places.model';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../helpers/animSvg';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import gradient from './gradientSvg';

import AddressBox from './addressBox/addressBox';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';

import mapSource from './servicesMapHtml';
import {useRoute} from '@react-navigation/core';

interface Props {
    navigation: any;
    route: any;
}

const {width, height} = Dimensions.get('window');

const ServicesMap: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector<boolean>(state => state.places.loading);
    const places = useAppSelector<Place[]>(state => state.places.places);

    const trans: any = I18n.t('ServicesMap');
    const param = props.route.params;
    const route = useRoute();

    const [markersFilters, setMarkersFilters] = useState<markerTypes[]>([
        markerTypes.SERVICE,
        markerTypes.SHOP,
    ]);
    const [adress, setAdress] = useState<PointDetails | null>(null);
    const [regionData, setRegionData] = useState<Region>(param.region);

    const heandleShowAdress = (adressDetails: PointDetails | null) => {
        if (adressDetails && Platform.OS === 'android') {
            setRegionData(undefined);
        }
        setAdress(adressDetails);
    };

    const onRegionChangeHandler = (region: Region) => {
        if (isFetching) {
            return;
        }

        // wyliczenie regionu widocznego na ekranie
        const newBox = {
            top: region.latitude - region.latitudeDelta * 0.5,
            bottom: region.latitude + region.latitudeDelta * 0.5,
            left: region.longitude - region.longitudeDelta * 0.5,
            right: region.longitude + region.longitudeDelta * 0.5,
        };

        setRegionData(region);

        const getMapData = async () => {
            if (isFetching) {
                return;
            }

            let bbox = [
                {lat: newBox.left, lng: newBox.top},
                {lat: newBox.right, lng: newBox.bottom},
            ];

            try {
                await dispatch(
                    fetchPlacesData({
                        bbox,
                        width: 2500,
                    }),
                );
            } catch (error) {
                /* TODO: add ui info */
                console.log('[Get places error]', error);
            }
        };

        getMapData();
    };

    const mapRef = useRef();
    const setJs = (foo: string) => mapRef.current.injectJavaScript(foo);

    /* TODO: extract as helper method */
    const heandleShops = () => {
        if (!markersFilters?.includes(markerTypes.SERVICE)) {
            return;
        }
        setMarkersFilters(prevFilters => {
            if (prevFilters.includes(markerTypes.SHOP)) {
                const newFilters = prevFilters.filter(
                    f => f !== markerTypes.SHOP,
                );
                setJs('setShops(false)');
                return newFilters;
            }
            setJs('setShops(true)');
            return [...prevFilters, markerTypes.SHOP];
        });
    };

    const heandleServices = () => {
        if (!markersFilters?.includes(markerTypes.SHOP)) {
            return;
        }
        setMarkersFilters(prevFilters => {
            if (prevFilters.includes(markerTypes.SERVICE)) {
                const newFilters = prevFilters.filter(
                    f => f !== markerTypes.SERVICE,
                );
                setJs('setServices(false)');
                return newFilters;
            }
            setJs('setServices(true)');
            return [...prevFilters, markerTypes.SERVICE];
        });
    };

    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split('#$#');

        switch (val[0]) {
            case 'changeRegion':
                {
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
                }
                break;
            case 'clickMarker':
                {
                    heandleShowAdress(JSON.parse(val[1]));
                }
                break;
            case 'clickMap':
                {
                    heandleShowAdress(null);
                }
                break;
        }
    };

    const heandleMapLoaded = () => {
        let pos = {
            latitude: route.params.location.latitude,
            longitude: route.params.location.longitude,
        };

        setJs(`setPosOnMap(${JSON.stringify(pos)});true;`);
    };

    useEffect(() => {
        let p = JSON.stringify(places);
        if (places.length == 0) {
            return;
        }

        setJs(`setMarks(${p});true;`);
    }, [places]);

    setObjSize(350, 23);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            flex: 1,
        },
        innerContainer: {
            flex: 1,
        },
        wrap: {
            ...StyleSheet.absoluteFillObject,
            width: width,
            height: height,
            // backgroundColor: 'khaki',
        },
        fullView: {
            // backgroundColor: 'khaki',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
        },
        gradient: {
            position: 'absolute',
            width: width,
            height: width,
            top: 0,
            left: 0,
        },
        btns: {
            position: 'absolute',
            left: getHorizontalPx(40),
            top: getVerticalPx(108),
            height: 41,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        btn: {
            marginRight: getHorizontalPx(5),
        },
    });

    return (
        <SafeAreaView SafeAreaView style={styles.container}>
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
                    title={trans.services}
                    active={markersFilters?.includes(markerTypes.SERVICE)}
                    onpress={heandleServices}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.shops}
                    active={markersFilters?.includes(markerTypes.SHOP)}
                    onpress={heandleShops}
                />
            </View>
            {adress && <AddressBox address={adress} />}

            <StackHeader onpress={() => props.navigation.goBack()} inner={''} />
        </SafeAreaView>
    );
};

export default ServicesMap;
