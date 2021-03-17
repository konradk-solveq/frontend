import React from "react";
import { StyleSheet, Text } from 'react-native';


interface TextProps {
    inner: string,
    algin?: string
}


const DinLight30: React.FC<TextProps> = (props: TextProps) => {

    let styles = StyleSheet.create({
        text: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 30,
            textAlign: props.algin ? props.algin : 'center'
        }
    })

    return (
        <Text style={styles.text}>{props.inner}</Text>
    )
}

export default DinLight30;