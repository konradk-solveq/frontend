import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import I18n from 'react-native-i18n';

import {
    setObjSize,
    getWidthPx,
    getWidthPxOf,
    getHorizontalPx,
    getVerticalPx,
    getVertical,
    getCenterLeftPx,
    getPosWithMinHeight,
} from '../../../../helpers/layoutFoo';

import OneLineTekst from '../../../../sharedComponents/inputs/oneLineTekst';
import BigRedBtn from '../../../../sharedComponents/buttons/bigRedBtn';
import StackHeader from '../../../../sharedComponents/navi/stackHeader/stackHeader';

interface Props {
    navigation: any;
}

const Counter: React.FC<Props> = ({ navigation }: Props) => {
    const trans = I18n.t('NameChange');

    const [areaHeigh, setAreaHeigh] = useState(0);
    const [headHeight, setHeadHeight] = useState(0);

    setObjSize(334, 50);
    const bottons = {
        position: 'absolute',
        width: getWidthPx(),
        height: 50,
        left: getCenterLeftPx(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: getVerticalPx(65 + 100), // 100 - przesunięcie dla scroll o headera
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        },

        area: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
            height: areaHeigh,
            minHeight: getVertical(414),
        },
        title: {
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getVertical(138 - 100),
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 30,
            lineHeight: 38,
            color: '#313131',
        },
        logo: {
            position: 'absolute',
            left: getHorizontalPx(152),
            top: getVerticalPx(66),
            width: getHorizontalPx(110),
            height: getHorizontalPx(20),
        },
        inputAndPlaceholder: getPosWithMinHeight(334, 90, 380 - 100, 90),
        input: {
            height: 50,
            marginTop: getHorizontalPx(6),
        },
        bottons,
        btn: {
            position: 'absolute',
            width: getWidthPx(),
            height: 50,
            left: getCenterLeftPx(),
            bottom: getVerticalPx(65 + 100), // 100 - przesunięcie dla scroll o headera
        },
    });

    return (
        <SafeAreaView
            style={styles.container}>
            <View style={styles.area}>
                <Text style={styles.title}>{trans.distance}</Text>


            </View>

            <StackHeader
                onpress={() => navigation.goBack()}
                getHeight={setHeadHeight}
                inner={trans.header}
            />
        </SafeAreaView>
    );
};

export default Counter;
