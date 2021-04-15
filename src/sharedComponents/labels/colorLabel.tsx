import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../helpers/layoutFoo';

interface IProps {
    text: string;
    containerStyle?: ViewStyle;
}

const ColorLabel: React.FC<IProps> = ({text, containerStyle}: IProps) => {
    setObjSize(334, 50);
    const styles = useMemo(
        () =>
            StyleSheet.create({
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
                    backgroundColor: 'khaki',
                    marginRight: getHorizontalPx(22),
                },
                text: {
                    fontFamily: 'DIN2014Narrow-Regular',
                    fontSize: getHorizontalPx(18),
                    color: '#555555',
                    paddingRight: getHorizontalPx(15),
                },
            }),
        [],
    );

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.colorBall} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default ColorLabel;
