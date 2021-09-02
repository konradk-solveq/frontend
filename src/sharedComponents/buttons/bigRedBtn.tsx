import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextStyle,
    ViewStyle,
    TouchableOpacity as TouchableOpacityRN,
    Platform,
} from 'react-native';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

interface Props {
    title: string;
    onpress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    neutralCase?: boolean;
    testID?: string;
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
        <View style={props.style}>
            <TouchableOpacity
                style={styles.btn}
                onPress={props.onpress}
                testID={props.testID}>
                <Text style={[styles.text, props.textStyle]}>
                    {props.neutralCase
                        ? props.title
                        : props.title.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BigRedBtn;
