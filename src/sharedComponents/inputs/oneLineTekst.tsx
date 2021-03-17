import React from "react";
import { StyleSheet, TextInput, Text } from 'react-native';

interface BtnProps {
    onChangeText: Function,
    text: string
}


const OneLineTekst: React.FC<BtnProps> = (props: BtnProps) => {

    let styles = StyleSheet.create({
        input: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 50,
            fontFamily: "DIN2014Narrow-Bold",
            fontSize: 20,
            textAlign: 'center',
            color: 'black',
            borderWidth: 2,
            borderColor: "#80555555",
        },
        text: {
        }
    })

    return (
        <TextInput
            style={styles.input}
            onChangeText={props.onChangeText}
            value={props.text}
        >
        </TextInput>
    )
}

export default OneLineTekst;
