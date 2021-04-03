import React from "react";
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface Props {
    source: string,
    style?: any,
};

const AnimSvg: React.FC<Props> = (props: Props) => {

    const styles = StyleSheet.create({
        fullView: {
            backgroundColor: "transparent",
            width: "100%",
            height: "100%"
        }
    })

    return (

        <View
            style={[styles.fullView, props.style]}
            pointerEvents="none"
        >
            <WebView
                style={styles.fullView}
                originWhitelist={['*']}
                scalesPageToFit={true}
                useWebKit={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                source={{
                    html: '<html><head><style>html,body,svg {margin:0;padding:0;height:100%;width:100%;overflow:hidden;background-color:transparent} svg{position:fixed}</style></head><body>' + props.source + '</body></html>'
                }}
            />
        </View>
    )
}

export default AnimSvg