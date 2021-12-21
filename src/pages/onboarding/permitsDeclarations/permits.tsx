import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions,
    StatusBar,
} from 'react-native';
import I18n from 'react-native-i18n';
import Hyperlink from 'react-native-hyperlink';

import {
    setObjSize,
    getWidthPx,
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
    mainButtonsHeight,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OnePermit from './onePermit';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import {BothStackRoute, OnboardingStackRoute} from '../../../navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Permits: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Permits');

    const [checked, setChecked] = useState(false);
    const [wrong, setWrong] = useState(false);

    // po kliknięciu 'DALEJ', walidacja i przejście dalej
    const hendlerGoFoward = () => {
        if (checked) {
            props.navigation.navigate(
                OnboardingStackRoute.GET_TO_KNOW_EACH_OTHER_SCREEN,
            );
            setWrong(false);
        } else {
            setWrong(true);
        }
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            marginTop: getVerticalPx(50),
            fontSize: getFontSize(30),
            color: '#313131',
        },

        text: {
            marginTop: getVerticalPx(14),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getFontSize(18),
            color: '#555555',
        },
        clauseTitle: {
            marginTop: getVerticalPx(50),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getFontSize(18),
            color: '#313131',
        },
        clause: {
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(40),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        btn: {
            width: getWidthPx(),
            height: mainButtonsHeight(50),
            top: getVerticalPx(11),
            marginBottom: getVerticalPx(69),
        },
    });

    return (
        <>
            <StatusBar hidden={false} />
            <SafeAreaView style={comStyle.container}>
                <View style={comStyle.scroll}>
                    <ScrollView>
                        <View style={styles.wrap}>
                            <Text style={styles.title}>{trans.title}</Text>

                            <Text style={styles.text}>{trans.text}</Text>

                            <OnePermit
                                checked={checked}
                                wrong={trans.permit.required && wrong}
                                getCheck={() => setChecked(!checked)}
                                text={trans.permit.text}
                                marginTop={getVerticalPx(66)}
                                navigation={props.navigation}
                            />

                            <Text style={styles.clauseTitle}>
                                {trans.clauseTitle}
                            </Text>

                            <Hyperlink
                                linkStyle={{color: '#3587ea'}}
                                linkText={(url: string) => {
                                    if (url === trans.urlRegulations) {
                                        return trans.hiperRegulations;
                                    }
                                    if (url === trans.urlPrivacyPolicy) {
                                        return trans.hiperPrivacyPolicy;
                                    }
                                    return url;
                                }}
                                onPress={(url: string) => {
                                    if (url === trans.urlRegulations) {
                                        props.navigation.navigate(
                                            BothStackRoute.REGULATIONS_SCREEN,
                                        );
                                    }
                                    if (url === trans.urlPrivacyPolicy) {
                                        props.navigation.navigate(
                                            BothStackRoute.PRIVACY_POLICY_SCREEN,
                                        );
                                    }
                                }}>
                                <Text style={styles.clause}>
                                    {trans.clause}
                                </Text>
                            </Hyperlink>

                            <BigRedBtn
                                style={styles.btn}
                                title={trans.btn}
                                onpress={() => hendlerGoFoward()}
                            />
                        </View>
                    </ScrollView>
                </View>

                <StackHeader
                    onpress={() =>
                        props.navigation.navigate(
                            OnboardingStackRoute.NEW_BEGINNING_SCREEN,
                        )
                    }
                    inner={trans.header}
                    style={{backgroundColor: '#fff'}}
                />
            </SafeAreaView>
        </>
    );
};

export default Permits;
