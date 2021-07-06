import React from 'react';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Text,
    Platform,
} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import AnimSvg from '../../../helpers/animSvg';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import MapSvg from './mapSvg';

const line = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 256" width="412" height="256">
        <path d="M412 150c-53.5-53.8-82.8-63.2-88-28-7.8 52.8 49.5 27.5 48 86.4-1.5 59-169.3 52.7-250.5 29.1C15.5 220.8 80.5-20.8-2 2.1" stroke="#D8232A" fill="none" fill-rule="evenodd" stroke-dasharray="6 9" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" dur="100s" repeatCount="indefinite" values="0 ; 1000"/>
        </path>
    </svg>`;

const ww = Dimensions.get('window').width;

const World: React.FC = () => {
    const trans: any = I18n.t('MainWorld');

    const t = getVerticalPx(348);
    const h = ww * (202 / 400);
    const th = getVerticalPx(300);
    const tt =
        Platform.OS === 'ios'
            ? getVerticalPx(138)
            : t - (th + getVerticalPx(138));

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
        image: {
            position: 'absolute',
            width: ww,
            height: h + getVerticalPx(Platform.OS === 'ios' ? 100 : 60),
            top: t - getVerticalPx(50),
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVerticalPx(65),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(18),
            color: '#313131',
        },
        title: {
            position: 'absolute',
            width: getWidthPx(),
            height: th,
            top: tt,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(40),
            color: '#313131',
            textAlign: 'center',
            textAlignVertical: 'bottom',
            left: getCenterLeftPx(),
        },
        footer: {
            position: 'absolute',
            bottom: t - getVerticalPx(193),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(18),
            letterSpacing: 0.5,
            color: '#313131',
            textAlign: 'center',
            width: getWidthPx(),
            left: getCenterLeftPx(),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Świat Kross</Text>

            <AnimSvg style={styles.image} source={line} />
            <MapSvg />

            <Text style={styles.title}>{trans.title}</Text>

            <Text style={styles.footer}>{trans.footer}</Text>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default World;
