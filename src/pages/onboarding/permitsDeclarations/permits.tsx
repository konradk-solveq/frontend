import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import Hyperlink from 'react-native-hyperlink';

import {
    setObjSize,
    getWidthPx,
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import OnePermit from './onePermit';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import {BothStackRoute, OnboardingStackRoute} from '@navigation/route';
import {commonStyle as comStyle} from '@helpers/commonStyle';

interface Props {
    navigation: any;
}

const Permits: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('Permits');

    const [checked, setChecked] = useState(false);
    const [wrong, setWrong] = useState(false);

    // po kliknięciu 'DALEJ', walidacja i przejście dalej
    const handlerGoForward = () => {
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
                            <Text style={styles.title}>{t('title')}</Text>

                            <Text style={styles.text}>{t('text')}</Text>

                            <OnePermit
                                checked={checked}
                                wrong={
                                    Boolean(
                                        t('permit.required', {
                                            returnObjects: true,
                                        }),
                                    ) && wrong
                                }
                                getCheck={() => setChecked(!checked)}
                                text={t('permit.text')}
                                marginTop={getVerticalPx(66)}
                                navigation={props.navigation}
                            />

                            <Text style={styles.clauseTitle}>
                                {t('clauseTitle')}
                            </Text>

                            <Hyperlink
                                linkStyle={{color: '#3587ea'}}
                                linkText={(url: string) => {
                                    if (url === t('urlRegulations')) {
                                        return t('hiperRegulations');
                                    }
                                    if (url === t('urlPrivacyPolicy')) {
                                        return t('hiperPrivacyPolicy');
                                    }
                                    return url;
                                }}
                                onPress={(url: string) => {
                                    if (url === t('urlRegulations')) {
                                        props.navigation.navigate(
                                            BothStackRoute.REGULATIONS_SCREEN,
                                        );
                                    }
                                    if (url === t('urlPrivacyPolicy')) {
                                        props.navigation.navigate(
                                            BothStackRoute.PRIVACY_POLICY_SCREEN,
                                        );
                                    }
                                }}>
                                <Text style={styles.clause}>{t('clause')}</Text>
                            </Hyperlink>

                            <BigRedBtn
                                style={styles.btn}
                                title={t('btn')}
                                onpress={() => handlerGoForward()}
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
                    inner={t('header')}
                    style={{backgroundColor: '#fff'}}
                />
            </SafeAreaView>
        </>
    );
};

export default Permits;
