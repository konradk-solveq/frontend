import React from 'react';
import {StyleSheet, SafeAreaView, Dimensions, View, Text} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import BigRedBtn from '@sharedComponents/buttons/bigRedBtn';
import Image from './image';

import {
    setObjSize,
    getCenterLeftPx,
    getVerticalPx,
    getWidthPx,
    getStandard,
    getFontSize,
    mainButtonsHeight,
    getHeightPx,
    getHeightOfPx,
} from '@helpers/layoutFoo';

interface Props {
    navigation: any;
}

const ww = Dimensions.get('window').width;

const WrongScan: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('WrongScan');

    const imgH = ww * (296 / 414);
    setObjSize(334, 51);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },
        title: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            bottom: getVerticalPx(381 + 30) + imgH,
        },
        reg40: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            textAlign: 'center',
            color: '#d8232a',
        },
        light18: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            textAlign: 'left',
            color: '#555555',
        },
        image: {
            position: 'absolute',
            width: ww,
            height: imgH,
            bottom: getVerticalPx(381),
        },
        text: getStandard(334, 174, 535),
        btnAgain: {
            position: 'absolute',
            width: getHeightOfPx(334),
            height: getVerticalPx(50),
            left: mainButtonsHeight(40),
            top: getVerticalPx(781),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.image}>
                <Image />
            </View>

            <Text style={[styles.title, styles.reg40]}>{t('title')}</Text>

            <Text style={[styles.text, styles.light18]}>
                {t('text', {number: '4444444444'})}
            </Text>

            <View style={styles.btnAgain}>
                <BigRedBtn title={t('btnAgain')} onpress={() => {}} />
            </View>
        </SafeAreaView>
    );
};

export default WrongScan;
