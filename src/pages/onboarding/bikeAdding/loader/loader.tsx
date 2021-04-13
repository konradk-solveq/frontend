

import React from "react";
import { StyleSheet, Dimensions, View, SafeAreaView } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import AnimSvg from '../../../../helpers/animSvg';

import {
    setObjSize,
    getWidthPx,
    getHeightPx,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation?: any
};

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const Loader: React.FC<Props> = (props: Props) => {

    const loaderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 190">
    <defs>
        <clipPath id="clipPath">
            <polygon fill="red" points="">
                <animate attributeName="points" begin="0s" dur="3s" repeatCount="indefinite" values="95,95 95.00,-105.00 95.00,-105.00 95.00,-105.00 95.00,-105.00 95.00,-105.00  ; 95,95 95.00,-105.00 129.73,-101.96 163.40,-92.94 195.00,-78.21 223.56,-58.21  ; 95,95 95.00,-105.00 163.40,-92.94 223.56,-58.21 268.21,-5.00 291.96,60.27  ; 95,95 95.00,-105.00 195.00,-78.21 268.21,-5.00 295.00,95.00 268.21,195.00  ; 95,95 95.00,-105.00 223.56,-58.21 291.96,60.27 268.21,195.00 163.40,282.94  ; 95,95 95.00,-105.00 248.21,-33.56 291.96,129.73 195.00,268.21 26.60,282.94  ; 95,95 95.00,-105.00 268.21,-5.00 268.21,195.00 95.00,295.00 -78.21,195.00  ; 95,95 95.00,-105.00 282.94,26.60 223.56,248.21 -5.00,268.21 -101.96,60.27  ; 95,95 95.00,-105.00 291.96,60.27 163.40,282.94 -78.21,195.00 -33.56,-58.21  ; 95,95 95.00,-105.00 295.00,95.00 95.00,295.00 -105.00,95.00 95.00,-105.00  ; 95,95 212.56,-66.80 273.20,185.80 33.20,285.21 -102.54,63.71 95.00,-105.00  ; 95,95 285.21,33.20 212.56,256.80 -22.56,256.80 -95.21,33.20 95.00,-105.00  ; 95,95 285.21,156.80 126.29,292.54 -66.80,212.56 -83.20,4.20 95.00,-105.00  ; 95,95 212.56,256.80 33.20,285.21 -95.21,156.80 -66.80,-22.56 95.00,-105.00  ; 95,95 95.00,295.00 -46.42,236.42 -105.00,95.00 -46.42,-46.42 95.00,-105.00  ; 95,95 -22.56,256.80 -95.21,156.80 -95.21,33.20 -22.56,-66.80 95.00,-105.00  ; 95,95 -95.21,156.80 -102.54,63.71 -66.80,-22.56 4.20,-83.20 95.00,-105.00  ; 95,95 -95.21,33.20 -66.80,-22.56 -22.56,-66.80 33.20,-95.21 95.00,-105.00  ; 95,95 -22.56,-66.80 4.20,-83.20 33.20,-95.21 63.71,-102.54 95.00,-105.00  ; 95,95 95.00,-105.00 95.00,-105.00 95.00,-105.00 95.00,-105.00 95.00,-105.00 "></animate>
            </polygon>
        </clipPath>
    </defs>
    <circle id="c1" cx="95" cy="95" r="93" fill="none" stroke-dashoffset="10.25"
    stroke="#66555555" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-dasharray="9, 6">
    </circle>
    <circle id="c2" cx="95" cy="95" r="93" clip-path="url(#clipPath)"  fill="none" stroke-dashoffset="10.25"
    stroke= "#D8232A" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter" stroke-dasharray="9, 6" >
    </circle>
</svg>`;

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
        <SafeAreaView>
            <View style={{ backgroundColor: "#ffffff", width: "100%", height: "100%" }}>

                <AnimSvg style={styles.circle}
                    source={loaderSvg}
                />

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

            </View>
        </SafeAreaView >
    )
}

export default Loader