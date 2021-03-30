

import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";

import { setFrameNumber, getFrameNumber } from '../../../storage/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import OneLineTekst from '../../../sharedComponents/inputs/oneLineTekst';
import ListInputBtn from '../../../sharedComponents/inputs/listInputBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';

import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getTop,
    getTopPx,
    getWidth,
    getHeightPx,
} from '../../../helpers/layoutFoo';
import deepCopy from "../../../helpers/deepCopy";

interface Data {
    frameNumber: string,
    producer: string,
    model: string,
    size: string,
    color: string
};

interface Props {
    navigation: any,
    route: any,
    setProfileData: Function,
    getProfileData: Function,
    profileData: Data,
};

const ProfileSettings: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('BikeData');

    let startData: Data = {
        frameNumber: '',
        producer: '',
        model: '',
        size: '',
        color: ''
    }

    const [data, setData] = useState(startData); // dane poszczególnych pól
    const [messages, setMessages] = useState(startData); // widomości przy wilidaci po wciśnięciu 'DALEJ'
    const [canGoFoward, setCanGoFoward] = useState({ // sant poprawności danych w komponencie
        frameNumber: false,
        producer: false,
        model: false,
        size: false,
        color: false
    });




    const [headHeight, setHeadHeightt] = useState(0);

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',//wh - headHeight,
            top: headHeight,
        },
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            color: '#555555',
            textAlign: 'left',
        },
        title: {
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTop(45),
            marginBottom: getTop(30)
        },
        inputAndPlaceholder: {
            position: 'relative',
            width: getWidth(),
            left: getCenterLeft(),
            marginTop: getTop(10)
        },
        botton: {
            width: getWidth(),
            height: getHeightPx() < 50 ? 50 : getHeightPx(),
            left: getCenterLeft(),
            marginTop: getTopPx(10) < 10 ? 10 : getTopPx(10),
            marginBottom: headHeight
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(65)
        }
    })

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={styles.scroll}>
                <ScrollView>

                    <Text style={[styles.title, styles.light30]}>
                        {trans.title}
                    </Text>


                    <View style={styles.botton}>
                        <BigRedBtn
                            title={trans.btn}
                            onpress={() => hendleGoFoward()}
                        ></BigRedBtn>
                    </View>

                    <View style={styles.spaceOnEnd}></View>

                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={trans.header}
                getHeight={setHeadHeightt}
            ></StackHeader>
        </SafeAreaView>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)