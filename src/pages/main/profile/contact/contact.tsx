import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
    Platform,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {getFHorizontalPx, getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import { appContainerHorizontalMargin } from '@src/theme/commonStyle';
import { Header2, Header3, Paragraph, TextLink } from '@src/components/texts/texts';
import colors from '@src/theme/colors';
import {ContactSvg, ContactTypeSvg} from '@components/svg';
import {LinkButton, PrimaryButton} from '@components/buttons';

import GenericScreen from '@src/pages/template/GenericScreen';

const Contact: React.FC = () => {
    const {t} = useMergedTranslation('Contact');

    const styles = StyleSheet.create({
        wrap: {
            display: 'flex',
            flex: 1,
            height: '100%',
            width: '100%',
            marginTop: getFVerticalPx(66),
            paddingHorizontal: appContainerHorizontalMargin,
        },
        imageContainer: {
            marginTop: getFVerticalPx(33),
            marginBottom: getFVerticalPx(24),
            alignItems: 'center'
        },
        subtitle: {
          marginBottom: getFVerticalPx(32),
        },
        subtitleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getFVerticalPx(24),
        },
        paragraphMargin: {
            marginBottom: getFVerticalPx(8),
        },
        contactTile: {
            backgroundColor: colors.whiteGrey,
            borderRadius: 8,
            paddingRight: getFVerticalPx(16),
            paddingLeft: getFVerticalPx(16),
            paddingTop: getFHorizontalPx(20),
            paddingBottom: getFHorizontalPx(20),
            marginBottom: getFVerticalPx(16),
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        tileGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        contactLink: {
            textDecorationLine: 'none',
        },
        icon: {
            marginRight: getFVerticalPx(18),
        },
        btn: {
            position: 'absolute',
            bottom: getFVerticalPx(34),
            alignSelf: 'center',
            width: getFHorizontalPx(294),
        },
    });

    const handlePhone = () => {
        if (Platform.OS !== 'android') {
            return `telprompt:${t('phone')}`;
        } else {
            return `tel:${t('phone')}`;
        }
    };

    return (
        <GenericScreen screenTitle={t('header')}>
            <View style={styles.wrap}>
                <View style={styles.imageContainer}>
                    <ContactSvg />
                </View>
                <Header2 algin="center" style={styles.subtitle}>
                    {t('contactCaption')}
                </Header2>

                <Header3 style={styles.paragraphMargin}>{t('officeTitle')}</Header3>

                <View style={styles.subtitleContainer}>
                    <Paragraph>{t('officeSubtitle')}</Paragraph>
                    <Paragraph>{t('officeHours')}</Paragraph>
                </View>

                <View style={styles.contactTile}>
                    <View style={styles.tileGroup}>
                        <ContactTypeSvg style={styles.icon} type={"phone"} />
                        <Text>{t('phoneTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <LinkButton style={styles.contactLink} text={t('phone')} onPress={() => Linking.openURL(handlePhone())} />
                    </View>
                </View>
                
                <View style={styles.contactTile}>
                    <View style={styles.tileGroup}>
                        <ContactTypeSvg style={styles.icon} type={"email"} />
                        <Text>{t('emailTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <LinkButton style={styles.contactLink} text={t('email')} onPress={() => Linking.openURL(`mailto:${t('email')}`)} />
                    </View>
                </View>

                <PrimaryButton 
                    text={t('btn')}
                    onPress={() => Linking.openURL('http://kross.eu')}
                    style={styles.btn}
                />
            </View>
        </GenericScreen>
    );
};

export default Contact;
