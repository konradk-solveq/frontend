

import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Svg, { G, Path, Circle } from 'react-native-svg';

import AnimSvg from '../../../helpers/animSvg';
import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../../helpers/layoutFoo';


interface Props {
    style?: any,
    onpress: Function
};

const VerticalHeader: React.FC<Props> = (props: Props) => {

    const background = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.8 40">
    <defs>
        <filter id="f1" x="-1" width="3" y="-1" height="3">
            <feGaussianBlur stdDeviation="10.752114"/>
        </filter>
        <filter id="f2" x="-1" width="3" y="-1" height="3">
            <feGaussianBlur stdDeviation="3.9484803"/>
        </filter>
        <clipPath id="clip">
            <path d="M0 0h120.8v12s-25 6.3-59.7 6.3A287 287 0 010 12z"/>
        </clipPath>
    </defs>
    <ellipse clip-path="url(#clip)" cx="60.4" cy="23.7" rx="59.2" ry="12.9" fill="#e8e8e8" stroke="none" filter="url(#f1)" transform="matrix(1.2848232,0,0,1.5017734,-16.467777,-12.342751)"/>
    <circle opacity=".3" cx="60.4" cy="17" r="9" fill="#c0c0c0" stroke="none" filter="url(#f2)" transform="matrix(1.5944672,0,0,1.5944672,-35.51012,-10.478387)" />
</svg>`;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(51, 51);
    const h = ww * (40 / 120.8);
    const w = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: (h*.8),
            // backgroundColor: "khaki",
        },
        headerBack: {
            position: 'absolute',
            width: ww,
            height: h,
            marginBottom: getTopPx(40)
        },
        headerBtn: {
            position: 'absolute',
            width: w,
            height: w,
            left: getCenterLeftPx(),
            top: (h * .40) - (w / 2)
        }
    })

    return (
        <View style={[styles.container, props.style]}>

            {/* <Svg style={styles.headerBack} viewBox="0 0 120.8 18.4">
                <Path fill="#f2eaeb" d="M0 0h120.8v12s-25 6.3-59.7 6.3A287 287 0 010 12z" />
            </Svg> */}

            <AnimSvg
                style={styles.headerBack}
                source={background}
            />

            <View style={styles.headerBtn}>
                <TouchableWithoutFeedback
                    onPress={() => props.onpress()}
                >
                    <Svg viewBox="0 0 15.4 15.4" style={{ width: '100%', height: '100%' }}>
                        <G transform="translate(-107.1 -21.8)">
                            <Circle cx="114.8" cy="29.5" r="7.6" fill="#fdfdfd" />
                            <Path fill="#313131" fill-rule="nonzero" d="M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z" />
                        </G>
                    </Svg>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

export default VerticalHeader