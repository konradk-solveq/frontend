import React from "react";
import { StyleSheet, Button, TouchableOpacity, Text } from 'react-native';

interface BtnProps {
    title: string
}


const BigRedBtn: React.FC<BtnProps> = (props: BtnProps) => {

    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d8232a',
            width: '100%',
            height: '100%',
            borderRadius: 50
        },
        text: {
            fontFamily: "DIN2014Narrow-Bold",
            fontSize: 20,
            textAlign: 'center',
            color: 'white'
        }
    })

    return (


        <TouchableOpacity
            style={styles.btn}
            onPress={() => { }}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default BigRedBtn;
