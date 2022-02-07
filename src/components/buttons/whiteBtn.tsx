import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import {TouchableOpacity as TouchableOpacityIOS} from 'react-native-gesture-handler';

import {getHorizontalPx} from '@helpers/layoutFoo';
import {isIOS} from '@utils/platform';

const TouchableOpacity = isIOS ? TouchableOpacityIOS : TouchableOpacityRN;

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
            testID={testID || 'white-btn'}>
            <Text style={styles.text}>
                {neutralCase ? title : title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

export default WhiteBtn;
