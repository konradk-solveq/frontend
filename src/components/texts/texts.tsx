import React, {FunctionComponent, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import {getFFontSize} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

/**
 * DIN2014-Demi
 * DIN2014Narrow-Bold
 * DIN2014Narrow-Light
 * DIN2014Narrow-Regular
 * DIN2014-Regular
 * mykross
 */

type PropsT = {
    children: ReactNode;
    algin?: 'left' | 'auto' | 'right' | 'center' | 'justify';
    color?: string;
    adjustsFontSizeToFit?: boolean;
    style?: StyleProp<TextStyle> | undefined;
    testID?: string;
};

export const BodyPrimary: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'body-primary-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(16),
            lineHeight: getFFontSize(24),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.black,
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

export const BodySecondary: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'body-secondary-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Regular',
            fontSize: getFFontSize(16),
            lineHeight: getFFontSize(16),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.darkGrey,
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

export const Paragraph: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'paragraph-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Regular',
            fontSize: getFFontSize(16),
            lineHeight: getFFontSize(24),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.black,
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

export const Subtitle: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'subtitle-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Regular',
            fontSize: getFFontSize(14),
            lineHeight: getFFontSize(16),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.darkGrey,
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

export const Header2: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'header2-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontWeight: '600',
            fontSize: getFFontSize(20),
            lineHeight: getFFontSize(24),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.black,
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

export const Header3: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'header3-test-id',
}: PropsT) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontWeight: '600',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(24),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.black,
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
            color: color ? color : colors.black,
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

export const Demi18h28crop: FunctionComponent<PropsT> = ({
    algin,
    color,
    adjustsFontSizeToFit = false,
    children,
    style,
    testID = 'demi-18-h28-crop-test-id',
}) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'DIN2014-Demi',
            fontSize: getFFontSize(18),
            lineHeight: getFFontSize(28),
            textAlign: algin ? algin : 'left',
            color: color ? color : colors.black,
            overflow: 'hidden',
        },
    });
    return (
        <Text
            numberOfLines={1}
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
            color: color ? color : colors.darkGrey,
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
            color: color ? color : colors.darkGrey,
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
            color: color ? color : colors.darkGrey,
        },
    });
    return (
        <Text testID={testID} style={[styles.text, style]}>
            {children}
        </Text>
    );
};
