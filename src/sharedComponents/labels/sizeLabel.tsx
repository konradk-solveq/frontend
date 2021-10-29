import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
    getFontSize,
} from '../../helpers/layoutFoo';

interface IProps {
    text: string;
    containerStyle?: ViewStyle;
}

const SizeLabel: React.FC<IProps> = ({text, containerStyle}: IProps) => {
    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            marginTop: getVerticalPx(20),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: getHorizontalPx(29),
            borderRadius: getHorizontalPx(15),
            borderColor: '#33555555',
            borderWidth: 1,
            alignSelf: 'flex-start',
        },
        text: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: getFontSize(18),
            color: '#555555',
            paddingLeft: getHorizontalPx(15),
            paddingRight: getHorizontalPx(15),
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default SizeLabel;
