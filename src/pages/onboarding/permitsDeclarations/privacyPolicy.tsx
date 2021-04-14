import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';


interface Props {
    navigation: any
};

const wh = Dimensions.get('window').height;

const PrivacyPolicy: React.FC<Props> = (props: Props) => {

    const trans: any = I18n.t('PrivacyPolicy')

    const [headHeight, setheadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: wh - headHeight,
            top: headHeight,
        },
        title: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            textAlign: 'left',
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 23,
            lineHeight: 30,
            marginTop: getVerticalPx(50),
            color: '#313131',
        },
        text: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            textAlign: 'left',
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            lineHeight: 24,
            marginTop: getVerticalPx(44),
            marginBottom: getVerticalPx(100),
            color: '#555555',
        }
    })

    return (
        <SafeAreaView>

            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={styles.title}>
                        {trans.title}
                    </Text>

                    <Text style={styles.text}>
                        {trans.text}
                    </Text>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('PermitsDeclarations')}
                inner={trans.header}
                getHeight={setheadHeight}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default PrivacyPolicy