import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import I18n from 'react-native-i18n';

import {getFontSize, getHorizontalPx, getVerticalPx} from '../../../helpers/layoutFoo';

import Bike_4 from './bike_4';

interface Props {
    handleMeasurement: Function;
    wrapH: any;
    imgH: any;
    titleH: any;
    textH: any;
}

const Screen_4: React.FC<Props> = (props: Props) => {
    const trans = I18n.t('Onboarding');

    let styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
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
            // backgroundColor: 'khaki',
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
            fontSize: getFontSize(40),
            lineHeight: getFontSize(46),
            textAlign: 'center',
            color: '#313131',
            // backgroundColor: '#0099ff',
        },
        image: {
            position: 'relative',
            width: '97.605%',
            height: props.imgH,
            left: '1.198%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#00cc00',
        },
        svgWrap: {
            position: 'relative',
            marginTop: '-8.8%',
            width: '100%',
            height: '108.8%',
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
            fontSize: getFontSize(18),
            lineHeight: getFontSize(20),
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
                        {trans.title_4}
                    </Text>
                </View>

                <View style={styles.image}>
                    <View style={styles.svgWrap}>
                        <Bike_4 style={styles.svg} />
                    </View>
                </View>

                <View style={styles.textWrap}>
                    <Text
                        style={styles.text}
                        onLayout={({nativeEvent}) =>
                            props.handleMeasurement(nativeEvent.layout, 'text')
                        }>
                        {trans.text_4}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Screen_4;
