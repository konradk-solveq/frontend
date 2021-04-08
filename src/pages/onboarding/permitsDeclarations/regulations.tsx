import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';

interface Props {
    navigation: any
};

const wh = Dimensions.get('window').height;

const Regulations: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('Regulations');

    const [headHeight, setheadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh - headHeight,
            top: headHeight,
        },
        text: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            textAlign: 'left',
        },
        reg23: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: getHorizontalPx(23),
            color: '#313131'
        },
        reg18: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: getHorizontalPx(18),
            color: '#555555'
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(18),
            color: '#555555'
        }
    })

    return (
        <SafeAreaView>

            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.text, styles.reg23, { marginTop: getVerticalPx(50) }]}>
                        {trans.title}
                    </Text>

                    <Text style={[styles.text,styles.light18, { marginTop: getVerticalPx(15) }]}>
                        {trans.text_1}
                    </Text>

                    <Text style={[styles.text, styles.reg18, { marginTop: getVerticalPx(30) }]}>
                        {trans.paragraph_2}
                    </Text>

                    <Text style={[styles.text,styles.light18, { marginTop: getVerticalPx(15) }]}>
                        {trans.text_3}
                    </Text>

                    <Text style={[styles.text, styles.reg18, { marginTop: getVerticalPx(53) }]}>
                        {trans.paragraph_3}
                    </Text>

                    <Text style={[styles.text, styles.light18, { marginTop: getVerticalPx(15), marginBottom: getVerticalPx(100) }]}>
                        {trans.text_3}
                    </Text>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('PermitsDeclarations')}
                inner={trans.header}
                getHeight={setheadHeightt}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default Regulations