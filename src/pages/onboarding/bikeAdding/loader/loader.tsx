

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Animated, Easing } from 'react-native';
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg';
import { AnimatedSVGPath } from 'react-native-svg-animations'
import ImageSvg from 'react-native-remote-svg';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getWidth,
    getWidthPx,
    getHeight,
    getHeightPx,
    getTop,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
    getStandard,
} from '../../../../helpers/layoutFoo';



interface LoaderProps {
    navigation: any
};

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {


    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(192, 192);
    const cw = getWidthPx();
    const circle = {
        position: 'absolute',
        width: cw,
        height: cw,
        left: (ww - cw) / 2,
        top: ((wh - cw) / 2) - (wh * .03)
    }

    setObjSize(44, 34);
    const lw = getWidthPx();
    const lh = getHeightPx();
    const logo = {
        position: 'absolute',
        width: lw,
        height: lh,
        left: (ww - lw) / 2,
        top: ((wh - lh) / 2) - (wh * .03)

    }

    const styles = StyleSheet.create({
        circle,
        logo
    })

    return (
        <>
            <View style={styles.circle}>
                <ImageSvg
                    source={require('./loader.svg')}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            <View style={styles.logo}>
                <Svg viewBox="0 0 44 34">
                    <G fill="#D8232A" fillRule="evenodd">
                        <Path d="M27.59 21.29L38.285 7.507h-6.12c-.985 0-1.795.09-2.43.264-.63.181-1.168.404-1.608.668-.44.265-.817.557-1.131.884-.294.299-9.696 11.953-9.718 11.967l14.454 10.846c.314.174.636.362.95.55.314.195.692.369 1.132.529.44.16.978.285 1.614.396.635.105 1.439.154 2.424.154h6.126L27.59 21.29z"
                            transform="translate(-185 -431) translate(185 431)" />
                        <Path d="M12.095 21.304L28.589 0H21.56c-1.125 0-2.054.104-2.78.306-.727.202-1.342.46-1.852.758-.503.306-.936.64-1.3 1.016C15.295 2.428.29 21.29.276 21.31l10.06 7.536c.363.194.726.41 1.09.626.362.222.796.424 1.299.605.502.18 1.124.334 1.85.452.72.119 1.656.181 2.781.181h7.028l-12.288-9.406z"
                            transform="translate(-185 -431) translate(185 431)" />
                    </G>

                </Svg>
            </View>

        </>
    )
}

export default Loader