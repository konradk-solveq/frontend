import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions} from 'react-native';
import I18n from 'react-native-i18n';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeftPx,
    getCenterTopPx,
    getHorizontal,
    getHorizontalPx,
    getVertical,
    getVerticalPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getHeightOfPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight,
} from '../../../helpers/layoutFoo';

import Bike_1 from './bike_1';

interface Props {
    handleMeasurement: Function;
    wrapH: any;
    imgH: any;
    titleH: any;
    textH: any;
    linePosX: any;
}

const Screen_1: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Onboarding');

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            // backgroundColor: 'white',
        },
        wrap: {
            position: 'absolute',
            width: getHorizontalPx(334),
            height: props.wrapH,
            left: getHorizontalPx(40),
            top: getVerticalPx(138),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        titleWrap: {
            width: '100%',
            height: props.titleH == 0 ? 'auto' : props.titleH,
            // backgroundColor: '#00ccff',
            marginBottom: getVerticalPx(30),
        },
        title: {
            width: '100%',
            // height: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            lineHeight: 46,
            textAlign: 'center',
            color: '#313131',
            // backgroundColor: '#0099ff',
        },
        image: {
            position: 'relative',
            width: '75.749%',
            height: props.imgH,
            left: '12.126%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#00cc00',
        },
        svgWrap: {
            position: 'relative',
            marginTop: '5.622%',
            width: '100%',
            height: '94.378%',
            // backgroundColor: '#00ccff',
        },
        svg: {
            // backgroundColor: '#ffcc66',
        },
        textWrap: {
            width: '100%',
            height: props.textH == 0 ? 'auto' : props.textH,
            // backgroundColor: '#00ccff',
            marginTop: getVerticalPx(10),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        text: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 18,
            lineHeight: 20,
            textAlign: 'center',
            color: '#555555',
            // backgroundColor: '#0099ff',
        },

    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.titleWrap}>
                    <Text
                        style={styles.title}
                        onLayout={({nativeEvent}) =>
                            props.handleMeasurement(nativeEvent.layout, 'title')
                        }>
                        {trans.title_1}
                    </Text>
                </View>

                <View style={styles.image}>
                    <View style={styles.svgWrap}>
                        <Bike_1 style={styles.svg} />
                    </View>
                </View>

                <View style={styles.textWrap}>
                    <Text
                        style={styles.text}
                        onLayout={({nativeEvent}) =>
                            props.handleMeasurement(nativeEvent.layout, 'text')
                        }>
                        {trans.text_1}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Screen_1;
