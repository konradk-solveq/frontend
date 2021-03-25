import React from "react";
import { StyleSheet,  TouchableOpacity, Text } from 'react-native';

interface Props {
    title: string,
    onpress: Function,
    algin: string,
    color: string
}

const TranspLightBtn: React.FC<Props> = (props: Props) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        },
        text: {
            width: '100%',
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 18,
            textAlign: props.algin ? props.algin : 'center',
            color: props.color ? props.color : '#d8232a'
        }
    })

    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={props.onpress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default TranspLightBtn;
