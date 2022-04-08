import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableWithoutFeedback,
    Linking,
    Platform,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {commonStyle as comStyle} from '@helpers/commonStyle';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import ContactSvg from './contactSvg';
import { appContainerHorizontalMargin } from '@src/theme/commonStyle';
import { Header2, Header3, Paragraph, TextLink } from '@src/components/texts/texts';
import colors from '@src/theme/colors';
import ContactIcon from './contactIcon';

interface Props {
    navigation: any;
    route: any;
}

const Contact: React.FC<Props> = (props: Props) => {
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
        captionText: {
            textAlign: 'center',
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
        phoneLink: {
            textDecorationLine: 'none',
        },
        icon: {
            marginRight: getFVerticalPx(18),
        },
        btn: {
            position: 'absolute',
            bottom: getFVerticalPx(34),
            alignSelf: 'center',
            backgroundColor: colors.red,
            borderRadius: 16,
            height: getFVerticalPx(48),
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
        <SafeAreaView style={comStyle.container}>
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
                        <ContactIcon style={styles.icon} type={"phone"} />
                        <Text>{t('phoneTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(handlePhone())}>
                            <View>
                                <TextLink style={styles.phoneLink} color={colors.red}>{t('phone')}</TextLink>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                
                <View style={styles.contactTile}>
                    <View style={styles.tileGroup}>
                        <ContactIcon type={"email"} style={styles.icon} />
                        <Text>{t('emailTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${t('email')}`)}>
                            <View>
                                <TextLink style={styles.phoneLink} color={colors.red}>{t('email')}</TextLink>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <BigRedBtn
                    style={styles.btn}
                    title={t('btn')}
                    onpress={() => Linking.openURL('http://kross.eu')}
                />
            </View>

            <StackHeader
                onpress={() => props.navigation.goBack()}
                inner={t('header')}
            />
        </SafeAreaView>
    );
};

export default Contact;
