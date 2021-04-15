import React, {ReactChild} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Svg from 'react-native-svg';

import AnimSvg from '../../helpers/animSvg';
import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    children?: ReactChild;
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

const Curve: React.FC<Props> = ({children, style}: Props) => {
    setObjSize(51, 51);
    const h = width * (40 / 120.8);
    const w = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: h * 0.7,
        },
        background: {
            position: 'absolute',
            width: width,
            height: h,
            marginBottom: getVerticalPx(40),
        },
        curveContainer: {
            position: 'absolute',
            width: w,
            height: w,
            left: getCenterLeftPx(),
            top: h * 0.4 - w / 2,
        },
        curve: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <View style={[styles.container, style]}>
            <AnimSvg style={styles.background} source={background} />

            <View style={styles.curveContainer}>
                <Svg viewBox="0 0 15.4 15.4" style={styles.curve}>
                    {children && children}
                </Svg>
            </View>
        </View>
    );
};

export default Curve;
