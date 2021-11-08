import {getFontSize, mainButtonsHeight} from '@src/helpers/layoutFoo';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextStyle,
    ViewStyle,
    TouchableOpacity as TouchableOpacityRN,
    Platform,
    ActivityIndicator,
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
    withLoader?: boolean;
    neutralCase?: boolean;
    testID?: string;
}

const BigRedBtn: React.FC<Props> = (props: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: !props.disabled ? '#d8232a' : '#db4f54',
            width: '100%',
            height: '100%',
            borderRadius: mainButtonsHeight(50),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: getFontSize(20),
            textAlign: 'center',
            color: 'white',
        },
    });

    return (
        <View style={props.style}>
            <TouchableOpacity
                style={styles.btn}
                onPress={props.onpress}
                disabled={props.disabled}
                testID={props.testID || 'big-red-btn'}>
                <>
                    {!props.withLoader ? (
                        <Text style={[styles.text, props.textStyle]}>
                            {props.neutralCase
                                ? props.title
                                : props.title.toUpperCase()}
                        </Text>
                    ) : (
                        <Loader />
                    )}
                </>
            </TouchableOpacity>
        </View>
    );
};

const Loader = () => {
    return (
        <ActivityIndicator size="small" color="white" testID="red-btn-loader" />
    );
};

export default BigRedBtn;
