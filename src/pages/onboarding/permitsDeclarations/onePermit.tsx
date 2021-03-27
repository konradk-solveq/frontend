import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Hyperlink from 'react-native-hyperlink'
import I18n from 'react-native-i18n';

import {
    setAppSize,
    setObjSize,
    getWidthPx,
    getTop,
    getLeft,
    getWidthOf,
} from '../../../helpers/layoutFoo';

import CheckBox from '../../../sharedComponents/checkBox/checkBox';


interface Props {
    // * wartości wymagane
    checked: boolean, // * zmiana wymsza zaznaczenie przez rodzica
    wrong: boolean, // * walidacja prze rodzica wyśle true wyświetli się wiadomość pod spodem, widomość pobierana z tłuaczeń
    getCheck: Function, // * zwrotka o zaznaczeiu dla rodzica
    text: string, // * tekst zgody
    marginTop: number, // *
    navigation: any
};

const OnePermit: React.FC<Props> = (props: Props) => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(26, 26);
    const cbw = getWidthPx();
    const checkbox = {
        position: 'relative',
        width: cbw,
        height: cbw,
        marginLeft: getLeft(40),
    }

    const hyper = {
        position: 'relative',
        width: getWidthOf(283),
        marginLeft: getLeft(25),
        marginTop: getTop(3),

    }

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
            width: '100%',
            marginTop: props.marginTop,
            marginBottom: getTop(11),

        },
        checkbox,
        hyper,
        text: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'left',
            color: '#555555'
        },
        wrong: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 18,
            textAlign: 'left',
            color: '#d8232a',
            marginTop: getTop(11),

        }
    })

    return (
        <View style={styles.container}>

            <View style={styles.checkbox}>
                <CheckBox
                    checked={props.checked}
                    wrong={props.wrong}
                    getCheck={props.getCheck}
                />
            </View>

            <View style={styles.hyper}>
                <Hyperlink 
                    linkStyle={{ color: '#3587ea' }}
                    linkText={(url: string) => {
                        if (url == I18n.t('Permits-url-regulations')) return I18n.t('Permits-hiper-regulations');
                        if (url == I18n.t('Permits-url-privacy-policy')) return I18n.t('Permits-hiper-privacy-policy');
                        return url
                    }}
                    onPress={(e: string) => {
                        if (e == I18n.t('Permits-url-regulations')) props.navigation.navigate('Regulations');
                        if (e == I18n.t('Permits-url-privacy-policy')) props.navigation.navigate('PrivacyPolicy');
                    }}
                >
                    <Text style={styles.text}>
                        {props.text}
                    </Text>
                </Hyperlink>

                <Text style={styles.wrong}>
                    {props.wrong ? I18n.t('Permits-wrong') : ''}
                </Text>

            </View>
        </View>
    )
}

export default OnePermit