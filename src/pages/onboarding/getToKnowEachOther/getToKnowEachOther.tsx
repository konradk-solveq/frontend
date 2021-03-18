//getToKnowEachOther
import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Animated, SafeAreaView, Text, Alert } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidth,
    getWidthOf,
    getWidthPxOf,
    getHeightPx,
    getTop,
    getTopPx,
    getRelativeHeight,
    getCenterLeft,
    getStandard,
    getPosAndWid,
    getPosWithMinHeight,
    getPosStaticHeight
} from '../../../helpers/layoutFoo';

import KroosLogo from './krossLogo';
import DinLight30 from '../../../sharedComponents/text/dinLight30';
import DinLight18 from '../../../sharedComponents/text/dinLight18';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';


const GetToKnowEachOther = () => {
    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    let bottons = {
        position: 'absolute',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeft(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getTopPx(60)
    }

    let styles = StyleSheet.create({
        container: {
            width: ww,
            height: '100%',
            backgroundColor: 'white'
        },
        logo: getPosStaticHeight(110, 20, 66),
        text: getPosAndWid(334, 78, 138),
        inputAndPlaceholder: getPosWithMinHeight(334, 80, 380, 80),
        input: {
            height: 50,
            marginTop: 6,
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        }


    })

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <KroosLogo />
            </View>

            <View style={styles.text}>
                <DinLight30
                    algin='left'
                    inner={I18n.t('GetToKnowEachOther-text')}
                />
            </View>

            <View style={styles.inputAndPlaceholder}>
                <View style={styles.input}>
                    <OneLineTekst
                        placeholder={I18n.t('GetToKnowEachOther-placeholder')}
                    />
                </View>
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={I18n.t('GetToKnowEachOther-pomin')}
                    ></BigWhiteBtn>
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={I18n.t('GetToKnowEachOther-dalej')}
                    ></BigRedBtn>
                </View>
            </View>

        </View>
    )
}

export default GetToKnowEachOther;