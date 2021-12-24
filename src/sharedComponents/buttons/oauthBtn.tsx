import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';

const TouchableOpacity =
    Platform.OS === 'ios' ? TouchableOpacityIOS : TouchableOpacityRN;

import {getFontSize, getHorizontalPx} from '@helpers/layoutFoo';

interface Props {
    style?: any;
    iconStyle?: any;
    title: string;
    icon?: Element;
    onpress: () => void;
    neutralCase?: boolean;
    testID?: string;
    disabled?: boolean;
}

const OauthBtn: React.FC<Props> = (props: Props) => {
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
            flexDirection: 'row',
        },
        iconWrapper: {
            height: '100%',
            justifyContent: 'center',
            marginLeft: getFontSize(20) / 2,
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: getHorizontalPx(20),
            textAlign: 'center',
            color: '#313131',
        },
        textWrapper: {
            justifyContent: 'center',
            flex: 1,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onpress}
            disabled={props.disabled}
            testID={props.testID || 'big-white-btn'}>
            {props.icon && <View style={styles.iconWrapper}>{props.icon}</View>}
            <View style={styles.textWrapper}>
                <Text style={styles.text}>
                    {props.neutralCase
                        ? props.title
                        : props.title.toUpperCase()}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default OauthBtn;
