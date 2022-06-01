import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import DeviceInfo from 'react-native-device-info';

import Bike_1 from '@src/components/svg/bikes/bike_1';
import Bike_2 from '@components/svg/bikes/bike_2';
import Bike_3 from '@components/svg/bikes/bike_3';

import {version} from '../../../../../package.json';
import {API_URL, ENVIRONMENT_TYPE} from '@env';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import GenericScreen from '@src/pages/template/GenericScreen';
import {Header1, Header3, Paragraph} from '@components/texts/texts';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import {RouteDebugBtn} from '@src/sharedComponents/buttons';

const getAppVersion = () => {
    const appBuildNumber = DeviceInfo.getBuildNumber();
    const serverVersion = API_URL.includes('.pre.') ? ' - serwer testowy' : '';
    const buildType = API_URL.includes('.pre.') ? ` - ${ENVIRONMENT_TYPE}` : '';

    return `${version} (${appBuildNumber}) ${buildType} ${serverVersion}`;
};

const AboutApp: React.FC = () => {
    const {t} = useMergedTranslation('AboutApp');

    const styles = StyleSheet.create({
        scrollWrapper: {
            marginTop: getFVerticalPx(105),
        },
        wrap: {
            marginBottom: getFVerticalPx(65),
            paddingHorizontal: appContainerHorizontalMargin,
        },
        bike: {
            marginVertical: getFVerticalPx(24),
            width: '100%',
            height: getFVerticalPx(296),
            alignSelf: 'center',
        },
        nextLineText: {
            marginTop: getFVerticalPx(15),
        },
        appVersion: {
            marginTop: getFVerticalPx(32),
        },
    });

    return (
        <GenericScreen screenTitle={t('header')} transculentStatusBar>
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.wrap}>
                    <Header1>{t('title')}</Header1>

                    <Bike_1 style={styles.bike} />

                    <Paragraph>{t('text_1')}</Paragraph>

                    <Bike_2 style={styles.bike} />

                    <Paragraph>{t('text_2')}</Paragraph>

                    <Paragraph style={styles.nextLineText}>
                        {t('text_2b')}
                    </Paragraph>

                    <Bike_3 style={styles.bike} />

                    <Paragraph>{t('text_3')}</Paragraph>

                    <Paragraph style={styles.nextLineText}>
                        {t('text_3b')}
                    </Paragraph>

                    <Paragraph style={styles.nextLineText}>
                        {t('signature_1')}
                    </Paragraph>

                    <Header3 style={styles.nextLineText}>
                        {t('signature_2')}
                    </Header3>

                    <Paragraph style={styles.appVersion}>
                        {getAppVersion()}
                    </Paragraph>

                    <RouteDebugBtn />
                </View>
            </ScrollView>
        </GenericScreen>
    );
};

export default AboutApp;
