import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidth,
    getLeft,
    getTop,
    getTopPx,
    getHeightPx,
    getCenterLeft
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import OnePermit from './onePermit';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn'

interface Props {
    navigation: any
};

const PermitsDeclarations: React.FC<Props> = (props: Props) => {

    const [allPerm, setAllPerm] = useState(false);
    const [changeAll, setChangeAll] = useState(false);
    const [perm_1, setPerm_1] = useState(false);
    const [perm_2, setPerm_2] = useState(false);
    const [perm_3, setPerm_3] = useState(false);

    useEffect(() => {
        if (!changeAll) return;
        setPerm_1(allPerm);
        setPerm_2(allPerm);
        setPerm_3(allPerm);
    }, [allPerm])

    useEffect(() => {
        setChangeAll(false);
        if (perm_1 == false || perm_2 == false || perm_3 == false) setAllPerm(false)
        if (perm_1 == true && perm_2 == true && perm_3 == true) setAllPerm(true)
    }, [perm_1, perm_2, perm_3])

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [headHeight, setHeadHeightt] = useState(0);

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
            fontFamily: "DIN2014Narrow-Light",
            textAlign: 'left'
        },
        btn: {
            width: getWidth(),
            height: getHeightPx() < 50 ? 50 : getHeightPx(),
            left: getCenterLeft(),
            top: getTop(30),
            marginBottom: headHeight + getTopPx(56)
        }
    })

    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.text, { marginTop: getTop(50), fontSize: 30,color: '#313131' }]}>
                        {I18n.t('Permits-title')}
                    </Text>

                    <Text style={[styles.text, { marginTop: getTop(6), fontSize: 18,color: '#555555' }]}>
                        {I18n.t('Permits-text')}
                    </Text>

                    <OnePermit
                        check={allPerm}
                        getCheck={(val: boolean) => { setAllPerm(val); setChangeAll(true) }}
                        text='Zaznacz wszystkie'
                        marginTop={getTopPx(31)}
                        navigation={props.navigation}
                    ></OnePermit>

                    <OnePermit
                        check={perm_1}
                        getCheck={setPerm_1}
                        text={I18n.t('Permits-1')}
                        marginTop={getTopPx(41)}
                        navigation={props.navigation}
                    ></OnePermit>

                    <OnePermit
                        check={perm_2}
                        getCheck={setPerm_2}
                        text={I18n.t('Permits-2')}
                        marginTop={getTopPx(41)}
                        navigation={props.navigation}
                    ></OnePermit>

                    <OnePermit
                        check={perm_3}
                        getCheck={setPerm_3}
                        text={I18n.t('Permits-3')}
                        marginTop={getTopPx(41)}
                        navigation={props.navigation}
                    ></OnePermit>

                    <View style={styles.btn}>
                        <BigRedBtn
                            title={I18n.t('Permits-btn')}
                            onpress={() => { }}
                        />
                    </View>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('TurtorialNFC')}
                inner={I18n.t('Permits-header')}
                getHeight={setHeadHeightt}
            ></StackHeader>
        </SafeAreaView>
    )
}

export default PermitsDeclarations