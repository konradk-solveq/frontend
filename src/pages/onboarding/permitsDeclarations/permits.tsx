import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import I18n from 'react-native-i18n';
import Hyperlink from 'react-native-hyperlink';

import {
    setObjSize,
    getWidthPx,
    getHorizontalPx,
    getVerticalPx,
} from '../../../helpers/layoutFoo';

import StackHeader from '../../../sharedComponents/navi/stackHeader/stackHeader';
import OnePermit from './onePermit';
import BigRedBtn from '../../../sharedComponents/buttons/bigRedBtn';
import {fetchAppRegulations} from '../../../storage/actions/app';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

interface Props {
    navigation: any;
}

const wh = Dimensions.get('window').height;

const Permits: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const isOnline = useAppSelector<boolean>(state => !state.app.isOffline);

    const trans = I18n.t('Permits');

    const [checked, setChecked] = useState(false);
    const [wrong, setWrong] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const synchData = async () => {
        try {
            /* TODO: add some sync/info loader */
            await dispatch(fetchAppRegulations());
        } catch (error) {
            /* TODO: add some UI information */
            console.log('[Sync Error]', error);
        }
    };

    useEffect(() => {
        if (isOnline) {
            synchData();
        }
    }, [isOnline, synchData]);

    // po kliknięciu 'DALEJ', walidacja i przejście dalej
    const hendlerGoFoward = () => {
        if (checked) {
            props.navigation.navigate('GetToKnowEachOther');
            setWrong(false);
        } else {
            setWrong(true);
        }
    };

    const [headHeight, setHeadHeightt] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        scroll: {
            width: '100%',
            height: '100%',
            top: headHeight,
            backgroundColor: 'white',
        },
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            marginTop: getVerticalPx(50),
            fontSize: 30,
            color: '#313131',
        },

        text: {
            marginTop: getVerticalPx(14),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            color: '#555555',
        },
        clauseTitle: {
            marginTop: getVerticalPx(50),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: 18,
            color: '#313131',
        },
        clause: {
            marginTop: getVerticalPx(30),
            marginBottom: getVerticalPx(40),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 18,
            lineHeight: 24,
            color: '#555555',
        },
        btn: {
            width: getWidthPx(),
            height: 50,
            top: getVerticalPx(11),
            marginBottom: headHeight + getVerticalPx(69),
        },
    });

    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={styles.scroll}>
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
                                    props.navigation.navigate('Regulations');
                                }
                                if (url == trans.urlPrivacyPolicy) {
                                    props.navigation.navigate('PrivacyPolicy');
                                }
                            }}>
                            <Text style={styles.clause}>{trans.clause}</Text>
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
                onpress={() => props.navigation.navigate('NewBeginning')}
                inner={trans.header}
                getHeight={setHeadHeightt}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default Permits;
