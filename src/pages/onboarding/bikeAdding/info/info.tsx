

import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import ImgKross from './imgKross';
import ImgOther from './imgOther';

import {
    initAppSize,
    setObjSize,
    getWidth,
    getHeightPx,
    getTop,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getStandard,
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any
};

const Info: React.FC<Props> = (props: Props) => {

    const [krossBike, setKrossBike] = useState(true);

    initAppSize();

    setObjSize(334, 41);
    const h = getHeightPx();
    const bottons = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: getWidth(),
        height: h < 41 ? 41 : h,
        left: getCenterLeft(),
        top: getTop(138),
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        bottons,
        title: getPosAndWid(334, 51, 138),
        svg: getStandard(334, 268, 209),
        text: getStandard(334, 200, 497),
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            marginTop: getTop(44),
            marginBottom: getTopPx(100),
            color: '#555555'
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.bottons}>
                <TypicalRedBtn
                    title={I18n.t('AddingInfo-btn-kross')}
                    active={krossBike}
                    onpress={() => setKrossBike(true)}
                ></TypicalRedBtn>

                <TypicalRedBtn
                    title={I18n.t('AddingInfo-btn-other')}
                    active={!krossBike}
                    onpress={() => setKrossBike(false)}
                ></TypicalRedBtn>
            </View>

            <View style={styles.svg}>
                {krossBike ? <ImgKross></ImgKross> : <ImgOther></ImgOther>}
            </View>

            <Text style={[styles.text, styles.light18]}>
                {krossBike ? I18n.t('AddingInfo-text-kross')
                    : I18n.t('AddingInfo-text-other')}
            </Text>

            <StackHeader
                onpress={() => props.navigation.navigate('AddingByNumber')}
                inner={I18n.t('AddingInfo-title')}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default Info