import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {getVerticalPx} from '@helpers/layoutFoo';

interface IProps {
    text: string;
}

const NextTileHeader: React.FC<IProps> = ({text}: IProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} numberOfLines={1}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f67e83',
        height: getVerticalPx(29),
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 15,
        letterSpacing: 0.42,
        fontFamily: 'DIN2014Narrow-Regular',
    },
});

export default React.memo(NextTileHeader);
