import React from "react";
import { StyleSheet, Text } from 'react-native';


interface TextProps {
    inner: string,
    algin?: string,
    color?: string
}


const DinLight18: React.FC<TextProps> = (props: TextProps) => {

    let styles = StyleSheet.create({
        text: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: props.algin ? props.algin : 'center',
            color: props.color ? props.color : '#555555'
        }
    })

    return (
        <Text style={styles.text}>{props.inner}</Text>
    )
}

export default DinLight18;