

import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber, getFrameNumber } from '../../../../store/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import DinLight30 from '../../../../sharedComponents/text/dinLight30';
import DinLight18 from '../../../../sharedComponents/text/dinLight18';
import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import TranspLightBtn from '../../../../sharedComponents/buttons/transpLightBtn';
import TypicalRedBtn from '../../../../sharedComponents/buttons/typicalRed';
import ImgKross from './imgKross';
import ImgOther from './imgOther';

import {
    initAppSize,
    setObjSize,
    getWidth,
    getHeight,
    getHeightPx,
    getTop,
    getTopPx,
    getCenterLeft,
    getPosAndWid,
    getPosWithMinHeight,
    getStandard,
} from '../../../../helpers/layoutFoo';



interface InfoProps {
    navigation: any
};

const Info: React.FC<InfoProps> = (props: InfoProps) => {

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
        bottons,
        title: getPosAndWid(334, 51, 138),
        svg: getStandard(334, 268, 209),
        text: getStandard(334, 200, 497),
    })

    return (
        <>
            <StackHeader
                onpress={() => props.navigation.navigate('AddingByNumber')}
                inner={I18n.t('AddingInfo-title')}
            ></StackHeader>

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

            <View style={styles.text}>
                <DinLight18
                    algin='left'
                    inner={krossBike ? I18n.t('AddingInfo-text-kross')
                        : I18n.t('AddingInfo-text-other')}
                ></DinLight18>
            </View>

        </>
    )
}

export default Info