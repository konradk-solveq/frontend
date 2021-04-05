

import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { ScrollView } from 'react-native-gesture-handler';

import AnimSvg from '../../../../helpers/animSvg';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';

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
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const BikeParams: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('MainProfile');
    const params = props.route.params.description;
    console.log('%c params:', 'background: #ffcc00; color: #003300', params)

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(315, 50);
    const w = getWidthPx();
    const h = w * (296 / 315);
    const image = {
        position: 'absolute',
        width: w,
        height: h,
        left: getCenterLeftPx(),
        top: getTopPx(253),
        // backgroundColor: 'khaki'
    }

    setObjSize(334, 50);
    let bottons = {
        position: 'absolute',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getTopPx(65)
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white"
        },

        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            color: '#313131',
            textAlign: 'left',
            width: getWidth(),
            left: getCenterLeft(),
            top: getTopPx(138),

        },
        image,
        reg40: {
            position: 'absolute',
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getTopPx(253 + 20) + h,
        },
        light18: {
            position: 'absolute',
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555',
            textAlign: 'center',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getTopPx(253 + 76) + h,
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(65)
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.light30}>
                {trans.title}
            </Text>

            <View style={styles.btn}>
                <BigRedBtn
                    title={trans.btnAddStuff}
                    onpress={() => props.navigation.navigate('TabMenu')}
                ></BigRedBtn>
            </View>


            <StackHeader
                onpress={() => props.navigation.navigate('TabMenu')}
                inner={trans.header}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default BikeParams