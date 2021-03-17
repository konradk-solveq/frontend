import React from "react";
import { StyleSheet,  TouchableOpacity, Text } from 'react-native';

interface BtnProps {
    title: string,
    onpress: Function
}


const TranspLightBtn: React.FC<BtnProps> = (props: BtnProps) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        },
        text: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 18,
            textAlign: 'center',
            color: '#d8232a'
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
