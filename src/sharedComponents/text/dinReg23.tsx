import React from "react";
import { StyleSheet, Text } from 'react-native';
import { color } from "react-native-reanimated";


interface TextProps {
    inner: string,
    algin?: string,
    color?: string
}


const DinReg23: React.FC<TextProps> = (props: TextProps) => {

    let styles = StyleSheet.create({
        text: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 23,
            textAlign: props.algin ? props.algin : 'center',
            color: props.color ? props.color : '#313131'
        }
    })

    return (
        <Text style={styles.text}>{props.inner}</Text>
    )
}

export default DinReg23;