import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';

import DinLight18 from '../text/dinLight18';

interface BtnProps {
    onChangeText: Function,
    placeholder: string,
    value: string
}


const OneLineTekst: React.FC<BtnProps> = (props: BtnProps) => {

    let styles = StyleSheet.create({
        input: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            // height: '100%',
            borderRadius: 150,
            fontFamily: "DIN2014Narrow-Bold",
            fontSize: 20,
            textAlign: 'center',
            color: 'black',
            borderWidth: 2,
            borderColor: "#80555555",
            height: 50,
            marginTop: 6,
        },
        text: {
        }
    })

    return (
        <>
            <DinLight18
                algin='left'
                inner={props.placeholder}
            ></DinLight18>

            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}
            >
            </TextInput>
        </>
    )
}

export default OneLineTekst;
