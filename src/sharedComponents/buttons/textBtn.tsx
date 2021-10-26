import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';

import {getFontSize, getHorizontalPx, getVerticalPx} from '@helpers/layoutFoo';

interface IProps {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const TextBtn: React.FC<IProps> = ({
    text,
    onPress,
    buttonStyle,
    textStyle,
}: IProps) => {
    return (
        <View style={[styles.container, buttonStyle]}>
            <Pressable onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: getHorizontalPx(40),
        alignItems: 'flex-end',
        marginBottom: getVerticalPx(10),
    },
    text: {
        fontSize: getFontSize(16),
        fontFamily: 'DIN2014Narrow-Light',
        letterSpacing: 0.5,
        color: '#3587ea',
    },
});

export default React.memo(TextBtn);
