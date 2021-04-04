import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';

import {
    setAppSize,
    initAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getCenterTop,
    getLeft,
    getLeftPx,
    getTop,
    getTopPx,
    getWidth,
    getWidthOf,
    getWidthPx,
    getWidthPxOf,
    getHeight,
    getHeightPx,
    getRelativeWidth,
    getRelativeHeight,
    getStandard,
    getStandardPx,
    getPerfect,
    getPerfectPx,
    getPosStaticHeight,
    getOnlyPos,
    getPosAndWid,
    getPosWithMinHeight
} from '../../../helpers/layoutFoo';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    style?: any
    type: string,
    toEnd: number,
    description: any
};

const Warranty: React.FC<Props> = (props: Props) => {

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    setObjSize(334, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();
    const styles = StyleSheet.create({
        container: {
            // alignItems: 'center',
            left: l,
            width: w,
            borderRadius: 24,
            // height: '100%',
            backgroundColor: 'red'// '#fdf5f5'
        },
        textLine: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // backgroundColor: 'green'

        },
        leftText: {
            marginTop: getTopPx(22),
            marginBottom: getTopPx(22),
            left: getLeftPx(30.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'left',
            fontSize: 15,
            color: '#555555',
        },
        rightText: {
            marginTop: getTopPx(15),
            left: getLeftPx(28.5),
            width: '50%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            color: '#313131',
            textAlign: 'left',
        },
        line: {
            borderBottomColor: 'green',
            borderBottomWidth: 2
        },
        dots: {
            position: 'absolute',
            right: getLeftPx(17),
            bottom: getTopPx(14),
        }
    })

    return (
        <View style={[styles.container, props.style]}>

            <View style={[styles.textLine, styles.line]}>
                <Text style={styles.leftText}>{props.description.state}</Text>
                <Text style={styles.rightText}>{props.type}</Text>
            </View>

            <View style={styles.textLine}>
                <Text style={styles.leftText}>{props.description.toEnd}</Text>
                <Text style={styles.rightText}>{'' + props.toEnd + ' ' + props.description.days}</Text>
            </View>

            <Text style={styles.dots}>. . .</Text>

        </View>
    )
}

export default Warranty