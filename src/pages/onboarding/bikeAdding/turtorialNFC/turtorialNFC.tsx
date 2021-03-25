import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { connect } from "react-redux";
import I18n from 'react-native-i18n';

import { setUserName, getUserName } from '../../../../store/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import ImgBike from './imgBike';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {
    initAppSize,
    getPosAndWid,
    getStandard
} from '../../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    name: string,
    getName: Function
};

const TurtorialNFC: React.FC<Props> = (props: Props) => {

    initAppSize();

    const [userName, setUserName] = useState('');

    useEffect(() => {
        props.getName();
        if (typeof props.name == 'string') {
            if (props.name == '') {
                setUserName(' ' + I18n.t('TurtorialNFC-deafult-name'));
            } else {
                setUserName(' ' + props.name);
            }
        }
    }, [props.name])


    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        title: getPosAndWid(334, 78, 138),
        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            color: '#313131',
            textAlign: 'left'
        },
        light18: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555',
            textAlign: 'left'
        },
        b_ike: getStandard(334, 268, 246),
        text: getStandard(334, 115, 534),
        btnNfc: getStandard(334, 50, 701),
        btnHand: getStandard(334, 50, 781),
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.title, styles.light30]}>
                {I18n.t('TurtorialNFC-title-1') + userName + I18n.t('TurtorialNFC-title-2')}
            </Text>

            <View style={styles.b_ike}>
                <ImgBike></ImgBike>
            </View>

            <Text style={[styles.text, styles.light18]}>
                {I18n.t('TurtorialNFC-tekst')}
            </Text>

            <View style={styles.btnNfc}>
                <BigRedBtn
                    title={I18n.t('TurtorialNFC-btn-nfc')}
                ></BigRedBtn>
            </View>

            <View style={styles.btnHand}>
                <BigWhiteBtn
                    title={I18n.t('TurtorialNFC-btn-hand')}
                    onpress={() => props.navigation.navigate('AddingByNumber')}
                ></BigWhiteBtn>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('GetToKnowEachOther')}
                inner={I18n.t('TurtorialNFC-title')}
            ></StackHeader>

        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        name: state.user.userName
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    setName: (name: string) => dispatch(setUserName(name)),
    getName: async () => dispatch(await getUserName()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TurtorialNFC)
