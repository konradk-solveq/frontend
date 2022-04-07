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
import {useAppSelector} from '@hooks/redux';
import {commonStyle as comStyle} from '@helpers/commonStyle';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getFontSize,
    mainButtonsHeight,
} from '@helpers/layoutFoo';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import ContactSvg from './contactSvg';
import { appContainerHorizontalMargin } from '@src/theme/commonStyle';
import { Header2, Header3, Paragraph, TextLink } from '@src/components/texts/texts';
import colors from '@src/theme/colors';
import { MykrossIconFont } from '@src/theme/enums/iconFonts';

interface Props {
    navigation: any;
    route: any;
}

const Contact: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('Contact');
    const userName =
        useAppSelector<string>(state => state.user.userName) || t('anonim');

    // const [headHeight, setheadHeight] = useState(0);

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        wrap: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            marginBottom: getVerticalPx(65),
            marginTop: getVerticalPx(100),
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
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            color: '#555555',
            textAlign: 'left',
            position: 'absolute',
            top: getVerticalPx(138 - 100),
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
        icon: {
            fontFamily: 'mykross',
            fontSize: getFHorizontalPx(30),
            width: getFHorizontalPx(30),
            height: getFHorizontalPx(30),
            textAlign: 'center',
            color: '#333',
            marginRight: getFVerticalPx(18),
        },
        tileGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        phoneLink: {
            textDecorationLine: 'none',
        },
        email: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#3587ea',
            textAlign: 'left',
        },
        adress: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(24),
            lineHeight: getFontSize(30),
            color: '#313131',
            textAlign: 'left',
            position: 'absolute',
            top: getVerticalPx(568 - 100),
        },
        btn: {
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: colors.red,
            borderRadius: 16,
            bottom: getFVerticalPx(34),
            height: getFVerticalPx(48),
            width: '100%',
        },
    });

    const heandlePhone = () => {
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
                        <Text style={styles.icon}>
                            {MykrossIconFont.MYKROSS_ICON_HOME}
                        </Text>
                        <Text>{t('phoneTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(heandlePhone())}>
                            <TextLink style={styles.phoneLink} color={colors.red}>{t('phone')}</TextLink>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                
                <View style={styles.contactTile}>
                    <View style={styles.tileGroup}>
                        <Text style={styles.icon}>
                            {MykrossIconFont.MYKROSS_ICON_HOME}
                        </Text>
                        <Text>{t('emailTitle')}</Text>
                    </View>

                    <View style={styles.tileGroup}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${t('email')}`)}>
                            <TextLink style={styles.phoneLink} color={colors.red}>{t('email')}</TextLink>
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
                // getHeight={setheadHeight}
            />
        </SafeAreaView>
    );
};

export default Contact;
