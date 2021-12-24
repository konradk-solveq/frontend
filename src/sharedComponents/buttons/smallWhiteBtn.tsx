import {getHorizontalPx} from '@helpers/layoutFoo';
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
    onPress?: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    testID?: string;
}

const SmallWhiteBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            borderRadius: getHorizontalPx(50),
            paddingLeft: getHorizontalPx(15.5),
            paddingRight: getHorizontalPx(15.5),
            borderWidth: 1,
            borderColor: '#33555555',
            backgroundColor: '#fff',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: getHorizontalPx(18),
            textAlign: 'center',
            color: '#313131',
        },
    });

    return (
        <TouchableOpacity
            testID={props.testID || 'small-white-btn'}
            style={[styles.btn, props.style]}
            onPress={props.onPress}>
            <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default SmallWhiteBtn;
