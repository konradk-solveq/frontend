import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, Animated, Easing, Text, Alert } from 'react-native';

import {
    setObjSize,
    getStandard,
    getWidth,
    getHeight,
    getLeft,
    getTop,
    initAppSize
} from '../../helpers/layoutFoo';

import BigRedBtn from '../../sharedComponents/buttons/bigRedBtn'
import PanelProps from '../../sharedComponents/radio/panel'
import TranspLightBtn from '../../sharedComponents/buttons/transpLightBtn'

interface BtnProps {
    board: number,
    list: Array<Function>,
    setBoard: Function
}

const StaticElements: React.FC<BtnProps> = (props: BtnProps) => {
    initAppSize()
    setObjSize(41, 23);
    const skip = {
        position: 'absolute',
        width: getWidth(),
        height: getHeight(),
        left: getLeft(333),
        top: getTop(67),
    }

    let styles = StyleSheet.create({
        redBtn: getStandard(334, 50, 781),
        skip
    })

    return (
        <>
            <PanelProps
                active={props.board - 1}
                listBtn={props.list}
            ></PanelProps>

            <View style={styles.skip}>
                <TranspLightBtn title='pomiń' />
            </View>

            <View style={styles.redBtn}>
                <BigRedBtn
                    title='DALEJ'
                    onpress={() => { if (props.board < props.list.length) props.setBoard(props.board + 1) }}
                />
            </View>
        </>
    )
}

export default StaticElements;