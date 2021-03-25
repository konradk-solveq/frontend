import React, { useEffect,  useState } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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

interface Props {
    check: boolean,
    getCheck: Function,
    text: string,
    marginTop: number,
    navigation: any
};

const OnePermit: React.FC<Props> = (props: Props) => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [checked, setChecked] = useState(false);
    const hendleChecked = () => {
        let newCheck = !checked;
        setChecked(newCheck)
        if (props.getCheck) props.getCheck(newCheck)
    }

    useEffect(() => { setChecked(props.check) }, [props.check])

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
            marginBottom: getTop(13),

        },
        checkbox,
        hyper,
        text:{
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'left',
            color: '#555555'
        }
    })

    return (
        <View style={styles.container}>
            <CheckBox
                style={styles.checkbox}
                value={checked}
                onValueChange={() => hendleChecked()}
                tintColors={{ true: '#d8232a', false: '#313131' }}
            />

            <Hyperlink style={styles.hyper}
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
        </View>
    )
}

export default OnePermit