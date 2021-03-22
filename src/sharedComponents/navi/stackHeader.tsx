

//getToKnowEachOther
import React, { } from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import TopBackBtn from '../buttons/topBackBtn';
import DinLight18 from '../text/dinLight18';

import {
    initAppSize,
    getPerfectPX,
    getStandardPx
} from '../../helpers/layoutFoo';

interface StackHeaderProps {
    onpres: Function,
    inner: string
}


const StackHeader: React.FC<StackHeaderProps> = (props: StackHeaderProps) => {
    initAppSize();
    
    let styles = StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '13%',
        },
        topBtn: getPerfectPX(40, 34, 30, 62),
        title: getStandardPx(226, 23, 65),
    })


    return (
        <View style={styles.container}>
            <View style={styles.topBtn}>
                <TopBackBtn
                    onpres={() => props.onpres()}
                ></TopBackBtn>
            </View>

            <View style={styles.title}>
                <DinLight18
                    inner={props.inner}
                    color={'#313131'}
                ></DinLight18>
            </View>
        </View>
    )
}

export default StackHeader;