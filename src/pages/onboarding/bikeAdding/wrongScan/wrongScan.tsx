import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import I18n from 'react-native-i18n';


import { setUserName, getUserName } from '../../../../store/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import TopBackBtn from '../../../../sharedComponents/buttons/topBackBtn';
import DinLight18 from '../../../../sharedComponents/text/dinLight18';
import DinLight30 from '../../../../sharedComponents/text/dinLight30';
import DinReg40 from '../../../../sharedComponents/text/dinReg40';
import DinReg23 from '../../../../sharedComponents/text/dinReg23';

import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';
import Image from './image';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getWidth,
    getWidthPxOf,
    getHeightPx,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
    getPosStaticHeight,
    getStandard,
    getPerfect
} from '../../../../helpers/layoutFoo';

interface WrongScanProps {
    navigation: any,
};

const WrongScan: React.FC<WrongScanProps> = (props: WrongScanProps) => {

    initAppSize();

    let styles = StyleSheet.create({
        title: getPosAndWid(334, 51, 138),
        image: getStandard(414, 296, 219),
        text: getStandard(334, 174, 535),
        btnAgain: getStandard(334, 50, 781),
    })

    return (
        <>
            <View style={styles.title}>
                <DinReg40
                    inner={I18n.t('WrongScan-title')}
                    color='#d8232a'
                ></DinReg40>
            </View>

            <View style={styles.image}>
                <Image></Image>
            </View>

            <View style={styles.text}>
                <DinLight18
                    algin='left'
                    inner={I18n.t('WrongScan-tekst-1') + '4444444444' + I18n.t('WrongScan-tekst-2')}
                ></DinLight18>
            </View>

            <View style={styles.btnAgain}>
                <BigRedBtn
                    title={I18n.t('WrongScan-btn-again')}
                ></BigRedBtn>
            </View>
        </>

    )
}

export default WrongScan
