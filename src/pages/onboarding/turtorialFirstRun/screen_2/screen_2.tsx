import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';

import {
    initAppSize,
    getStandard
} from '../../../../helpers/layoutFoo';

import DinReg from '../../../../sharedComponents/text/dinReg40'
import Dinight18 from '../../../../sharedComponents/text/dinLight18'


const Screen_2 = () => {
    initAppSize();

    let styles = StyleSheet.create({
        bigText: getStandard(334, 102, 138),
        regText: getStandard(334, 115, 596)
    })

    return (
        <>
            <View style={styles.bigText}>
                <DinReg inner='Poznaj swój rower!'></DinReg>
            </View>

            <View style={styles.regText}>
                <Dinight18
                    inner='Sed aliquam convallis scelerisque. Integer vitae ligula tempor, cursus odio in, hendrerit orci. Proin a scelerisque libero. Vestibulum nec scelerisque nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. '
                ></Dinight18>
            </View>
        </>
    )
}

export default Screen_2;