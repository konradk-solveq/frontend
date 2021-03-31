

import React, { useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView,  View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";
import Image from 'react-native-remote-svg';


import { setFrameNumber, getFrameNumber } from '../../../storage/actions/index';

import StackHeader from '../../../sharedComponents/navi/stackHeader';
import BigWhiteBtn from '../../../sharedComponents/buttons/bigWhiteBtn';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';


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

const CyclingProfileView: React.FC<Props> = (props: Props) => {

    const trans = I18n.t('Profile').view;

    const [profilType, setProfilType] = useState('amateur'); // dane poszczególnych pól

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(315, 50);
    const w = getWidthPx();
    const h = w * (296 / 315);
    const image = {
        position: 'absolute',
        width: w,
        height: h,
        left: getCenterLeftPx(),
        top: getTopPx(253),
        // backgroundColor: 'khaki'
    }

    setObjSize(334, 50);
    let bottons = {
        position: 'absolute',
        width: getWidth(),
        height: getHeightPx() < 50 ? 50 : getHeightPx(),
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getTopPx(65)
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: "white"
        },

        light30: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            color: '#313131',
            textAlign: 'left',
            width: getWidth(),
            left: getCenterLeft(),
            top: getTopPx(138),

        },
        image,
        reg40: {
            position: 'absolute',
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#313131',
            textAlign: 'center',
            width: getWidthPx(),
            left:getCenterLeftPx(),
            top: getTopPx(253 + 20) + h,
        },
        light18: {
            position: 'absolute',
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555',
            textAlign: 'center',
            width: getWidthPx(),
            left:getCenterLeftPx(),
            top: getTopPx(253 + 76) + h,
        },
        bottons,
        btn: {
            width: getWidthPxOf(157),
        },
        spaceOnEnd: {
            width: '100%',
            height: getTopPx(65)
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.light30}>
                {trans.title}
            </Text>

            <Text style={styles.reg40}>
                {trans.types[profilType].name}
            </Text>

            <Text style={styles.light18}>
                {trans.types[profilType].description}
            </Text>

            <View style={styles.image}>
                {profilType == 'amateur' && <Image
                    source={require('./amatour_biker.svg')}
                    style={{ width: "100%", height: "100%" }}
                />}
                {profilType == 'city' && <Image
                    source={require('./city_biker.svg')}
                    style={{ width: "100%", height: "100%" }}
                />}
                {profilType == 'professional' && <Image
                    source={require('./advanced_biker.svg')}
                    style={{ width: "100%", height: "100%" }}
                />}
            </View>

            <View style={styles.bottons}>
                <View style={styles.btn}>
                    <BigWhiteBtn
                        title={trans.btnChange}
                        onpress={() => props.navigation.navigate('ProfileSettings')}
                    ></BigWhiteBtn>
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.btnSave}
                        onpress={() => {
                            // props.navigation.navigate('TurtorialNFC');
                        }}
                    ></BigRedBtn>
                </View>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('ProfileSettings')}
                inner={trans.header}
            ></StackHeader>

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

export default connect(mapStateToProps, mapDispatchToProps)(CyclingProfileView)