import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import { connect } from "react-redux";
import I18n from 'react-native-i18n';
import Image from 'react-native-remote-svg';

import { setUserName, getUserName } from '../../../../storage/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
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

    const trans = I18n.t('TurtorialNFC');

    initAppSize();

    const [userName, setUserName] = useState('');

    useEffect(() => { // do załadowania imienia z local storage przez reduxa
        props.getName();
        if (typeof props.name == 'string') {
            if (props.name == '') {
                setUserName(' ' + trans.defaultName);
            } else {
                setUserName(' ' + props.name);
            }
        }
    }, [props.name])


    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white" 
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
        nfc_bike: getStandard(334, 268, 246),
        text: getStandard(334, 115, 534),
        btnNfc: getStandard(334, 50, 701),
        btnHand: getStandard(334, 50, 781),
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.title, styles.light30]}>
                {trans.title_1 + userName + trans.title_2}
            </Text>

            <View style={styles.nfc_bike}>
                <Image
                    source={require('./nfc_bike.svg')}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            <Text style={[styles.text, styles.light18]}>
                {trans.tekst}
            </Text>

            <View style={styles.btnNfc}>
                <BigRedBtn
                    title={trans.btnNfc}
                ></BigRedBtn>
            </View>

            <View style={styles.btnHand}>
                <BigWhiteBtn
                    title={trans.btnHand}
                    onpress={() => props.navigation.navigate('AddingByNumber')}
                ></BigWhiteBtn>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('GetToKnowEachOther')}
                inner={trans.header}
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
