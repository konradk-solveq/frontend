import React from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Svg, {G, Path, Circle} from 'react-native-svg';

import AnimSvg from '../../helpers/animSvg';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    onPress: Function;
}

const {width} = Dimensions.get('window');

const background = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.8 40">
<defs>
    <filter id="f1" x="-1" width="3" y="-1" height="3">
        <feGaussianBlur stdDeviation="1.752114"/>
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

const ShowMoreArrowBtn: React.FC<Props> = (props: Props) => {
    setObjSize(51, 51);
    const h = width * (40 / 120.8);
    const w = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: h * 0.8,
        },
        background: {
            position: 'absolute',
            width: width,
            height: h,
            marginBottom: getVerticalPx(40),
        },
        button: {
            position: 'absolute',
            width: w,
            height: w,
            left: getCenterLeftPx(),
            top: h * 0.4 - w / 2,
        },
        btnContainer: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={[styles.container, props.style]}>
            <AnimSvg style={styles.background} source={background} />

            <View style={styles.button}>
                <TouchableWithoutFeedback onPress={() => props.onPress()}>
                    <Svg viewBox="0 0 15.4 15.4" style={styles.btnContainer}>
                        <G transform="translate(-107.1 -21.8)">
                            <Circle
                                cx="114.8"
                                cy="29.5"
                                r="7.6"
                                fill="#fdfdfd"
                            />
                            <Path
                                fill="#313131"
                                fill-rule="nonzero"
                                d="M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z"
                            />
                        </G>
                    </Svg>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default ShowMoreArrowBtn;
