

import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text, Alert} from 'react-native';
import I18n from 'react-native-i18n';
import {RiderProfile} from '../../../models/userRideProfile.model';
import {useAppSelector, useAppDispatch} from '../../../hooks/redux';
import {setProfileSettings} from '../../../storage/actions';

import VerticalHeader from './../../../sharedComponents/navi/verticalHeader/verticalHeader';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import RadioLine from './radioLine';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
    getHorizontalPx,
} from '../../../helpers/layoutFoo';
import deepCopy from '../../../helpers/deepCopy';


interface Props {
    navigation: any,
};

const initActiveState = (states: string[], data: any) => {
    return states.map(e => data[e]);
}

const CyclingProfileSettings: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const riderProfileData = useAppSelector<RiderProfile>(state => state.user.riderProfile);

    const trans = I18n.t('Profile').settings;
    const lists = Object.keys(trans.lists);

    const view = I18n.t('Profile').view;
    const types = Object.keys(view.types);

    const [dataSetting, setDataSetting] = useState<RiderProfile>(riderProfileData); // dane poszczególnych pól
    const [active, setActive] = useState(initActiveState(lists, riderProfileData)); // który element z listy jest aktywny

    const [memo] = useState(riderProfileData); // dla przycisku przywróć

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
        const newActive = lists.map(e => memo[e as keyof RiderProfile]);
        setActive(newActive);
    }

    const handleGoBackWithMemeo = async () => {
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

        try {
            await dispatch(setProfileSettings(newData));
            props.navigation.navigate('CyclingProfileView', {profile: profNum});
        } catch (error) {
            /* TODO: show toast/alert */
            console.log('[error -- cyclingProfileSettings]', error);
            const errorMessage = error?.errorMessage || error;
            Alert.alert('Error', errorMessage);
        }
    }

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',
            top: 0,
            backgroundColor: "#fdfdfd"
        },
        reg23: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: getHorizontalPx(23),
            color: '#313131',
            textAlign: 'left',
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(8)
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: getHorizontalPx(18),
            color: '#555555',
            textAlign: 'left',
            position: 'relative',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(30)
        },
        list: {
            width: getWidthPx(),
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',

        },
        bottons: {
            position: 'relative',
            width: getWidthPx(),
            height: getHeightPx(),
            left: getCenterLeftPx(),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: getVerticalPx(29)
        },
        btn: {
            width: getWidthPxOf(157),
        },
        spaceOnEnd: {
            width: '100%',
            height: getVerticalPx(65)
        },
    })

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={styles.scroll}>
                <ScrollView>

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