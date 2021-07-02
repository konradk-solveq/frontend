import React, {useRef, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {View, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

import gradient from './gradientSvg';

const {width} = Dimensions.get('window');

interface IProps {
    showGradient: boolean;
}

const CounterGradient: React.FC<IProps> = ({showGradient}: IProps) => {
    const gradientRef = useRef<WebView>(null);
    const gradientJs = (foo: string) => {
        if (gradientRef.current) {
            gradientRef.current.injectJavaScript(foo);
        }
    };

    useEffect(() => {
        if (showGradient) {
            gradientJs('show();true;');
            return;
        }
        gradientJs('hide();true;');
    }, [showGradient]);

    return (
        <View style={styles.gradient} pointerEvents="none">
            <WebView
                style={styles.fullView}
                originWhitelist={['*']}
                scalesPageToFit={true}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                source={{
                    html:
                        '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                        gradient +
                        '</body></html>',
                    baseUrl:
                        Platform.OS === 'ios' ? '' : 'file:///android_asset/',
                }}
                javaScriptEnabled={true}
                ref={gradientRef}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fullView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    gradient: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: width,
        height: width,
        top: 0,
        left: 0,
    },
});

export default CounterGradient;
