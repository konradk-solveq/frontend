import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {getFontSize} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    title: string;
    onpress: Function;
    algin?: string;
    color?: string;
}

const TranspLightBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            justifyContent: 'center',
        },
        text: {
            width: '100%',
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(18),
            textAlign: props.algin ? props.algin : 'center',
            color: props.color ? props.color : '#d8232a',
        },
    });

    return (
        <View style={[styles.btn, props.style]}>
            <TouchableOpacity onPress={props.onpress}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TranspLightBtn;
