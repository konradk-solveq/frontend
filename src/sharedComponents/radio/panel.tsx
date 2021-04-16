import React from 'react';
import {StyleSheet, View} from 'react-native';
import RadioBtn from './radioBtn';

import {
    setObjSize,
    getWidthPxOf,
    getCenterLeftPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    active: number; // który w kolejości radiobuton jest aktywny
    listBtn: Array<Function>; // lista funkcji wukonywanych po wciśnięciu butona
}

const RadioPanel: React.FC<Props> = (props: Props) => {
    const h = 7 + 13 + 7;
    const w = (h + 2) * props.listBtn.length;
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
            // top: -8,
            left: getCenterLeftPx(),
            // backgroundColor: 'khaki'
        },
    });

    return (
        <View style={[styles.pannel, props.style]}>
            {props.listBtn.map((e, i) => (
                <RadioBtn
                    cheched={props.active == i}
                    onpress={e}
                    key={'radioBtn' + i}
                />
            ))}
        </View>
    );
};

export default RadioPanel;
