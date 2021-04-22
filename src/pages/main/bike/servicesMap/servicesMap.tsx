import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    View,
    Platform,
} from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';

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

const adressBackground = ``;

const ServicesMap: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('ServicesMap');
    const param = props.route.params;

    const [services, setServices] = useState(true);
    const [shops, setShops] = useState(true);

    const heandleServices = () => {
        if (services && !shops) {
            return;
        }
        setServices(!services);
    };
    const heandleShops = () => {
        if (!services && shops) {
            return;
        }
        setShops(!shops);
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
        adress: {},
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={param.region}
                />
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

            <StackHeader onpress={() => props.navigation.goBack()} inner={''} />
        </SafeAreaView>
    );
};

export default ServicesMap;
