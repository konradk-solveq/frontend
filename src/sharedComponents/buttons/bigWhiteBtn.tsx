import React from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

import {getHorizontalPx} from '../../helpers/layoutFoo';

interface Props {
    style?: any;
    title: string;
    onpress: () => void;
    neutralCase?: boolean;
    testID?: string;
    disabled?: boolean;
}

const BigWhiteBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: getHorizontalPx(50),
            borderWidth: 1,
            borderColor: '#33555555',
            backgroundColor: '#fff',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: getHorizontalPx(20),
            textAlign: 'center',
            color: '#313131',
        },
    });

    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onpress}
            disabled={props.disabled}
            testID={props.testID || 'big-white-btn'}>
            <Text style={styles.text}>
                {props.neutralCase ? props.title : props.title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

export default BigWhiteBtn;
