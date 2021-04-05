

import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Svg, { G, Path, Circle } from 'react-native-svg';

import { getStorageProfileSettings, setStorageProfileSettings } from '../../../storage/localStorage';

import VerticalHeader from './../../../sharedComponents/navi/verticalHeader/verticalHeader';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import RadioLine from './radioLine';

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
import deepCopy from "../../../helpers/deepCopy";


interface Props {
    navigation: any,
    // route: any,
};

const CyclingProfileSettings: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('Profile').settings;
    const lists = Object.keys(trans.lists);

    const view = I18n.t('Profile').view;
    const types = Object.keys(view.types);

    const initialData = () => { // dla pierwszego uruchomienia, gdy local storage jeśzcze nie ma tej zmiennej
        const profileData: any = {};

        lists.forEach((e: string) => profileData[e] = 0);

        const firtsProfileNumber = 0;
        profileData.profileNumber = firtsProfileNumber;
        profileData.name = types[firtsProfileNumber];

        return profileData;
    }

    const [dataSetting, setDataSetting] = useState({}); // dane poszczególnych pól

    const initActive = lists.map(() => -1); // aby nic nie było zaznaczoe zanim nie wczytają się dane
    const [active, setActive] = useState(initActive); // który element z listy jest aktywny

    const [memo, setMemo] = useState({}); // dla przycisku przywróć

    useEffect(() => { // pobranie danych z localsorage i zapamiętanie stanu dla opcji przywrócenia
        getStorageProfileSettings(initialData()).then(res => {
            setDataSetting(res)
            setMemo(res);

            const newActive = lists.map(e => res[e]);
            setActive(newActive);
        })
    }, [])

    const handleChangeData = (key: string, value: number) => { // dla zmiany wyboru na liscie
        let newData = deepCopy(dataSetting); 
        newData[key] = value;
        setDataSetting(newData)

        let newActive = [...active];
        let index = lists.indexOf(key);
        newActive[index] = value;
        setActive(newActive);
    }

    const handleGetDataBack = () => { // dla przycisku przywróć
        setDataSetting(memo);
        let newActive = lists.map(e => memo[e]);
        setActive(newActive);
    }

    const handleGoBackWithMemeo = () => {
        let newData = deepCopy(dataSetting);

        let countProfiles = [0, 0, 0];
        for (let i = 0; i < lists.length - 1; i++) { // zlicza które profile na listach zostały wybrane, poza ostatnią (mężczyna/kobieta)
            let key = lists[i];
            let profile = newData[key];
            countProfiles[profile]++
        }

        // rozwiązanie przygotowane dla więszej ilości profili
        let moreThanOneSameValue = false; // sprawdzenie czy kilka profili nie ma tej samej ilości wyborów
        let maxVal = Math.max(...countProfiles);
        let countMaxies = 0;
        countProfiles.forEach(e => { if (e == maxVal) countMaxies++ })
        if (countMaxies > 1) moreThanOneSameValue = true;

        let profNum: number = -1;
        if (moreThanOneSameValue) {
            let profiles: Array<number> = [];
            countProfiles.forEach((e, i) => { if (e == maxVal) profiles.push(i) })
            profNum = Math.floor(profiles.reduce((a, b) => a + b) / profiles.length);
        } else {
            countProfiles.forEach((e, i) => { if (e == maxVal) profNum = i })
        }
        newData.profileNumber = profNum;
        newData.name = types[profNum];

        setStorageProfileSettings(newData);
        props.navigation.navigate('CyclingProfileView', { profile: profNum })
    }

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(51, 51);
    const h = ww * (18.4 / 120.8);
    const w = getWidthPx();
    const headerBtn = {
        position: 'absolute',
        width: w,
        height: w,
        left: getCenterLeftPx(),
        top: h - (w / 2)
    };

    setObjSize(334, 50);
    const bottons = {
        position: 'relative',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getTopPx(29)
    }

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',
            top: 0,
            backgroundColor: "#fdfdfd"
        },
        headerBack: {
            width: ww,
            height: h,
            marginBottom: getTopPx(30)
        },
        headerBtn,
        reg23: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 23,
            color: '#313131',
            textAlign: 'left',
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginBottom: getTopPx(8)
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555',
            textAlign: 'left',
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginBottom: getTopPx(30)
        },
        list: {
            width: getWidth(),
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',

        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(65)
        },
    })

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={styles.scroll}>
                <ScrollView>

                    {/* <Svg style={styles.headerBack} viewBox="0 0 120.8 18.4">
                        <Path fill="#f2eaeb" d="M0 0h120.8v12s-25 6.3-59.7 6.3A287 287 0 010 12z" paint-order="markers fill stroke" />
                    </Svg>

                    <View style={styles.headerBtn}>
                        <TouchableWithoutFeedback
                            onPress={() => props.navigation.navigate('CyclingProfileView')}
                        >
                            <Svg viewBox="0 0 15.4 15.4" style={{ width: '100%', height: '100%' }}>
                                <G transform="translate(-107.1 -21.8)">
                                    <Circle cx="114.8" cy="29.5" r="7.6" fill="#fdfdfd" paint-order="markers fill stroke" />
                                    <Path fill="#313131" fill-rule="nonzero" d="M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z" />
                                </G>
                            </Svg>
                        </TouchableWithoutFeedback>
                    </View> */}

                    <VerticalHeader
                        onpress={() => props.navigation.navigate('CyclingProfileView')}
                    />

                    <Text style={styles.reg23}>
                        {trans.title}
                    </Text>

                    <Text style={styles.light18}>
                        {trans.text}
                    </Text>

                    {lists.map((e, i) => (
                        <RadioLine
                            name={trans.lists[e].name}
                            list={trans.lists[e].values}
                            getReult={(val: number) => { handleChangeData(e, val) }}
                            key={'list_' + i}
                            active={active[i]}
                        ></RadioLine>
                    ))}

                    <View style={styles.bottons}>
                        <View style={styles.btn}>
                            <BigWhiteBtn
                                title={trans.btnRestore}
                                onpress={() => handleGetDataBack()}
                            ></BigWhiteBtn>
                        </View>

                        <View style={styles.btn}>
                            <BigRedBtn
                                title={trans.btnChange}
                                onpress={() => handleGoBackWithMemeo()}
                            ></BigRedBtn>
                        </View>
                    </View>

                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default CyclingProfileSettings