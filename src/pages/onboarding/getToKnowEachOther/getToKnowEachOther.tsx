//getToKnowEachOther
import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidth,
    getTop,
    getRelativeHeight,
    getCenterLeft,
    getStandard
} from '../../../helpers/layoutFoo';

import KroosLogo from './krossLogo';
import DinLight30 from '../../../sharedComponents/text/dinLight30';
import DinLight18 from '../../../sharedComponents/text/dinLight18';



const GetToKnowEachOther = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);


    let styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white'
        },
        logo: getStandard(110, 20, 66),
        text: getStandard(334, 78, 138),
        placholder: getStandard(334, 23, 351)
    })

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <KroosLogo />
            </View>

            <View style={styles.text}>
                <DinLight30
                    algin='left'
                    inner={ I18n.t('GetToKnowEachOther-text') }
                />
            </View>

            <View style={styles.placholder}>
                <DinLight18
                    algin='left'
                    inner={ I18n.t('GetToKnowEachOther-placeholder') }
                ></DinLight18>
            </View>
        </View>
    )
}

export default GetToKnowEachOther;