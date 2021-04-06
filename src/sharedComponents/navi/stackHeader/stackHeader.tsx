import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import TopBackBtn from './topBackBtn';

import {
    setAppSize,
    setObjSize,
    getCenterLeftPx,
    getTopPx,
    getWidthPx,
    getHeightPx,
    getPerfectPx,
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

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const [height, setHeight] = useState(getTopPx(100));
    useEffect(() => {
        if (props.getHeight) props.getHeight(height)
    }, [height])

    setObjSize(414, 34);
    const wrap = {
        position: 'absolute',
        left: 0,
        top: height * .61,
        width: ww,
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
        title
    })

    return (
        <View style={styles.container}>
            <View style={styles.wrap}>

                <TopBackBtn
                    // style={styles.topBtn}
                    onpress={() => props.onpress()}
                ></TopBackBtn>

                <Text style={styles.title}>
                    {props.inner}
                </Text>

            </View>
        </View>
    )
}

export default StackHeader;