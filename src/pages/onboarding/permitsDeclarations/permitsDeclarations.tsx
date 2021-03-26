import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';

import deepCopy from '../../../helpers/deepCopy';

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
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

interface Props {
    navigation: any,
};

const PermitsDeclarations: React.FC<Props> = (props: Props) => {

    const permits = I18n.t('Permits');
    interface staus { checked: boolean, wrong: boolean };
    let permitStatus: Array<staus> = [];

    permits.forEach(() => { permitStatus.push({ checked: false, wrong: false }) });

    const [status, setStatus] = useState(permitStatus);
    const [allPerm, setAllPerm] = useState(false);

    const handleChangeAllStatus = (val: boolean) => {
        setAllPerm(val)
        let newStatus = deepCopy(status);
        newStatus.forEach(e => e.checked = val);
        setStatus(newStatus);
    }

    const handleChangeStatus = (num: number, val: boolean) => {
        let newStatus = deepCopy(status);
        newStatus[num].checked = val;

        if (newStatus.some(e => !e.checked)) setAllPerm(false)
        if (newStatus.every(e => e.checked)) setAllPerm(true)

        setStatus(newStatus);
    }

    const hendlerGoFoward = () => {
        // if (perm_1 && perm_2 && perm_3) {

        // } else {
        let newStatus = deepCopy(status);
        newStatus.map(e => e.wrong = !e.checked);
        setStatus(newStatus);
        // }
    }

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',// wh - headHeight,
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
            top: getTopPx(11),
            marginBottom: headHeight
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(69)
        }
    })


    return (
        <SafeAreaView>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.text, { marginTop: getTop(50), fontSize: 30, color: '#313131' }]}>
                        {I18n.t('Permits-title')}
                    </Text>

                    <Text style={[styles.text, { marginTop: getTop(6), fontSize: 18, color: '#555555' }]}>
                        {I18n.t('Permits-text')}
                    </Text>

                    <OnePermit
                        checked={allPerm}
                        getCheck={(val: boolean) => handleChangeAllStatus(val)}
                        text={I18n.t('Permits-check-all')}
                        marginTop={getTopPx(31)}
                        navigation={props.navigation}
                    ></OnePermit>

                    {status.map((e: any, i: number) => (
                        <OnePermit
                            checked={e.checked}
                            wrong={permits[i].required && e.wrong}
                            getCheck={(val: boolean) => handleChangeStatus(i, val)}
                            text={permits[i].text}
                            marginTop={getTopPx(11)}
                            navigation={props.navigation}
                            key={'per_' + i}
                        ></OnePermit>
                    ))}

                    <View style={styles.btn}>
                        <BigRedBtn
                            title={I18n.t('Permits-btn')}
                            onpress={() => hendlerGoFoward()}
                        />
                    </View>

                    <View style={styles.spaceOnEnd}></View>

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