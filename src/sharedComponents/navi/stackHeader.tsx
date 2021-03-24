

//getToKnowEachOther
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from 'react-native';
import TopBackBtn from '../buttons/topBackBtn';
import DinLight18 from '../text/dinLight18';

import {
    initAppSize,
    setObjSize,
    getPerfectPx,
    getStandardPx,
    getHeightPx,
    getTopPx
} from '../../helpers/layoutFoo';

interface StackHeaderProps {
    onpress: Function,
    inner: string,
    getHeight: Function,
}


const StackHeader: React.FC<StackHeaderProps> = (props: StackHeaderProps) => {

    initAppSize();
    const [height, setHeight] = useState(getTopPx(117));
    useEffect(() => {
        if (props.getHeight) props.getHeight(height)
    }, [height])
    

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
            height: height,
            // backgroundColor: 'darkolivegreen',
        },
        wrap,
        topBtn: getPerfectPx(40, 34, 30, 0),
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