import React, {ReactElement} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ViewStyle,
    TextStyle,
} from 'react-native';
import {setObjSize, getHorizontalPx} from '@helpers/layoutFoo';

interface IProps {
    text: string;
    onPress: Function;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: ReactElement;
    testID?: string;
}

const BikeButton: React.FC<IProps> = ({
    text,
    onPress,
    buttonStyle,
    textStyle,
    icon,
    testID,
}: IProps) => {
    setObjSize(334, 50);
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getHorizontalPx(16),
            color: '#555555',
            marginLeft: getHorizontalPx(5),
            marginRight: getHorizontalPx(15),
        },
        button: {
            paddingLeft: getHorizontalPx(10),
            justifyContent: 'center',
            marginLeft: 0,
            alignItems: 'center',
            flexDirection: 'row',
            height: getHorizontalPx(29),
            borderRadius: getHorizontalPx(15),
            backgroundColor: '#f0f0f0',
            width: 'auto',
        },
    });

    return (
        <TouchableWithoutFeedback
            onPress={() => onPress()}
            testID={testID || 'bike-btn'}>
            <View style={[styles.button, buttonStyle]}>
                {icon && icon}
                <Text
                    style={[styles.text, textStyle]}
                    ellipsizeMode="clip"
                    numberOfLines={1}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BikeButton;
