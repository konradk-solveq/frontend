import React from "react";
import { StyleSheet, Dimensions } from 'react-native';
import AnimSvg from '../../helpers/animSvg';

import {
    setObjSize,
} from '../../helpers/layoutFoo';

const ww = Dimensions.get('window').width;


// <<--- #askBartosz (6) ? wiesz może czy da się podmienić strałkę goBack w headerze?
// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const TabBackGround = () => {

    const tabBackGround = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 414 170">
    <defs>
      <filter id="a" width="151%" height="297.2%" x="-25.5%" y="-97.7%" filterUnits="objectBoundingBox">
        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="35"/>
        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.518513113 0 0 0 0 0.0483188295 0 0 0 0 0.0672953544 0 0 0 0.15 0"/>
      </filter>
      <path id="b" d="M0 0c66.44 14.67 135.18 22 206.2 22 71.03 0 140.3-7.33 207.8-22v107H0V0z"/>
    </defs>
    <g fill="none" fill-rule="evenodd" transform="translate(0 63)">
      <use fill="#000" filter="url(#a)" xlink:href="#b"/>
      <use fill="#FFF" xlink:href="#b"/>
    </g>
  </svg>
  `;

    setObjSize(414, 107);
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: ww,
            height: ww * (170 / 414),
            // backgroundColor: 'khaki'
        }
    })

    return (
        <AnimSvg
            source={tabBackGround}
            style={styles.container}
        />
    )
}

export default TabBackGround;