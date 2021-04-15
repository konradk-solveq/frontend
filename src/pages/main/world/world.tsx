import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import AnimSvg from '../../../helpers/animSvg';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any;
    route: any;
}

const ww = Dimensions.get('window').width;

const World: React.FC<Props> = (props: Props) => {
    const trans: any = I18n.t('MainWorld');

    const map = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 238">
    <defs/>
        <g fill="#76CE5A" fill-rule="nonzero">
            <path d="M59.428 93.025L0 76.708 0 197.262 59.428 105.476zM59.428 1.435L13.5 12.841C6.044 14.693 0 22.248 0 29.716V51.53l59.428 16.317V1.436zM232.5.343L155.969 17.63v116.892l11.586 3.441L246 18.568v-7.753c0-7.467-6.044-12.157-13.5-10.472zM246 161.264L246 39.919 179.292 141.45zM155.969 181.052V238l76.531-17.287c7.456-1.684 13.5-9.104 13.5-16.572v-17.698l-78.294-23.256-11.737 17.865zM0 218.613v4.43c0 7.467 6.044 12.02 13.5 10.168l45.928-11.405v-94.978L0 218.613z" transform="translate(-84 -342) translate(84 342)"/>
        </g>
        <g fill="#FFEECD" fill-rule="nonzero">
            <path d="M59.428 49.267L0 32.954 0 58.127 59.428 74.44zM59.428 86.888L0 178.654 0 200 59.428 108.235zM155.969 115.928L155.969 141.101 155.969 162.448 167.706 144.586 246 167.837 246 142.664 179.292 122.855 246 21.346 246 0 167.555 119.368z" transform="translate(-84 -342) translate(84 342) translate(0 19)"/>
        </g>
        <g fill="#2CBA3F" fill-rule="nonzero">
            <path d="M0 91.549L0 103.994 6.877 96.242zM20.037 80.053L79.6 12.906 0 0 0 66.381zM31.83 88.1L97 132.568 97 15.727 96.152 15.59zM52.855 228.843L97 236 97 179.077zM97 157.736L18.671 104.289 0 125.337 0 220.273 36.304 226.159z" transform="translate(-84 -342) translate(84 342) translate(59 1)"/>
        </g>
        <g fill="#ECD9B6" fill-rule="nonzero">
            <path d="M96.152 2.684L79.6 0 20.037 67.166 0 53.49 0 78.666 6.877 83.36 0 91.115 0 112.464 18.671 91.41 97 144.872 97 119.697 31.83 75.216zM52.855 216L97 166.22 97 144.872 36.304 213.316z" transform="translate(-84 -342) translate(84 342) translate(59 14)"/>
        </g>
        <g transform="translate(-84 -342) translate(84 342) translate(198 122)">
            <circle cx="21" cy="21" r="21" fill="#D8232A"/>
            <path fill="#FFF" fill-rule="nonzero" d="M21 11c2.661 0 5.052 1.245 6.561 3.417 1.504 2.164 1.854 4.9.932 7.324-.195.523-.495 1.042-.895 1.545l-.212.255L21 31l-6.39-7.463c-.504-.581-.875-1.185-1.105-1.802-.919-2.418-.57-5.154.934-7.318C15.948 12.245 18.339 11 21 11zm0 4.737c-1.94 0-3.517 1.577-3.517 3.518 0 1.94 1.577 3.517 3.517 3.517s3.518-1.577 3.518-3.517S22.94 15.737 21 15.737z"/>
        </g>
        <g transform="translate(-84 -342) translate(84 342) translate(8 36)">
            <circle cx="21" cy="21" r="21" fill="#D8232A"/>
            <path fill="#FFF" fill-rule="nonzero" d="M21 11c2.661 0 5.052 1.245 6.561 3.417 1.504 2.164 1.854 4.9.932 7.324-.195.523-.495 1.042-.895 1.545l-.212.255L21 31l-6.39-7.463c-.504-.581-.875-1.185-1.105-1.802-.919-2.418-.57-5.154.934-7.318C15.948 12.245 18.339 11 21 11zm0 4.737c-1.94 0-3.517 1.577-3.517 3.518 0 1.94 1.577 3.517 3.517 3.517s3.518-1.577 3.518-3.517S22.94 15.737 21 15.737z"/>
        </g>
        <g transform="translate(-84 -342) translate(84 342) translate(96 173)">
            <circle cx="21" cy="21" r="21" fill="#D8232A"/>
            <path fill="#FFF" fill-rule="nonzero" d="M21 11c2.661 0 5.052 1.245 6.561 3.417 1.504 2.164 1.854 4.9.932 7.324-.195.523-.495 1.042-.895 1.545l-.212.255L21 31l-6.39-7.463c-.504-.581-.875-1.185-1.105-1.802-.919-2.418-.57-5.154.934-7.318C15.948 12.245 18.339 11 21 11zm0 4.737c-1.94 0-3.517 1.577-3.517 3.518 0 1.94 1.577 3.517 3.517 3.517s3.518-1.577 3.518-3.517S22.94 15.737 21 15.737z"/>
        </g>
        <g transform="translate(-84 -342) translate(84 342) translate(102 84)">
            <circle cx="21" cy="21" r="21" fill="#D8232A"/>
            <path fill="#FFF" fill-rule="nonzero" d="M21 11c2.661 0 5.052 1.245 6.561 3.417 1.504 2.164 1.854 4.9.932 7.324-.195.523-.495 1.042-.895 1.545l-.212.255L21 31l-6.39-7.463c-.504-.581-.875-1.185-1.105-1.802-.919-2.418-.57-5.154.934-7.318C15.948 12.245 18.339 11 21 11zm0 4.737c-1.94 0-3.517 1.577-3.517 3.518 0 1.94 1.577 3.517 3.517 3.517s3.518-1.577 3.518-3.517S22.94 15.737 21 15.737z"/>
        </g>
    
        <path fill="none" stroke="#d8232a" stroke-dasharray="6 8" stroke-linecap="round" d="M-3.51 93.14c25.58-.3 52.63 3.88 84.7 28.71 32.04 24.82 60.31 43.8 91.3 53.09 30.98 9.3 92.75 15.9 126 6.4 33.26-9.5 44.62-24.47 47.4-32.95 2.77-8.47 6.86-22.71-16.07-33.96-19.1-9.36-35.22-12.18-58.3-19.72-23.08-7.54-34.1-39.08-2.57-51.4 41.16-16.1 95.78-27.43 152.25-35.23">
            <animate attributeName="stroke-dashoffset" dur="5s" repeatCount="indefinite" values="0 ; -140"/>
        </path>
</svg>`;

    const t = getVerticalPx(348);
    const h = ww * (202 / 400);
    const th = getVerticalPx(300);
    const tt = t - (th - getVerticalPx(21));

    setObjSize(246, 238);
    const image = {
        position: 'absolute',
        width: getWidthPx(),
        left: getCenterLeftPx(),
        top: getVerticalPx(342),

    };


    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        image,
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
            top: tt - 80,
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(40),
            color: '#313131',
            textAlign: 'center',
            textAlignVertical: 'bottom',
            left: getCenterLeftPx(),
        },
        text: {
            position: 'absolute',
            top: t + h + getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'center',
            width: getWidthPx(),
            left: getCenterLeftPx(),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Świat Kross</Text>

            <AnimSvg style={styles.image} source={map} />

            <Text style={styles.title}>{trans.title}</Text>

            <Text style={styles.text}>{trans.footer}</Text>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default World;
