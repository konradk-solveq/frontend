import React, {useState, useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
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
import geoBox, {Box} from '../../../../helpers/geoBox';

import MarkerList from './markerList/markerList';
import AddressBox from './addressBox/addressBox';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';
import CanvasView from './canvasRender';
import {WebView} from 'react-native-webview';
// import HTML_FILE from './index.html';

interface Props {
    navigation: any;
    route: any;
}

const defaultRegion = {
    latitude: 53.008773556173104,
    latitudeDelta: 0.07588885599553308,
    longitude: 20.89136063395526,
    longitudeDelta: 0.4499640028797671,
};

const {width, height} = Dimensions.get('window');

const ServicesMap: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector<boolean>(state => state.places.loading);
    const places = useAppSelector<Place[]>(state => state.places.places);

    const trans: any = I18n.t('ServicesMap');
    const param = props.route.params;

    const [markersFilters, setMarkersFilters] = useState<markerTypes[]>([
        markerTypes.SERVICE,
        markerTypes.SHOP,
    ]);
    const [adress, setAdress] = useState<PointDetails | null>(null);
    const [regionData, setRegionData] = useState<Region | undefined>(
        param.region,
    );
    const [mapBox, setMapBox] = useState<Box>(param.box);

    /* TODO: extract as helper method */
    const heandleServices = () => {
        if (!markersFilters?.includes(markerTypes.SHOP)) {
            return;
        }
        setMarkersFilters(prevFilters => {
            if (prevFilters.includes(markerTypes.SERVICE)) {
                const newFilters = prevFilters.filter(
                    f => f !== markerTypes.SERVICE,
                );
                return newFilters;
            }
            return [...prevFilters, markerTypes.SERVICE];
        });
    };
    const heandleShops = () => {
        if (!markersFilters?.includes(markerTypes.SERVICE)) {
            return;
        }
        setMarkersFilters(prevFilters => {
            if (prevFilters.includes(markerTypes.SHOP)) {
                const newFilters = prevFilters.filter(
                    f => f !== markerTypes.SHOP,
                );
                return newFilters;
            }
            return [...prevFilters, markerTypes.SHOP];
        });
    };

    useEffect(() => {
        const getMapData = async () => {
            try {
                await dispatch(
                    fetchPlacesData({
                        bbox: [
                            {lat: mapBox.left, lng: mapBox.top},
                            {lat: mapBox.right, lng: mapBox.bottom},
                        ],
                        width: 2500,
                    }),
                );
            } catch (error) {
                console.log('[Get places error]', error);
            }
        };

        getMapData().then(() => getMapData());
    }, [mapBox.bottom, mapBox.left, mapBox.top, mapBox.right, dispatch]);

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

        const newBox = geoBox(
            {
                lon: region.longitude,
                lat: region.latitude,
            },
            100,
        );

        const leftDifference = Math.abs(mapBox.left - newBox.left);
        const topDifference = Math.abs(mapBox.top - newBox.top);

        setRegionData(region);

        if (leftDifference < 0.2 && topDifference < 0.15) {
            return;
        }

        setMapBox(newBox);
    };

    const haendleRegionChange = (region: Region) => {};

    const img = '<img src="map_marker_android.png" /><div>test2</div>';

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
        wrap: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            width: width,
            height: height,
            flex: 1,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
            flex: 1,
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
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <CanvasView></CanvasView>
            </View>



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
