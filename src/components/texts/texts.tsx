import {getFFontSize} from '@src/helpers/appLayoutDimensions';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * DIN2014-Demi
 * DIN2014Narrow-Bold
 * DIN2014Narrow-Light
 * DIN2014Narrow-Regular
 * DIN2014-Regular
 * mykross
 */

type PropsT = {
    algin?: 'left' | 'auto' | 'right' | 'center' | 'justify';
    color?: string;
};

export const Demi18h28: FunctionComponent<PropsT> = ({
    algin,
    color,
    children,
}) => {
    let styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(28),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#333',
        },
    });
    return <Text style={styles.text}>{children}</Text>;
};

export const Demi18h36: FunctionComponent<PropsT> = ({
    algin,
    color,
    children,
}) => {
    let styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(36),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#717171',
        },
    });
    return <Text style={styles.text}>{children}</Text>;
};
