import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioBtn from './radioBtn';

import {
    initAppSize,
    setObjSize,
    getWidthPxOf,
    getCenterLeftPx
} from '../../helpers/layoutFoo';

interface Props {
    style?: any,
    active: number, // który w kolejości radiobuton jest aktywny
    listBtn: Array<Function> // lista funkcji wukonywanych po wciśnięciu butona
}

const RadioPanel: React.FC<Props> = (props: Props) => {
    initAppSize();

    const h = getWidthPxOf(13);
    const w = (h * props.listBtn.length) + (getWidthPxOf(15.5) * (props.listBtn.length - 1))
    setObjSize(w, h);
    const styles = StyleSheet.create({
        pannel: {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: w,
            height: h,
            left: getCenterLeftPx()
        },
    })

    return (

        <View style={[styles.pannel, props.style]}>
            {props.listBtn.map((e, i) => (
                <RadioBtn
                    cheched={props.active == i}
                    onpress={e}
                    key={'radioBtn' + i}
                ></RadioBtn>
            ))}
        </View>
    )
}

export default RadioPanel;