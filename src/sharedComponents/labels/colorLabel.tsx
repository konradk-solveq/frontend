import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../helpers/layoutFoo';
import ColorCircle from '../special/colorCircle';

interface IProps {
    text: string;
    colors: Array<string>;
    containerStyle?: ViewStyle;
}

const ColorLabel: React.FC<IProps> = ({
    text,
    colors,
    containerStyle,
}: IProps) => {
    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            marginTop: getVerticalPx(20),
            alignItems: 'center',
            height: getHorizontalPx(29),
            alignSelf: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        colorBall: {
            width: getHorizontalPx(24),
            height: getHorizontalPx(24),
            paddingLeft: getHorizontalPx(15),
            borderRadius: getHorizontalPx(12),
            marginRight: getHorizontalPx(22),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 18,
            color: '#555555',
            paddingRight: getHorizontalPx(15),
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            {colors && <ColorCircle style={styles.colorBall} colors={colors} />}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default ColorLabel;
