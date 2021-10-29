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

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {fetchPlacesData} from '@storage/actions';

import {markerTypes, Place, PointDetails} from '@models/places.model';
import {BasicCoordsType} from '@type/coords';
import {useLocationProvider} from '@providers/staticLocationProvider/staticLocationProvider';
import {setObjSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';
import {getMapInitLocation} from '@utils/webView';
import {jsonParse, jsonStringify} from '@utils/transformJson';

import AnimSvg from '@helpers/animSvg';
import {FindMeButton, TypicalRedBtn} from '@sharedComponents/buttons';
import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';

import gradient from './gradientSvg';
import AddressBox from './addressBox/addressBox';
import mapSource from './servicesMapHtml';

interface Props {
    navigation: any;
    route: any;
}

const {width, height} = Dimensions.get('window');

const ServicesMap: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const trans: any = I18n.t('ServicesMap');

    const {location} = useLocationProvider();
    const [initLocation, setInitLocation] = useState<
        BasicCoordsType | undefined
    >();
    const places = useAppSelector<Place[]>(state => state.places.places);

    const [markersFilters, setMarkersFilters] = useState<markerTypes[]>([
        markerTypes.SERVICE,
        markerTypes.SHOP,
    ]);
    const [adress, setAdress] = useState<PointDetails | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (location) {
            setInitLocation(location);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (location) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (p) {
                setJs(`setMyLocation(${p});true;`);
            }
        }
    }, [location]);

    const heandleShowAdress = (adressDetails: PointDetails | null) => {
        setAdress(adressDetails);
    };

    const mapRef = useRef();
    const setJs = (foo: string) => mapRef?.current?.injectJavaScript(foo);

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
                setJs('setShops(false);true;');
                return newFilters;
            }
            setJs('setShops(true);true;');
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
                setJs('setServices(false);true;');
                return newFilters;
            }
            setJs('setServices(true);true;');
            return [...prevFilters, markerTypes.SERVICE];
        });
    };

    const heandleOnMessage = e => {
        let val = e.nativeEvent.data.split('#$#');

        switch (val[0]) {
            case 'changeRegion':
                {
                    const newBox = jsonParse(val?.[1]);
                    if (!newBox) {
                        return;
                    }

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
                const a = jsonParse(val?.[1]);
                if (!a) {
                    return;
                }

                heandleShowAdress(a);
                break;
            case 'clickMap':
                heandleShowAdress(null);
                break;
        }
    };

    const hendleFindMyLocation = () => {
        if (location) {
            let pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (p) {
                setJs(`setPosOnMap(${p});true;`);
            }
        }
    };

    const heandleMapLoaded = () => {
        hendleFindMyLocation();
        setMapLoaded(true);
    };

    useEffect(() => {
        if (mapLoaded && places.length > 0) {
            let p = jsonStringify(places);
            if (p) {
                setJs(`setMarks(${p});true;`);
            }
        }
    }, [places, mapLoaded]);

    setObjSize(350, 23);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: getVerticalPx(896 * 1.1),
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
        },
        fullView: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: getVerticalPx(896 * 1.1),
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
            height: getHorizontalPx(41),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        btn: {
            marginRight: getHorizontalPx(5),
        },
        findWrap: {
            position: 'absolute',
            right: getHorizontalPx(40),
            width: getHorizontalPx(41),
            height: getHorizontalPx(41),
        },
    });

    const initMapPos = getMapInitLocation(initLocation);
    const withHours = adress?.openHours ? 414 * 0.57 + 16 : 414 * 0.49 + 16;

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
                    onLoadEnd={heandleMapLoaded}
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

            <FindMeButton
                style={[
                    styles.findWrap,
                    {
                        bottom: adress
                            ? getHorizontalPx(withHours)
                            : getHorizontalPx(40),
                    },
                ]}
                onpress={hendleFindMyLocation}
            />

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.title}
            />
        </SafeAreaView>
    );
};

export default ServicesMap;
