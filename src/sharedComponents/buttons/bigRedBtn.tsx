import React from "react";
import { StyleSheet,  TouchableOpacity, Text } from 'react-native';

import {
    getLeftPx,
} from '../../helpers/layoutFoo';

interface Props {
    style?: any,
    title: string,
    onpress: Function
}

const BigRedBtn: React.FC<Props> = (props: Props) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d8232a',
            width: '100%',
            height: '100%',
            borderRadius: getLeftPx(50)
        },
        text: {
            fontFamily: "DIN2014Narrow-Bold",
            fontSize: getLeftPx(20),
            textAlign: 'center',
            color: 'white'
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

export default BigRedBtn;
