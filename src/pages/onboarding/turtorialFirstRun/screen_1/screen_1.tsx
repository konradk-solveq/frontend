import React from "react";
import { StyleSheet,  View,  SafeAreaView, Text,  } from 'react-native';
import I18n from 'react-native-i18n';

import {
    initAppSize,
    getStandard,
    getPosAndWid
} from '../../../../helpers/layoutFoo';

import BikeImg from './bikeImg';

const Screen_1 = () => {
    initAppSize();

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        bigText: getPosAndWid(334, 102, 138),
        reg40: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            textAlign: 'center',
            color: '#313131'
        },
        bikeImg: getStandard(310, 172, 325),
        regText: getStandard(334, 115, 596),
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'center',
            color: '#555555'
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.bigText, styles.reg40]}>
                {I18n.t('Screen_1-title')}
            </Text>

            <View style={styles.bikeImg}>
                <BikeImg></BikeImg>
            </View>

            <Text style={[styles.regText, styles.light18]}>
                {I18n.t('Screen_1-text')}
            </Text>

        </SafeAreaView>
    )
}

export default Screen_1;