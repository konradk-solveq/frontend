import React from 'react';
import {
    ViewStyle,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {getHorizontalPx} from '@helpers/layoutFoo';

interface IProps {
    style?: ViewStyle;
    gaved: boolean;
    onpress: () => void;
    iconSize?: number;
    value: number;
}

const Like: React.FC<IProps> = ({
    style,
    gaved,
    onpress,
    iconSize,
    value,
}: IProps) => {
    const size = iconSize || 10;

    const styles = StyleSheet.create({
        wrap: {
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        svg: {
            width: getHorizontalPx(size),
            height: getHorizontalPx(size),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Regular',
            color: '#313131',
            fontSize: 23,
            position: 'relative',
            marginLeft: 5,
        },
        iconFontWrap: {
            top: Platform.OS === 'ios' ? -2 : 0,
        },
        iconFont: {
            marginLeft: 0,
            marginRight: 5,
            fontFamily: 'mykross',
            fontSize: iconSize,
            color: '#3587EA',
        },
    });

    return (
        <TouchableOpacity testID="like-btn" style={style} onPress={onpress}>
            <View style={styles.wrap}>
                <View style={styles.iconFontWrap}>
                    <Text style={styles.iconFont}>{gaved ? 'L' : 'l'}</Text>
                </View>
                <Text style={styles.text}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Like;
