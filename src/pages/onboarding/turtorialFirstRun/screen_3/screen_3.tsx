import React from "react";
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import I18n from 'react-native-i18n';

import {
    initAppSize,
    getStandard
} from '../../../../helpers/layoutFoo';

const Screen_2 = () => {

    const trans = I18n.t('Onboarding');

    initAppSize();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white" 
        },
        bigText: getStandard(334, 102, 138),
        reg40: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            textAlign: 'center',
            color: '#313131'
        },
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
                {trans.title_3}
            </Text>

            <Text style={[styles.regText, styles.light18]}>
                {trans.text_3}
            </Text>

        </SafeAreaView>
    )
}

export default Screen_2;