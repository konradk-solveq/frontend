

import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from "react-redux";
import Image from 'react-native-remote-svg';


import { getStorageProfileSettings, setStorageProfileSettings } from '../../../storage/localStorage';

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

interface Props {
    navigation: any,
    route: any,
};

const CyclingProfileView: React.FC<Props> = (props: Props) => {

    const settings = I18n.t('Profile').settings;
    const lists = Object.keys(settings.lists);

    const trans = I18n.t('Profile').view;
    const types = Object.keys(trans.types);

    const profiles = Object.keys(trans.types); // lista nazw profili
    const [profilType, setProfilType] = useState(profiles[0]); // dane poszczególnych pól

    useEffect(() => { // zmiana profilu po ustawieniach w settingsach
        props.route.params && (typeof props.route.params.profile != 'undefined') && setProfilType(profiles[props.route.params.profile])
    }, [props.route.params])

    const initialData = () => { // dla pierwszego uruchomienia, gdy local storage jeśzcze nie ma tej zmiennej
        const profileData: any = {};

        lists.forEach((e: string) => profileData[e] = 0);

        const firtsProfileNumber = 0;
        profileData.profileNumber = firtsProfileNumber;
        profileData.name = types[firtsProfileNumber];

        return profileData;
    }

    useEffect(() => { // pobranie danych z localsorage i zapamiętanie stanu dla opcji przywrócenia
        getStorageProfileSettings(initialData()).then(res => {
          if (res && res.name && typeof res.name == 'string')  setProfilType(res.name);
        })
    }, [])

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
            left: getCenterLeftPx(),
            top: getTopPx(253 + 20) + h,
        },
        light18: {
            position: 'absolute',
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            color: '#555555',
            textAlign: 'center',
            width: getWidthPx(),
            left: getCenterLeftPx(),
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
                        onpress={() => props.navigation.navigate('CyclingProfileSettings')}
                    ></BigWhiteBtn>
                </View>

                <View style={styles.btn}>
                    <BigRedBtn
                        title={trans.btnSave}
                        onpress={() => props.navigation.navigate('MineMenu')}
                    ></BigRedBtn>
                </View>
            </View>

            <StackHeader
                onpress={() => props.navigation.navigate('PermitsDeclarations')}
                inner={trans.header}
            ></StackHeader>

        </SafeAreaView>
    )
}

export default CyclingProfileView