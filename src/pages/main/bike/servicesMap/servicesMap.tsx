import React, {useEffect, useState, useRef, useCallback} from 'react';
import {WebView} from 'react-native-webview';

import {StyleSheet, View, Platform} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {fetchPlacesData} from '@storage/actions';
import {globalLocationSelector} from '@storage/selectors';

import {markerTypes, Place, PointDetails} from '@models/places.model';
import {BasicCoordsType} from '@type/coords';
import {getMapInitLocation} from '@utils/webView';
import {jsonParse, jsonStringify} from '@utils/transformJson';

import AddressBox from './addressBox/addressBox';
import mapSource from './servicesMapHtml';
import GenericScreen from '@src/pages/template/GenericScreen';
import {Button, IconButton, SecondaryButton} from '@src/components/buttons';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import colors from '@theme/colors';
import {MykrossIconFont} from '@src/theme/enums/iconFonts';
import {useNavigation} from '@react-navigation/native';
import {BottomModal} from '@components/modals';

import {AnimatedContainerPosition} from '@src/containers/World/components';
import NotificationList from '@components/notifications/NotificationList';
import useCheckLocationType from '@hooks/staticLocationProvider/useCheckLocationType';
import UnifiedLocationNotification from '@notifications/UnifiedLocationNotification';
import {googleMapId} from '@src/utils/constants/googleMapId';

const ServicesMap: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const {t} = useMergedTranslation('ServicesMap');

    const {permissionGranted, permissionResult} = useCheckLocationType();

    const location = useAppSelector(globalLocationSelector);
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

    const handleSetMyLocation = useCallback(() => {
        if (location && permissionResult && permissionGranted) {
            const pos = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            const p = jsonStringify(pos);
            if (p) {
                setJs(`setMyLocation(${p}, false);true;`);
            }
        } else {
            setJs('setMyLocation(null, true);true;');
        }
    }, [location, permissionGranted, permissionResult]);

    useEffect(() => {
        if (mapLoaded) {
            handleSetMyLocation();
        }
    }, [mapLoaded, handleSetMyLocation]);
    const heandleShowAdress = (adressDetails: PointDetails | null) => {
        setAdress(adressDetails);
    };

    const mapRef = useRef();
    const setJs = (foo: string) => mapRef?.current?.injectJavaScript(foo);

    /* TODO: extract as helper method */
    const handleShops = () => {
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

    const handleServices = () => {
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
        }
    };

    const handleFindMyLocation = () => {
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
        handleFindMyLocation();
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

    const buttonProps = (markerType: markerTypes) => {
        return {
            textColor: markersFilters?.includes(markerType)
                ? colors.white
                : colors.black,
            color: markersFilters?.includes(markerType)
                ? colors.red
                : colors.white,
        };
    };

    const styles = StyleSheet.create({
        fullView: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
        },
        topContainer: {
            position: 'absolute',
            top: getFVerticalPx(60),
            width: '100%',
            zIndex: 1,
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: appContainerHorizontalMargin,
        },
        btn: {
            width: getFHorizontalPx(175),
            height: getFVerticalPx(40),
        },
    });

    const initMapPos = getMapInitLocation(initLocation);
    return (
        <GenericScreen hideBackArrow transculentStatusBar transculentBottom>
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
                            googleMapId +
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

            <View style={styles.topContainer}>
                <NotificationList>
                    <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.btn}
                            text={t('services')}
                            {...buttonProps(markerTypes.SERVICE)}
                            onPress={handleServices}
                        />
                        <Button
                            style={styles.btn}
                            text={t('shops')}
                            {...buttonProps(markerTypes.SHOP)}
                            onPress={handleShops}
                        />
                    </View>
                    <UnifiedLocationNotification
                        showGPSStatus
                        key={'location-notification'}
                    />
                </NotificationList>
            </View>

            {
                <BottomModal
                    show={!!adress}
                    openModalHeight={getFVerticalPx(200)}
                    style={{
                        backgroundColor: colors.white,
                    }}>
                    {adress ? <AddressBox address={adress} /> : null}
                </BottomModal>
            }
            <AnimatedContainerPosition
                toggle={!!adress}
                height={getFVerticalPx(220)}>
                <SecondaryButton
                    text={t('closeButton')}
                    icon={MykrossIconFont.MYKROSS_ICON_EXIT}
                    textColor={colors.black}
                    onPress={() => navigation.goBack()}
                    style={{
                        width: getFHorizontalPx(115),
                        height: getFHorizontalPx(44),
                    }}
                />
                {!!location && !!permissionResult && permissionGranted && (
                    <IconButton
                        icon={MykrossIconFont.MYKROSS_ICON_USER}
                        onPress={handleFindMyLocation}
                    />
                )}
            </AnimatedContainerPosition>
        </GenericScreen>
    );
};

export default ServicesMap;
