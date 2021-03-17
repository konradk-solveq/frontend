import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';

import {
    initAppSize,
    getStandard
} from '../../../../helpers/layoutFoo';

import DinReg from '../../../../sharedComponents/text/dinReg40'
import Dinight18 from '../../../../sharedComponents/text/dinLight18'
import BikeImg from './bikeImg';



const Screen_1 = () => {
    initAppSize();

    let styles = StyleSheet.create({
        bigText: getStandard(334, 102, 138),
        bikeImg: getStandard(310, 172, 325),
        regText: getStandard(334, 115, 596)
    })

    return (
        <>
            <View style={styles.bigText}>
                <DinReg inner='Jesteś gotowy, poznaj Świat Kross'></DinReg>
            </View>

            <View style={styles.bikeImg}>
                <BikeImg></BikeImg>
            </View>

            <View style={styles.regText}>
                <Dinight18
                    inner='Sed aliquam convallis scelerisque. Integer vitae ligula tempor, cursus odio in, hendrerit orci. Proin a scelerisque libero. Vestibulum nec scelerisque nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. '
                ></Dinight18>
            </View>
        </>
    )
}

export default Screen_1;