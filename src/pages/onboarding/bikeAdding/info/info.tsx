

import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import ImgKross from './imgKross';
import ImgOther from './imgOther';

import {
    initAppSize,
    setObjSize,
    getWidthPx,
    getHeightPx,
    getTopPx,
    getCenterLeftPx,
    getPosAndWid,
    getStandardPx,
    getLeftPx
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any
};

const Info: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('AddingInfo')

    const [krossBike, setKrossBike] = useState(true);

    initAppSize();

    setObjSize(334, 41);
    const h = (410 * (270 / 334));
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white"
        },
        bottons: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            width: getWidthPx(),
            height: getTopPx(41),
            left: getCenterLeftPx(),
            marginTop: getTopPx(138),
        },
        // svg: getStandardPx(410, h, 209),
        svg: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            height: getWidthPx(334 * (270 / 334))
        },
        text: getStandardPx(334, 200, 497),
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getLeftPx(18),
            marginTop: getTopPx(44),
            marginBottom: getTopPx(100),
            color: '#555555'
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.bottons}>
                <TypicalRedBtn
                    title={trans.btnKross}
                    active={krossBike}
                    onpress={() => setKrossBike(true)}
                ></TypicalRedBtn>

                <TypicalRedBtn
                    title={trans.btnOther}
                    active={!krossBike}
                    onpress={() => setKrossBike(false)}
                ></TypicalRedBtn>
            </View>

            <View style={styles.svg}>
                {krossBike ? <ImgKross></ImgKross> : <ImgOther></ImgOther>}
            </View>

            <Text style={[styles.text, styles.light18]}>
                {krossBike ? trans.textKross
                    : trans.textOther}
            </Text>

            <StackHeader
                onpress={() => props.navigation.navigate('AddingByNumber')}
                inner={trans.head}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default Info