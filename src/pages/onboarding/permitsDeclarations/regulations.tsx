import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidth,
    getTop,
    getTopPx,
    getLeft,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader';

interface Props {
    navigation: any
};

const Regulations: React.FC<Props> = (props: Props) => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [headHeight, setheadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh - headHeight,
            top: headHeight,
        },
        text: {
            width: getWidth(),
            left: getLeft(40),
            textAlign: 'left',
        },
        reg23: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 23,
            color: '#313131'
        },
        reg18: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 18,
            color: '#555555'
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555'
        }
    })

    return (
        <SafeAreaView>

            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.text, styles.reg23, { marginTop: getTop(50) }]}>
                        {I18n.t('Regulations-title')}
                    </Text>

                    <Text style={[styles.text,styles.light18, { marginTop: getTop(15) }]}>
                        {I18n.t('Regulations-teks-1')}
                    </Text>

                    <Text style={[styles.text, styles.reg18, { marginTop: getTop(30) }]}>
                        {I18n.t('Regulations-paragraph-2')}
                    </Text>

                    <Text style={[styles.text,styles.light18, { marginTop: getTop(15) }]}>
                        {I18n.t('Regulations-teks-2')}
                    </Text>

                    <Text style={[styles.text, styles.reg18, { marginTop: getTop(53) }]}>
                        {I18n.t('Regulations-paragraph-3')}
                    </Text>

                    <Text style={[styles.text, styles.light18, { marginTop: getTop(15), marginBottom: getTopPx(100) }]}>
                        {I18n.t('Regulations-teks-3')}
                    </Text>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('PermitsDeclarations')}
                inner={I18n.t('Regulations-header')}
                getHeight={setheadHeightt}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default Regulations