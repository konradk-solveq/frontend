import React, { useRef } from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

interface Props {
    source: string;
    style?: any;
    js?: any;
    animSvgRef?: any;
}

const AnimSvg: React.FC<Props> = (props: Props) => {
    const styles = StyleSheet.create({
        fullView: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
        },
    });


    return (
        <View style={props.style} pointerEvents="none">
            <View style={styles.fullView}>
                <WebView
                    style={styles.fullView}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    useWebKit={false}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    source={{
                        html:
                            '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html;  charset=utf-8"><meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" /><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' +
                            props.source +
                            '</body></html>',
                    }}
                    injectedJavaScript={props.js}
                    ref={props.animSvgRef}
                />
            </View>
        </View>
    );
};

export default AnimSvg;
