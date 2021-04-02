import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import Image from 'react-native-remote-svg';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getPerfectPx,
    getHeightPx,
    getTopPx,
    getWidthPx,
    getCenterLeftPx
} from '../../helpers/layoutFoo';


// <<--- #askBartosz (6) ? wiesz może czy da się podmienić strałkę goBack w headerze?
// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const TabBackGround = () => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);


    setObjSize(414, 107);


    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: ww,
            height: ww * (150/414),
            // backgroundColor: 'khaki'
        },

    })

    return (
        <View style={styles.container}>
            <Image
                source={require('./tabBackGround.svg')}
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    )
}

export default TabBackGround;