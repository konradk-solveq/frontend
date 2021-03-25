import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import Image from './image';

import {
    initAppSize,
    getPosAndWid,
    getStandard,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any,
};

const WrongScan: React.FC<Props> = (props: Props) => {

    initAppSize();

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        title: getPosAndWid(334, 51, 138),
        reg40: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            textAlign: 'center',
            color: '#d8232a'
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'left',
            color: '#555555',
        },
        image: getStandard(414, 296, 219),
        text: getStandard(334, 174, 535),
        btnAgain: getStandard(334, 50, 781),
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, styles.reg40]}>
                {I18n.t('WrongScan-title')}
            </Text>

            <View style={styles.image}>
                <Image></Image>
            </View>

            <Text style={[styles.text, styles.light18]}>
                {I18n.t('WrongScan-tekst-1') + '4444444444' + I18n.t('WrongScan-tekst-2')}
            </Text>

            <View style={styles.btnAgain}>
                <BigRedBtn
                    title={I18n.t('WrongScan-btn-again')}
                ></BigRedBtn>
            </View>
        </SafeAreaView>
    )
}

export default WrongScan
