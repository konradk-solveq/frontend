import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getHorizontalPx,
    getWidthOf,
    getFontSize,
} from '../../../helpers/layoutFoo';
import {BothStackRoute} from '../../../navigation/route';

import CheckBox from '../../../sharedComponents/checkBox/checkBox';

interface Props {
    // * wartości wymagane
    checked: boolean; // * zmiana wymsza zaznaczenie przez rodzica
    wrong: boolean; // * walidacja prze rodzica wyśle true wyświetli się wiadomość pod spodem, widomość pobierana z tłuaczeń
    getCheck: Function; // * zwrotka o zaznaczeiu dla rodzica
    text: string; // * tekst zgody
    info?: string; // dodatkowe informacje
    marginTop: number; // *
    navigation: any;
}

const OnePermit: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Permits');

    setObjSize(26, 26);
    const cbw = getWidthPx();
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
            width: '100%',
            marginTop: props.marginTop,
            marginBottom: getVerticalPx(11),
        },
        checkbox: {
            position: 'relative',
            width: cbw,
            height: cbw,
            // marginLeft: getHorizontalPx(40),
        },
        hyper: {
            position: 'relative',
            width: getWidthOf(283),
            marginLeft: getHorizontalPx(25),
            marginTop: getVerticalPx(3),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#555555',
        },
        info: {
            marginTop: getVerticalPx(25),
        },
        wrong: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            textAlign: 'left',
            color: '#d8232a',
            marginTop: getVerticalPx(11),
        },
    });

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
                    linkStyle={{color: '#3587ea'}}
                    linkText={(url: string) => {
                        if (url == trans.urlRegulations) {
                            return trans.hiperRegulations;
                        }
                        if (url == trans.urlPrivacyPolicy) {
                            return trans.hiperPrivacyPolicy;
                        }
                        return url;
                    }}
                    onPress={(url: string) => {
                        if (url == trans.urlRegulations) {
                            props.navigation.navigate(
                                BothStackRoute.REGULATIONS_SCREEN,
                            );
                        }
                        if (url == trans.urlPrivacyPolicy) {
                            props.navigation.navigate(
                                BothStackRoute.PRIVACY_POLICY_SCREEN,
                            );
                        }
                    }}>
                    <Text style={styles.text}>{props.text}</Text>
                </Hyperlink>

                {props.wrong && (
                    <Text style={styles.wrong}>
                        {props.wrong ? trans.wrong : ''}
                    </Text>
                )}

                {props.info && (
                    <Hyperlink
                        linkStyle={{color: '#3587ea'}}
                        linkText={(url: string) => {
                            if (url == trans.urlRegulations) {
                                return trans.hiperRegulations;
                            }
                            if (url == trans.urlPrivacyPolicy) {
                                return trans.hiperPrivacyPolicy;
                            }
                            return url;
                        }}
                        onPress={(url: string) => {
                            if (url == trans.urlRegulations) {
                                props.navigation.navigate(
                                    BothStackRoute.REGULATIONS_SCREEN,
                                );
                            }
                            if (url == trans.urlPrivacyPolicy) {
                                props.navigation.navigate(
                                    BothStackRoute.PRIVACY_POLICY_SCREEN,
                                );
                            }
                        }}>
                        <Text style={[styles.text, styles.info]}>
                            {props.info}
                        </Text>
                    </Hyperlink>
                )}
            </View>
        </View>
    );
};

export default OnePermit;
