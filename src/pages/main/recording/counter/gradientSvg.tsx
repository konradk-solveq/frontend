import React from 'react';
import {StyleSheet, Dimensions, ViewStyle} from 'react-native';
import AnimSvg from '@helpers/animSvg';

const {width} = Dimensions.get('window');

const svg = `<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"

viewBox="0 0 414 414">
 <defs>
     <linearGradient
    id="gradient">
         <stop
      stop-color="#fff"
      stop-opacity="1"
      offset="0"/>
         <stop
      stop-color="#fff"
      stop-opacity="0"
      offset="1"/>
     </linearGradient>
     <linearGradient
    xlink:href="#gradient"
    id="gradient2"
    x1="0"
    y1="0"
    x2="0"
    y2="414"
    gradientUnits="userSpaceOnUse" />
 </defs>
 <rect
    fill="url(#gradient2)"
    stroke="none"
    width="414"
    height="414"
    x="0"
    y="0" />
</svg>`;

interface IProps {
    style?: any;
}

const GradientSvg: React.FC<IProps> = ({style}: IProps) => {
    const styles = StyleSheet.create({
        gradient: {
            position: 'absolute',
            width: width,
            height: width,
            top: 0,
            left: 0,
            zIndex: 1,
        },
    });

    return <AnimSvg source={svg} style={[styles.gradient, style]} />;
};

export default GradientSvg;
