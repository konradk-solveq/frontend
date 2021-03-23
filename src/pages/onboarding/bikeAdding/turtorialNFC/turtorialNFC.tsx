import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { connect } from "react-redux";
import I18n from 'react-native-i18n';


import { setUserName, getUserName } from '../../../../store/actions/index';

import StackHeader from '../../../../sharedComponents/navi/stackHeader';
import DinLight18 from '../../../../sharedComponents/text/dinLight18';
import DinLight30 from '../../../../sharedComponents/text/dinLight30';
import B_ike from './imgBike';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import BigWhiteBtn from '../../../../sharedComponents/buttons/bigWhiteBtn';

import {
    initAppSize,
    getPosAndWid,
    getStandard
} from '../../../../helpers/layoutFoo';

interface TurtorialNFCProps {
    navigation: any,
    name: string,
    getName: Function
};

const TurtorialNFC: React.FC<TurtorialNFCProps> = (props: TurtorialNFCProps) => {

    initAppSize();

    const [userName, setUserName] = useState('');

    useEffect(() => {
        props.getName();
        if (typeof props.name == 'string') {
            if (props.name == '') {
                setUserName(' ' + I18n.t('TurtorialNFC-deafult-name') );
            }else {
                setUserName(' ' + props.name);
            }
        }
    }, [props.name])


    let styles = StyleSheet.create({
        title: getPosAndWid(334, 78, 138),
        b_ike: getStandard(334, 268, 246),
        text: getStandard(334, 115, 534),
        btnNfc: getStandard(334, 50, 701),
        btnHand: getStandard(334, 50, 781),
    })

    return (
        <>
            <StackHeader
                onpress={() => props.navigation.navigate('GetToKnowEachOther')}
                inner={I18n.t('TurtorialNFC-title')}
            ></StackHeader>

            <View style={styles.title}>
                <DinLight30
                    algin='left'
                    inner={I18n.t('TurtorialNFC-title-1') + userName + I18n.t('TurtorialNFC-title-2')}
                />
            </View>

            <View style={styles.b_ike}>
                <B_ike></B_ike>
            </View>

            <View style={styles.text}>
                <DinLight18
                    algin='left'
                    inner={I18n.t('TurtorialNFC-tekst')}
                ></DinLight18>
            </View>

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

        </>

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
