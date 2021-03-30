

import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";
import Svg, { G, Path, Circle } from 'react-native-svg';


import { setFrameNumber, getFrameNumber } from '../../../storage/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import RadioLine from './radioLine';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getCenterTop,
    getLeft,
    getTop,
    getTopPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfect,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight
} from '../../../helpers/layoutFoo';
import deepCopy from "../../../helpers/deepCopy";

interface Data {
    cyclingStyle: number,
    tours: number,
    whereDoYouGo: number,
    drivingSpeed: number,
    distancePerMonth: number
    whoAreYou: number
};

interface Props {
    navigation: any,
    route: any,
    setProfileData: Function,
    getProfileData: Function,
    profileData: Data,
};

const ProfileSettings: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('Profile').settings;

    const lists = Object.keys(trans.lists);
    console.log('%c lists:', 'background: #ffcc00; color: #003300', lists)
    let startData: Data = {
        cyclingStyle: 0,
        tours: 0,
        whereDoYouGo: 0,
        drivingSpeed: 0,
        distancePerMonth: 0,
        whoAreYou: 0
    }

    const [data, setData] = useState(startData); // dane poszczególnych pól

    const handleChangeData = (key: string, value: number) => {
        let newData = deepCopy(data);
        newData[key] = value;
        setData(newData);
        console.log('%c newData:', newData)
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
        },
        title: {
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTop(45),
            marginBottom: getTop(30)
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

                    <Svg style={styles.headerBack} viewBox="0 0 120.8 18.4">
                        <Path fill="#f2eaeb" d="M0 0h120.8v12s-25 6.3-59.7 6.3A287 287 0 010 12z" paint-order="markers fill stroke" />
                    </Svg>

                    <View style={styles.headerBtn}>
                        <TouchableWithoutFeedback 
                            onPress={() =>props.navigation.navigate('ViewSettings')}
                        >
                            <Svg viewBox="0 0 15.4 15.4" style={{ width: '100%', height: '100%' }}>
                                <G transform="translate(-107.1 -21.8)">
                                    <Circle cx="114.8" cy="29.5" r="7.6" fill="#fdfdfd" paint-order="markers fill stroke" />
                                    <Path fill="#313131" fill-rule="nonzero" d="M116.7 28.7a.3.3 0 00-.4 0l-1.5 1.5-1.4-1.5a.3.3 0 00-.5.4l1.7 1.7c.2.1.3.1.4 0l1.7-1.7c.1-.1.1-.3 0-.4z" />
                                </G>
                            </Svg>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.title}>
                        <Text style={styles.reg23}>
                            {trans.title}
                        </Text>
                    </View>

                    {lists.map((e, i) => (
                        <RadioLine
                            name={trans.lists[e].name}
                            list={trans.lists[e].values}
                            getReult={(val: number) => { handleChangeData(e, val) }}
                            key={'list_' + i}
                        ></RadioLine>
                    ))}

                    <View style={styles.bottons}>
                        <View style={styles.btn}>
                            <BigWhiteBtn
                                title={trans.btnRestore}
                                onpress={() => {
                                    // props.navigation.navigate('TurtorialNFC')
                                }}
                            ></BigWhiteBtn>
                        </View>

                        <View style={styles.btn}>
                            <BigRedBtn
                                title={trans.btnChange}
                                onpress={() => {
                                    // props.navigation.navigate('TurtorialNFC');
                                }}
                            ></BigRedBtn>
                        </View>
                    </View>

                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        frame: state.user.frameNumber
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setFrame: (num: string) => dispatch(setFrameNumber(num)),
    getFrame: async () => dispatch(await getFrameNumber()),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)