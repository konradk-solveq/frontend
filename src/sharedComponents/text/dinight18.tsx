import React from "react";
import { StyleSheet, Text } from 'react-native';


interface TextProps {
    inner: string
}


const DinLight18: React.FC<TextProps> = (props: TextProps) => {

    let styles = StyleSheet.create({
        text: {
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 18,
            textAlign: 'center'
        }
    })

    return (
        <Text style={styles.text}>{props.inner}</Text>
    )
}

export default DinLight18;