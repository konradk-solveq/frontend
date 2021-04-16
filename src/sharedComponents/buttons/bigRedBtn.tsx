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

const BigRedBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d8232a',
            width: '100%',
            height: '100%',
            borderRadius: 50,
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: 20,
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

export default BigRedBtn;
