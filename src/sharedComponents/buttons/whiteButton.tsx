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

import {getHorizontalPx} from '@helpers/layoutFoo';

interface Props {
    style?: any;
    title: string;
    onPress: () => void;
    neutralCase?: boolean;
    testID?: string;
    disabled?: boolean;
}

const WhiteBtn: React.FC<Props> = ({
    style,
    title,
    onPress,
    testID,
    disabled,
    neutralCase,
}: Props) => {
    let styles = StyleSheet.create({
        btn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: getHorizontalPx(16),
            backgroundColor: '#fff',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Bold',
            fontSize: getHorizontalPx(20),
            textAlign: 'center',
            color: '#C63733',
        },
    });

    return (
        <TouchableOpacity
            style={[styles.btn, style]}
            onPress={onPress}
            disabled={disabled}
            testID={testID || 'big-white-btn'}>
            <Text style={styles.text}>
                {neutralCase ? title : title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

export default WhiteBtn;
