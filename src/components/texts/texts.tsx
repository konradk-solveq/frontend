import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {getFFontSize} from '@theme/utils/appLayoutDimensions';

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
    adjustsFontSizeToFit?: boolean;
    style?: TextStyle;
    testID?: string;
};

export const BodyPrimary: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'demi-16-h28-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(16),
            lineHeight: getFFontSize(28),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#333',
        },
    });
    return (
        <Text
            testID={testID}
            style={[styles.text, style]}
            adjustsFontSizeToFit={adjustsFontSizeToFit}>
            {children}
        </Text>
    );
};

export const Demi16h24: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'demi-16-h24-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(28),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#333',
        },
    });
    return (
        <Text
            testID={testID}
            style={[styles.text, style]}
            adjustsFontSizeToFit={adjustsFontSizeToFit}>
            {children}
        </Text>
    );
};

export const Demi18h28: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'demi-18-h28-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(28),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#333',
        },
    });
    return (
        <Text
            testID={testID}
            style={[styles.text, style]}
            adjustsFontSizeToFit={adjustsFontSizeToFit}>
            {children}
        </Text>
    );
};

export const Demi18h36: FunctionComponent<PropsT> = ({
    algin,
    color,
    children,
    style,
    testID = 'demi-18-h36-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(36),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#717171',
        },
    });
    return (
        <Text testID={testID} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

export const Demi16h36: FunctionComponent<PropsT> = ({
    algin,
    color,
    children,
    style,
    testID = 'demi-16-h36-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(16),
            lineHeight: getFFontSize(36),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#717171',
        },
    });
    return (
        <Text testID={testID} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

export const Demi14h48: FunctionComponent<PropsT> = ({
    algin,
    color,
    children,
    style,
    testID = 'demi-14-h48-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(14),
            lineHeight: getFFontSize(48),
            textAlign: algin ? algin : 'left',
            color: color ? color : '#717171',
        },
    });
    return (
        <Text testID={testID} style={[styles.text, style]}>
            {children}
        </Text>
    );
};
