import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import TopBackBtn from './topBackBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getHeightPx,
    getHorizontalPx,
} from '../../../../../helpers/layoutFoo';
import { getStatusBarHeight } from '../../../../../utils/detectIOSDevice';
import AnimSvg from '../../../../../helpers/animSvg';

interface Props {
    // * wartości wymagane
    style?: any;
    onpress: Function; // po naciśnięciu strzałki
    inner: string; // nazwa headera
    getHeight?: (height: number) => void; // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
    pause: boolean;
}

const background = `
<script>
const body = document.querySelector('body');
const getSVGelem = type => document.createElementNS('http://www.w3.org/2000/svg', type);
const data = {};

let showed = false;

const show = (w, h) => {
    data.w = w;
    data.h = h;
    data.hs = (60 / 116) * h;

    let svg = getSVGelem('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    body.append(svg);

    let path = getSVGelem('path');
    path.setAttribute('fill', '#D8232A');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', '');
    svg.append(path);

    let animate = getSVGelem('animate');
    animate.setAttribute('id', 'shape');
    animate.setAttribute('attributeName', 'd');
    animate.setAttribute('dur', '1.1s');
    animate.setAttribute('repeatCount', '1');
    animate.setAttribute('fill', 'freeze');
    data.h2 = (94 / 116) * h;
    data.cw = 414 / 2;
    data.w2 = (81 / 414) * w;
    let values = 'M 0,0 ' + data.w + ',0 ' + data.w + ',0' +
        ' C ' + data.w + ',0 ' + (data.w - data.w2) + ',0 ' + data.cw + ',0' +
        ' C ' + data.w2 + ',0 0,0 0,0 Z ; ' +
        'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z';

    animate.setAttribute('values', values);
    path.append(animate);

    let animate2 = getSVGelem('animate');
    animate2.setAttribute('id', 'color');
    animate2.setAttribute('attributeName', 'fill');
    animate2.setAttribute('dur', '1.1s');
    animate2.setAttribute('repeatCount', '1');
    animate2.setAttribute('fill', 'freeze');
    animate2.setAttribute('values', '#ffffff ; #D8232A');
    path.append(animate2);

    setTimeout(() => {
        showed = true;
    }, 1100);
}

const setPauseOn = () => {
    if (!showed) return;
    let shape = document.getElementById('shape');
    let values = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z ; ' +
        'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
        ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
        ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z'
    shape.setAttribute('values', values);
    shape.setAttribute('dur', '0.4s');
    shape.beginElement();

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    color.setAttribute('values', '#D8232A ; #F3A805');
    color.beginElement();
}

const setPauseOff = () => {
    if (!showed) return;
    let shape = document.getElementById('shape');
    let values = 'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.hs +
        ' C ' + data.w + ',' + data.hs + ' ' + (data.w - data.w2) + ',' + data.hs + ' ' + data.cw + ',' + data.hs + '' +
        ' C ' + data.w2 + ',' + data.hs + ' 0,' + data.hs + ' 0,' + data.hs + ' Z ; ' +
        'M 0,0 ' + data.w + ',0 ' + data.w + ',' + data.h2 +
        ' C ' + data.w + ',' + data.h2 + ' ' + (data.w - data.w2) + ',' + data.h + ' ' + data.cw + ',' + data.h +
        ' C ' + data.w2 + ',' + data.h + ' 0,' + data.h2 + ' 0,' + data.h2 + ' Z'
    shape.setAttribute('values', values);
    shape.setAttribute('dur', '0.4s');
    shape.beginElement();

    let color = document.getElementById('color');
    color.setAttribute('dur', '0.4s');
    color.setAttribute('values', '#F3A805 ; #D8232A');
    color.beginElement();
}
</script>
`;

// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = (props: Props) => {
    const [height, setHeight] = useState(getVerticalPx(100));

    const getHeight = useCallback(async () => {
        if (props.getHeight) {
            const statusBarHeight = await getStatusBarHeight(
                Platform.OS === 'android',
            );
            props.getHeight(height - statusBarHeight);
        }
    }, []);

    useEffect(() => {
        getHeight();
    }, [getHeight]);

    setObjSize(414, 34);
    const wrap = {
        position: 'absolute',
        left: 0,
        top: height * 0.61,
        width: getHorizontalPx(414),
        height: getHeightPx(),
    };

    setObjSize(226, 23);
    const title = {
        position: 'absolute',
        width: getWidthPx(),
        left: getCenterLeftPx(),
        top: getVerticalPx(3 - 28),
        fontFamily: 'DIN2014Narrow-Light',
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
    };

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: height,
        },
        wrap,
        title,
        background: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: getHorizontalPx(414),
            height: getVerticalPx(116),
        },
        fullView: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
        },
    });

    const animSvgRef = useRef();

    useEffect(() => {
        animSvgRef.current.injectJavaScript(
            'show(' +
            getHorizontalPx(414) +
            ', ' +
            getVerticalPx(116) +
            ');true;',
        );
    }, []);

    useEffect(() => {
        if (props.pause) {
            animSvgRef.current.injectJavaScript('setPauseOn();true;');
        } else {
            animSvgRef.current.injectJavaScript('setPauseOff();true;');
        }
    }, [props.pause])

    return (
        <View style={[styles.container, props.style]}>
            {/* <AnimSvg style={styles.background} source={background} /> */}

            <View style={styles.background} pointerEvents="none">
                <View style={styles.fullView}>
                    <WebView
                        style={styles.fullView}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={true}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        source={{
                            html:
                                '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                                background +
                                '</body></html>',
                        }}
                        javaScriptEnabled={true}
                        ref={animSvgRef}
                    />
                </View>
            </View>

            <View style={styles.wrap}>
                <TopBackBtn
                    // style={styles.topBtn}
                    // onpress={() => props.onpress()}
                    onpress={() => {}}
                    color={props.pause ? '#000' : '#fff'}
                    animSvgRef={animSvgRef}
                />

                <Text style={styles.title}>{props.inner}</Text>
            </View>
        </View>
    );
};

export default StackHeader;
