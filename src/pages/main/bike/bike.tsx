import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const Bike: React.FC<Props> = (props: Props) => {

    // const trans = I18n.t('Profile').view;

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fdf5f5"
        },
        header: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getTopPx(65),
            fontFamily: "DIN2014Narrow-Light",
            textAlign: 'center',
            fontSize: 18,
            color: '#313131'
        },
        text: {
            top: -30,
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>Twój rower</Text>


            <Text style={styles.text}>Bike</Text>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}

export default Bike