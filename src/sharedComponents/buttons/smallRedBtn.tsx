

import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    GestureResponderEvent,
    TextStyle,
    ViewStyle,
} from 'react-native';

interface Props {
    title: string;
    onpress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const SmallRedBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d8232a',
            height: '100%',
            borderRadius: 50,
            paddingLeft: 15.5,
            paddingRight: 15.5,
        },
        text: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
        },
    });

    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onpress}>
            <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default SmallRedBtn;
