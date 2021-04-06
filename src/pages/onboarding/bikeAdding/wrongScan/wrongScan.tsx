import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import Image from './image';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getTopPx,
    getWidthPx,
    getStandard,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any,
};

const WrongScan: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('WrongScan');

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const imgH = ww * (296 / 414);
    setObjSize(334, 51);
    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white"
        },
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            bottom: getTopPx(381 + 30) + imgH
        },
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
        image: {
            position: 'absolute',
            width: ww,
            height: imgH,
            bottom: getTopPx(381),
        },
        text: getStandard(334, 174, 535),
        btnAgain: getStandard(334, 50, 781),
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.image}>
                <Image></Image>
            </View>

            <Text style={[styles.title, styles.reg40]}>
                {trans.title}
            </Text>

            <Text style={[styles.text, styles.light18]}>
                {trans.text_1 + '4444444444' + trans.text_2}
            </Text>

            <View style={styles.btnAgain}>
                <BigRedBtn
                    title={trans.btnAgain}
                ></BigRedBtn>
            </View>

        </SafeAreaView>
    )
}

export default WrongScan
