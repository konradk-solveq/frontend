import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import DeviceInfo from 'react-native-device-info';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import Bike_0 from './bike_0';
import Bike_1 from '@components/svg/bikes/bike_4';
import Bike_2 from '@components/svg/bikes/bike_5';
import Bike_3 from '@components/svg/bikes/bike_2';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
} from '@helpers/layoutFoo';
import {version} from '../../../../../package.json';
import {API_URL, ENVIRONMENT_TYPE} from '@env';
import {RouteDebugBtn} from '@sharedComponents/buttons';
import {commonStyle as comStyle} from '@helpers/commonStyle';
interface Props {
    navigation: any;
    route: any;
}

const getAppVersion = () => {
    const appBuildNumber = DeviceInfo.getBuildNumber();
    const serverVersion = API_URL.includes('.pre.') ? ' - serwer testowy' : '';
    const buildType = API_URL.includes('.pre.') ? ` - ${ENVIRONMENT_TYPE}` : '';

    return `${version} (${appBuildNumber}) ${buildType} ${serverVersion}`;
};

const AboutApp: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('AboutApp');

    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        scroll: {
            width: '100%',
            height: '100%',
            top: headHeight,
            backgroundColor: 'white',
        },
        wrap: {
            width: getWidthPx(),
            left: getHorizontalPx(40),
            marginBottom: getVerticalPx(65) + headHeight,
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            marginTop: getVerticalPx(30),
            fontSize: getFontSize(30),
            lineHeight: getFontSize(40),
            color: '#313131',
        },
        bike: {
            marginTop: getVerticalPx(31),
            width: getHorizontalPx(296),
            height: getHorizontalPx(296),
            left: getHorizontalPx(19),
        },

        text: {
            marginTop: getVerticalPx(30),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        nextLineText: {
            marginTop: getVerticalPx(15),
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        signature: {
            marginTop: getVerticalPx(45),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        nextLineSignature: {
            marginTop: getVerticalPx(15),
            fontFamily: 'DIN2014Narrow-Regular',
            textAlign: 'left',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(24),
            color: '#555555',
        },
        version: {
            marginTop: getVerticalPx(80),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(14),
            textAlign: 'left',
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={comStyle.container}>
            <View style={comStyle.scroll}>
                <ScrollView>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>{t('title')}</Text>

                        <Bike_0 style={styles.bike} />

                        <Text style={styles.text}>{t('text_1')}</Text>
                        <Text style={styles.nextLineText}>{t('text_1b')}</Text>

                        <Bike_1 style={styles.bike} />

                        <Text style={styles.text}>{t('text_2')}</Text>

                        <Bike_2 style={styles.bike} />

                        <Text style={styles.text}>{t('text_3')}</Text>

                        <Bike_3 style={styles.bike} />

                        <Text style={styles.text}>{t('text_4')}</Text>
                        <Text style={styles.nextLineText}>{t('text_4b')}</Text>

                        <Text style={styles.signature}>{t('signature_1')}</Text>
                        <Text style={styles.nextLineSignature}>
                            {t('signature_2')}
                        </Text>

                        <Text
                            style={
                                styles.version
                            }>{`v. ${getAppVersion()}`}</Text>

                        <RouteDebugBtn />
                    </View>
                </ScrollView>
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={t('header')}
                getHeight={setHeadHeight}
                style={{backgroundColor: '#fff'}}
            />
        </SafeAreaView>
    );
};

export default AboutApp;
