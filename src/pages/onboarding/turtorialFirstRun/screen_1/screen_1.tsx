import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';
import I18n from 'react-native-i18n';

import {
    initAppSize,
    getStandard,
    getPosAndWid
} from '../../../../helpers/layoutFoo';

import DinReg from '../../../../sharedComponents/text/dinReg40'
import Dinight18 from '../../../../sharedComponents/text/dinLight18'
import BikeImg from './bikeImg';



const Screen_1 = () => {
    initAppSize();

    let styles = StyleSheet.create({
        bigText: getPosAndWid(334, 102, 138),
        bikeImg: getStandard(310, 172, 325),
        regText: getStandard(334, 115, 596)
    })

    return (
        <>
            <View style={styles.bigText}>
                <DinReg inner={ I18n.t('Screen_1-title') }></DinReg>
            </View>

            <View style={styles.bikeImg}>
                <BikeImg></BikeImg>
            </View>

            <View style={styles.regText}>
                <Dinight18
                    inner={ I18n.t('Screen_1-text') }
                ></Dinight18>
            </View>
        </>
    )
}

export default Screen_1;