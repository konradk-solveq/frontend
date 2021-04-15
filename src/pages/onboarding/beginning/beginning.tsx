import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

import source from './source';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getRelativeHeight,
    getCenterLeftPx,
} from '../../helpers/layoutFoo';

interface Props {
    navigation: any;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    fullView: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
    },
});

const Beginning: React.FC<Props> = (props: Props) => {
    // const [board, setBoard] = useState(0);

    const webviewRef = useRef(null);

    const onMessage = () => {
        props.navigation.navigate('PermitsDeclarations');
    };

    const baseUrl = Platform.OS === 'android' ? 'file:///android_asset' : '';

    const fontPath =
        Platform.OS === 'android' ? 'file:///android_asset/fonts/' : '';

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <WebView
                    style={styles.fullView}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    useWebKit={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    allowFileAccess
                    allowingReadAccessToURL={baseUrl}
                    allowUniversalAccessFromFileURLs
                    allowFileAccessFromFileURLs
                    mixedContentMode={'always'}
                    source={{uri: 'https://public.mykross.pw/src/beginning.html'}}
                    ref={webviewRef}
                    onMessage={onMessage}
                    // injectedJavaScript={runFirst}
                />
            </View>
        </SafeAreaView>
    );
};

export default Beginning;
