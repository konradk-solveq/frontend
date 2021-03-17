//getToKnowEachOther
import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';

import {
    setAppSize,
    getStandard
} from '../../../helpers/layoutFoo';

import DinReg from '../../../sharedComponents/text/dinReg40'
import Dinight18 from '../../../sharedComponents/text/dinight18'



const GetToKnowEachOther = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    let styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white',
            // backgroundColor: 'red'
        },
    })

    return (
        <>
        </>
    )
}

export default GetToKnowEachOther;