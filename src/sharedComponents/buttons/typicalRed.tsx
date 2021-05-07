import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { getHorizontalPx } from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    title: string; // *
    onpress: Function; // *
    active: boolean; // *
    height?: number;
}

const TypicalRedBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // alignSelf: 'center',
            backgroundColor: props.active ? '#d8232a' : '#f0f0f0',
            // backgroundColor: '#d8232a',
            paddingLeft: 10,
            paddingRight: 10,
            height: props.height ? getHorizontalPx(props.height) : '100%',
            borderRadius: 12,
            marginRight: 5,
            marginBottom: 5,
        },
        text: {
            fontFamily: props.active
                ? 'DIN2014Narrow-Bold'
                : 'DIN2014Narrow-Regular',
            fontSize: 16,
            textAlign: 'center',
            color: props.active ? 'white' : '#313131',
            letterSpacing: props.active ? 0 : 0.45,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onpress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default TypicalRedBtn;
