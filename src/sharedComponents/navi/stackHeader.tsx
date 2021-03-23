

//getToKnowEachOther
import React, { } from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import TopBackBtn from '../buttons/topBackBtn';
import DinLight18 from '../text/dinLight18';

import {
    initAppSize,
    setObjSize,
    getPerfectPX,
    getStandardPx,
    getHeightPx
} from '../../helpers/layoutFoo';

interface StackHeaderProps {
    onpress: Function,
    inner: string
}


const StackHeader: React.FC<StackHeaderProps> = (props: StackHeaderProps) => {
    initAppSize();

    setObjSize(414, 34);
    const wrap = {
        position: 'absolute',
        left: 0,
        top: '52%',
        width: '100%',
        height: getHeightPx(),
    }

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '13%',
        },
        wrap,
        topBtn: getPerfectPX(40, 34, 30, 0),
        title: getStandardPx(226, 23, 3),
    })


    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <View style={styles.topBtn}>
                    <TopBackBtn
                        onpress={() => props.onpress()}
                    ></TopBackBtn>
                </View>

                <View style={styles.title}>
                    <DinLight18
                        inner={props.inner}
                        color={'#313131'}
                    ></DinLight18>
                </View>
            </View>
        </View>
    )
}

export default StackHeader;