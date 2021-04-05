import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import TopBackBtn from './topBackBtn';

import {
    initAppSize,
    setObjSize,
    getPerfectPx,
    getHeightPx,
    getTopPx,
    getWidthPx,
    getCenterLeftPx
} from '../../../helpers/layoutFoo';

interface Props {
    // * wartości wymagane
    onpress: Function, // po naciśnięciu strzałki
    inner: string, // nazwa headera
    getHeight: Function, // * dla rodzica zwrotka wysokości hedera - istotne przy ScrollView
}

// <<--- #askBartosz (6) ? wiesz może czy da się podmienić strałkę goBack w headerze?
// ręcznie dodawany hader bo nie potrafiłem ostylować strałki tak jak wyglądała na designach layoutu
const StackHeader: React.FC<Props> = (props: Props) => {

    initAppSize();

    const [height, setHeight] = useState(getTopPx(100));
    useEffect(() => {
        if (props.getHeight) props.getHeight(height)
    }, [height])

    setObjSize(414, 34);
    const wrap = {
        position: 'absolute',
        left: 0,
        top: '61%',
        width: '100%',
        height: getHeightPx(),
    }

    setObjSize(226, 23);
    const title = {
        position: 'absolute',
        width: getWidthPx(),
        left: getCenterLeftPx(),
        top: getTopPx(3),
        fontFamily: "DIN2014Narrow-Light",
        textAlign: 'center',
        fontSize: 18,
        color: '#313131'
    }

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: height,
        },
        wrap,
        topBtn: getPerfectPx(40, 34, 30, 0),
        title
    })

    return (
        <View style={styles.container}>

            <View style={styles.wrap}>

                <View style={styles.topBtn}>
                    <TopBackBtn
                        onpress={() => props.onpress()}
                    ></TopBackBtn>
                </View>

                <Text style={styles.title}>
                    {props.inner}
                </Text>

            </View>

        </View>
    )
}

export default StackHeader;