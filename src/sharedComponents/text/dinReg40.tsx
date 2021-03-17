import React from "react";
import { StyleSheet, Text } from 'react-native';


interface TextProps {
    inner: string,
    algin?: string
}


const DinReg40: React.FC<TextProps> = (props: TextProps) => {

    let styles = StyleSheet.create({
        text: {
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            textAlign: props.algin ? props.algin : 'center'
        }
    })

    return (
        <Text style={styles.text}>{props.inner}</Text>
    )
}

export default DinReg40;