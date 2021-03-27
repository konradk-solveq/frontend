// @flow

import React, { useEffect, useState, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import deepCopy from './deepCopy';
const fetch = require('node-fetch');




interface Props {
    source: any,
    onLoadStart: Function,
    onLoadEnd: Function,
    style: any,
    containerStyle: any,
}


const SvgImage: React.FC<Props> = (props: Props) => {
    const [fetchingUrl, setFetchingUrl] = useState(null);
    const [svgContent, setSvgContent] = useState(null);
    const [source, setSource] = useState(null);

    const getHTML = (svgContent: string, style: any) => `
<html data-key="key-${style.height}-${style.width}">
  <head>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: transparent;
      }
      svg {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    ${svgContent}
  </body>
</html>
`;

    useEffect(() => {
        setSource(deepCopy(props.source));
        doFetch(props.source);
    }, [])

    useEffect(() => {
        const nextUri = props.source && props.source.uri;

        if (nextUri && source !== nextUri) {
            setSource(deepCopy(props.source));
            doFetch(props.source);
        }
    }, [props.source])
    
    const doFetch = async (source: any) => {
        console.log('%c props:', 'background: #ffcc00; color: #003300', props)
        let uri = source && source.uri;
        if (uri) {
            props.onLoadStart && props.onLoadStart();
            if (uri.match(/^data:image\/svg/)) {
                const index = uri.indexOf('<svg');
                console.log('%c index:', 'background: #ffcc00; color: #003300', index)
                setFetchingUrl(uri);
                setSvgContent(uri.slice(index));
            } else {
                try {
                    const res = await fetch(uri);
                    const text = await res.text();
                    setFetchingUrl(uri);
                    setSvgContent(text);
                } catch (err) {
                    console.error('got error', err);
                }
            }
            props.onLoadEnd && props.onLoadEnd();
        }
    };

    // const flattenedStyle = StyleSheet.flatten(props.style) || {};
    // const html = getHTML(svgContent, flattenedStyle);
    return (
        <>
            {svgContent ?
                <View pointerEvents="none" style={[props.style, props.containerStyle]} >
                    <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        useWebKit={false}
                        style={[
                            {
                                width: 200,
                                height: 100,
                                backgroundColor: 'transparent',
                            },
                            props.style,
                        ]}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        source={() => getHTML(svgContent, StyleSheet.flatten(props.style) || {})}
                    />
                </View >
                :
                <View
                    pointerEvents="none"
                    style={[props.containerStyle, props.style]}
                />
            }
        </>
    )
}

export default SvgImage;
