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
            width: getWidthPx(),
            height: getVerticalPx(896 - 100),
            left: getCenterLeftPx(),
            marginBottom: getVerticalPx(65),
            marginTop: getVerticalPx(100),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(30),
            color: '#555555',
            textAlign: 'left',
            position: 'absolute',
            top: getVerticalPx(138 - 100),
        },
        poneEmail: {
            position: 'absolute',
            top: getVerticalPx(347 - 100),
        },
        phone: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            color: '#313131',
            textAlign: 'left',
            marginBottom: getVerticalPx(16),
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
            bottom: getVerticalPx(65),
            height: mainButtonsHeight(50),
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
                <Text style={styles.title}>{t('title', {name: userName})}</Text>
                <View style={styles.poneEmail}>
                    <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(heandlePhone())}>
                        <Text style={styles.phone}>{t('phone')}</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() =>
                            Linking.openURL('mailto:kross@kross.pl')
                        }>
                        <Text style={styles.email}>{t('email')}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.adress}>{t('adress')}</Text>

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
