import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, Easing, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidth,
    getTop,
    getTopPx,
    getLeft
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader';


interface Props {
    navigation: any
};

const PrivacyPolicy: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('PrivacyPolicy')

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
            textAlign: 'left'

        },
        reg23: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 23,
            marginTop: getTop(50),
            color: '#313131'
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            marginTop: getTop(44),
            marginBottom: getTopPx(100),
            color: '#555555'
        }
    })

    return (
        <SafeAreaView>

            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.text, styles.reg23]}>
                        {trans.title}
                    </Text>

                    <Text style={[styles.text, styles.light18]}>
                        {trans.text}
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

export default PrivacyPolicy