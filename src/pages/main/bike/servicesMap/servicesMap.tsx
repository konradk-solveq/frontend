import React, {useState, useMemo, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
} from 'react-native';
import Svg, {G, Path, Circle} from 'react-native-svg';

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {fetchPlacesData} from '../../../../storage/actions';
import {Place} from '../../../../models/places.model';

import I18n from 'react-native-i18n';
import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import AnimSvg from '../../../../helpers/animSvg';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const gradient = `<svg    
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"

viewBox="0 0 414 414">
 <defs>
     <linearGradient
    id="gradient">
         <stop
      stop-color="#fff"
      stop-opacity="1"
      offset="0"/>
         <stop
      stop-color="#fff"
      stop-opacity="0"
      offset="1"/>
     </linearGradient>
     <linearGradient
    xlink:href="#gradient"
    id="gradient2"
    x1="0"
    y1="0"
    x2="0"
    y2="414"
    gradientUnits="userSpaceOnUse" />
 </defs>
 <rect
    fill="url(#gradient2)"
    stroke="none"
    width="414"
    height="414"
    x="0"
    y="0" />
</svg>`;

const adressBackground = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414 415">
<filter id="filter" x="-1" width="3" y="-1" height="3">
    <feGaussianBlur stdDeviation="38.75575"/>
</filter>
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 509.36241 H 0 Z"
 filter="url(#filter)" fill="#aaa" />
<path
 d="m 0,94.362406 c 0,0 82.50881,21.581224 207,21.581224 124.49119,0 207,-21.581224 207,-21.581224 V 509.36241 H 0 Z" fill="#fff"/>
</svg>`;

const ServicesMap: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const places = useAppSelector<Place[]>(state => state.places.places);
    const [allPaces, setAllPlaces] = useState<Place>(places); // <<-- #ask_Sebastian: czy ja to dobrze zaimplementowałem?

    const trans: any = I18n.t('ServicesMap');
    const param = props.route.params;
    // console.log('%c param:', 'background: #ffcc00; color: #003300', param);

    const [services, setServices] = useState(true);
    const [shops, setShops] = useState(true);
    const [adress, setAdress] = useState(null);
    const [firstRun, setFirsRun] = useState(true);

    const heandleServices = () => {
        setFirsRun(false);
        if (services && !shops) {
            return;
        }
        setServices(!services);
    };
    const heandleShops = () => {
        setFirsRun(false);
        if (!services && shops) {
            return;
        }
        setShops(!shops);
    };

    useEffect(() => {
        const getMapData = async () => {
            try {
                await dispatch(
                    fetchPlacesData({
                        bbox: [
                            {lat: param.box.left, lng: param.box.top},
                            {lat: param.box.right, lng: param.box.bottom},
                        ],
                        width: 300,
                    }),
                );
            } catch (error) {
                console.log('[Get places error]', error);
            }
        };

        getMapData().then(() => getMapData());
    }, []);


    const heandleShowAdress = e => {
        setFirsRun(false);
        console.log('%c e:', 'background: #ffcc00; color: #003300', e);
        setAdress(e.details);
    };

    setObjSize(350, 23);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        wrap: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            width: ww,
            height: wh,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        gradient: {
            position: 'absolute',
            width: ww,
            height: ww,
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
        mark: {
            width: 36,
            height: 36,
        },
        service: {opacity: services ? 1 : 0},
        shop: {opacity: shops ? 1 : 0},
        adressContainer: {
            position: 'absolute',
            width: ww,
            height: ww,
            left: 0,
            top: wh - ww * 0.65,
        },
        adress: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
        },
        adressWrap: {
            left: getHorizontalPx(40),
            width: getHorizontalPx(334),
            position: 'absolute',
            top: ww * 0.37,
        },
        adressName: {
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: 23,
            color: '#313131',
        },
        adressPalce: {
            marginTop: 2,
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 15,
            lineHeight: 19,
            color: '#555555',
        },
        adressContact: {
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
        },
        adressEmailPhone: {
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: 15,
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={firstRun ? param.region : undefined}>
                    {allPaces.map((e, i) => (
                        <Marker
                            key={'mark_' + i}
                            onPress={() => {
                                heandleShowAdress(e);
                            }}
                            stopPropagation={true}
                            anchor={{x: 0.5, y: 0.5}}
                            centerOffset={{x: 0.5, y: 0.5}}
                            coordinate={{
                                latitude: e.lat,
                                longitude: e.lng,
                            }}>
                            <Svg
                                viewBox="0 0 36 36"
                                style={[
                                    styles.mark,
                                    e.markerType == 'service' && styles.service,
                                    e.markerType == 'shop' && styles.shop,
                                ]}>
                                <Circle cx="18" cy="18" r="18" fill="#313131" />
                                <Path
                                    fill="#FFF"
                                    fill-rule="nonzero"
                                    d="M6.565 1.207C7.453.304 8.676-.124 9.922.03c1.245.156 2.33.874 2.976 1.968l1.12 1.899c.247.42.596.774 1.008 1.026l1.866 1.14c1.076.656 1.781 1.76 1.934 3.027.153 1.267-.268 2.512-1.155 3.414-.767.781-1.786 1.207-2.853 1.207-.167 0-.335-.01-.503-.031-1.246-.156-2.33-.874-2.976-1.968l-1.12-1.899c-.202-.343-.473-.643-.79-.879-.318.236-.588.536-.791.88l-1.12 1.898c-.646 1.094-1.73 1.812-2.976 1.968-.168.02-.336.031-.503.031-1.067 0-2.086-.426-2.853-1.207C.3 11.603-.122 10.358.031 9.091c.153-1.267.858-2.37 1.934-3.028l1.866-1.14c.412-.251.761-.606 1.009-1.025l1.026-1.74c.184-.345.418-.665.7-.951zm-1.102 3.74c-.297.373-.658.693-1.063.94l-1.866 1.14c-.783.478-1.295 1.28-1.406 2.201-.112.921.194 1.826.84 2.483.644.656 1.534.967 2.44.854.905-.113 1.693-.635 2.163-1.43l1.12-1.9c.202-.342.453-.652.743-.921l-1.09-.665c-.982-.6-1.655-1.573-1.881-2.703zm4.324-3.8c-.906-.113-1.795.198-2.44.854-.173.176-.32.369-.443.575l.003.002-.074.125c-.285.538-.402 1.155-.326 1.78.111.922.624 1.724 1.406 2.202l1.866 1.14c.567.346 1.047.834 1.387 1.41l1.12 1.9c.47.795 1.258 1.317 2.164 1.43.905.113 1.795-.198 2.44-.854.645-.657.951-1.562.84-2.483-.112-.921-.624-1.723-1.407-2.201l-1.865-1.14c-.568-.346-1.047-.834-1.388-1.411l-1.12-1.898c-.47-.796-1.258-1.318-2.163-1.43zm3.806 7.21c.67-.683 1.76-.683 2.43 0 .67.68.67 1.79 0 2.472-.335.34-.775.511-1.215.511-.44 0-.88-.17-1.215-.511-.67-.682-.67-1.791 0-2.473zm-10.76 0c.671-.683 1.761-.683 2.431 0 .67.68.67 1.79 0 2.472-.335.34-.775.511-1.215.511-.44 0-.88-.17-1.215-.511-.67-.682-.67-1.791 0-2.473zm11.975.611c-.157 0-.314.061-.434.183-.24.243-.24.64 0 .883s.629.243.868 0c.24-.243.24-.64 0-.883-.12-.122-.277-.183-.434-.183zm-10.325.183c-.24-.243-.629-.243-.868 0-.24.243-.24.64 0 .883s.629.243.868 0c.24-.243.24-.64 0-.883zm3.73-6.268c.67-.682 1.76-.681 2.43 0 .67.682.67 1.791 0 2.473-.334.34-.774.511-1.214.511-.44 0-.88-.17-1.216-.511-.67-.682-.67-1.791 0-2.473zm1.216.612c-.158 0-.315.061-.434.183-.24.243-.24.64 0 .883.239.243.628.244.868 0 .239-.243.239-.64 0-.883-.12-.122-.277-.183-.434-.183z"
                                    transform="translate(8.571 11.144)"
                                />
                            </Svg>
                        </Marker>
                    ))}
                </MapView>
            </View>

            <AnimSvg style={styles.gradient} source={gradient} />

            <View style={styles.btns}>
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.services}
                    active={services}
                    onpress={heandleServices}
                />
                <TypicalRedBtn
                    style={styles.btn}
                    title={trans.shops}
                    active={shops}
                    onpress={heandleShops}
                />
            </View>

            {adress && (
                <View style={styles.adressContainer}>
                    <AnimSvg style={styles.adress} source={adressBackground} />
                    <View style={styles.adressWrap}>
                        <Text style={styles.adressName}>{adress.name}</Text>
                        <Text style={styles.adressPalce}>
                            {adress.city + '\n' + adress.street}
                        </Text>
                        <View style={styles.adressContact}>
                            <Text style={styles.adressEmailPhone}>
                                {adress.email}
                            </Text>
                            <Text style={styles.adressEmailPhone}>
                                {adress.phone}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            <StackHeader onpress={() => props.navigation.goBack()} inner={''} />
        </SafeAreaView>
    );
};

export default ServicesMap;
