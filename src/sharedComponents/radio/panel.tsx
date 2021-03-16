import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getWidth } from '../../helpers/layoutFoo';
import RadioBtn from './radiBtn';

import {
    initAppSize,
    getStandard
} from '../../helpers/layoutFoo';


interface PanelProps {
    active: number,
    listBtn: Array<Function>
}

const RadioPanel: React.FC<PanelProps> = (props: PanelProps) => {
    initAppSize();

    let styles = StyleSheet.create({
        pannel: {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        wrap : getStandard(70, 13, 70)
    })

    return (

        <View style={[styles.pannel, styles.wrap]}>
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