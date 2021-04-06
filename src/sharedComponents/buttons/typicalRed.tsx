import React from "react";
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import {
    getLeftPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any,
    title: string, // *
    onpress: Function, // *
    active: boolean, // *
    height: number
}

const TypicalRedBtn: React.FC<Props> = (props: Props) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // alignSelf: 'center',
            backgroundColor: props.active ? '#d8232a' : '#f0f0f0',
            paddingLeft: getLeftPx(10),
            paddingRight: getLeftPx(10),
            height: props.height ? getLeftPx(props.height) : '100%',
            borderRadius: getLeftPx(13),
            marginRight: getLeftPx(5),
            marginBottom: getLeftPx(5)
        },
        text: {
            fontFamily: "DIN2014Narrow-Bold",
            fontSize: getLeftPx(16),
            textAlign: 'center',
            color: props.active ? 'white' : '#313131'
        }
    })

    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onpress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default TypicalRedBtn;
