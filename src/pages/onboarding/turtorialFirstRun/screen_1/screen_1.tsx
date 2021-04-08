import React from "react";
import { StyleSheet,  View,  SafeAreaView, Text,  } from 'react-native';
import I18n from 'react-native-i18n';

import {
    getStandardPx,
    getPosAndWid,
    getHorizontalPx
} from '../../../../helpers/layoutFoo';

import BikeImg from './bikeImg';

const Screen_1 = () => {

    const trans = I18n.t('Onboarding');

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white" 
        },
        bigText: getPosAndWid(334, 102, 138),
        reg40: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: getHorizontalPx(40),
            textAlign: 'center',
            color: '#313131'
        },
        bikeImg: getStandardPx(310, 172, 325),
        regText: getStandardPx(334, 115, 596),
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(18),
            textAlign: 'center',
            color: '#555555'
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.bigText, styles.reg40]}>
                {trans.title_1}
            </Text>

            <View style={styles.bikeImg}>
                <BikeImg></BikeImg>
            </View>

            <Text style={[styles.regText, styles.light18]}>
                {trans.text_1}
            </Text>

        </SafeAreaView>
    )
}

export default Screen_1;