import {getHorizontalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: StyleProp<ViewStyle>;
}

const ShareBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 20 20" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M15.208 0c1.723 0 3.125 1.402 3.125 3.125S16.931 6.25 15.208 6.25c-.937 0-1.78-.415-2.353-1.071L6.097 9.032c.1.305.153.63.153.968 0 .338-.054.663-.153.968l6.758 3.853c.573-.656 1.416-1.071 2.353-1.071 1.723 0 3.125 1.402 3.125 3.125S16.931 20 15.208 20c-1.722 0-3.125-1.402-3.125-3.125 0-.338.054-.664.154-.969l-6.759-3.852c-.573.656-1.416 1.071-2.353 1.071C1.402 13.125 0 11.723 0 10s1.402-3.125 3.125-3.125c.937 0 1.78.415 2.353 1.071l6.759-3.853c-.1-.305-.154-.63-.154-.968C12.083 1.402 13.486 0 15.208 0zm0 15c-1.033 0-1.875.84-1.875 1.875 0 1.034.842 1.875 1.875 1.875 1.034 0 1.875-.84 1.875-1.875 0-1.034-.841-1.875-1.875-1.875zM3.125 8.125c-1.033 0-1.875.84-1.875 1.875 0 1.034.842 1.875 1.875 1.875S5 11.035 5 10c0-1.034-.842-1.875-1.875-1.875zM15.208 1.25c-1.033 0-1.875.84-1.875 1.875 0 1.034.842 1.875 1.875 1.875 1.034 0 1.875-.84 1.875-1.875 0-1.034-.841-1.875-1.875-1.875z"
                        transform="translate(-354 -66) translate(354 66) translate(.5)"
                    />
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: getHorizontalPx(20),
        width: getHorizontalPx(20),
        height: getHorizontalPx(20),
    },
});

export default ShareBtn;
