import React from 'react';
import {
    StyleSheet,
    Text,
    GestureResponderEvent,
    TextStyle,
    ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
    title: string;
    onpress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    neutralCase?: boolean;
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
            disabled={props.disabled}
            onPress={props.onpress}>
            <Text style={[styles.text, props.textStyle]}>
                {props.neutralCase ? props.title : props.title?.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

export default BigRedBtn;
