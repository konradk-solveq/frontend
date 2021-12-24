import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import I18n from 'react-native-i18n';

import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

import Bike_5 from './bike_5';

interface Props {
    handleMeasurement: Function;
    wrapH: any;
    imgH: any;
    titleH: any;
    textH: any;
}

const Screen_5: React.FC<Props> = ({
    handleMeasurement,
    wrapH,
    imgH,
    titleH,
    textH,
}: Props) => {
    const trans = I18n.t('Onboarding');

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
        },
        wrap: {
            position: 'absolute',
            width: getHorizontalPx(334),
            height: wrapH,
            left: getHorizontalPx(40),
            top: getVerticalPx(138),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        titleWrap: {
            width: '100%',
            height: 'auto',
            marginBottom: getVerticalPx(10),
        },
        title: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(40),
            lineHeight: getFontSize(46),
            textAlign: 'center',
            color: '#313131',
        },
        image: {
            position: 'relative',
            width: '74.551%',
            height: imgH,
            left: '12.725%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        svgWrap: {
            position: 'relative',
            marginTop: '-5%',
            width: '100%',
            height: '105%',
        },
        textWrap: {
            width: '100%',
            height: textH === 0 ? 'auto' : textH,
            marginTop: getVerticalPx(10),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        text: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            lineHeight: getFontSize(20),
            textAlign: 'center',
            color: '#555555',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.titleWrap}>
                    <Text
                        style={styles.title}
                        onLayout={({nativeEvent}) =>
                            handleMeasurement(nativeEvent.layout, 'title')
                        }>
                        {trans.title_5}
                    </Text>
                </View>

                <View style={styles.image}>
                    <View style={styles.svgWrap}>
                        <Bike_5 />
                    </View>
                </View>

                <View style={styles.textWrap}>
                    <Text
                        style={styles.text}
                        onLayout={({nativeEvent}) =>
                            handleMeasurement(nativeEvent.layout, 'text')
                        }>
                        {trans.text_5}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Screen_5;
