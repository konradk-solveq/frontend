import {pointToComaString} from '@src/helpers/stringFoo';
import React, {useEffect, useRef} from 'react';
import {
    TextStyle,
    Animated,
    Dimensions,
    Platform,
    PixelRatio,
} from 'react-native';
import {getFontSize} from '@helpers/layoutFoo';

import styles from './style';

const bigFont = getFontSize(57);
const smallFont = getFontSize(18);
const smallestFont = getFontSize(14);

interface IProps {
    value: string | number;
    fontSize?: number;
    suffix?: string;
    noSpace?: boolean;
    style?: TextStyle;
}

const DisplayValue: React.FC<IProps> = ({
    value,
    fontSize,
    suffix,
    noSpace,
    style,
}: IProps) => {
    const valueFontSize = useRef(new Animated.Value(bigFont)).current;
    const suffixFontSize = useRef(new Animated.Value(smallFont)).current;

    useEffect(() => {
        if (fontSize) {
            Animated.timing(valueFontSize, {
                toValue: fontSize,
                duration: 300,
                useNativeDriver: false,
            }).start();

            Animated.timing(suffixFontSize, {
                toValue: fontSize === bigFont ? smallFont : smallestFont,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [fontSize, valueFontSize, suffixFontSize]);

    return (
        <Animated.Text style={[styles.value, style, {fontSize: valueFontSize}]}>
            {pointToComaString(value)}
            {suffix && (
                <Animated.Text
                    style={[styles.valueSuffix, {fontSize: suffixFontSize}]}>
                    {noSpace ? '' : ' '}
                    {suffix}
                </Animated.Text>
            )}
        </Animated.Text>
    );
};

export default DisplayValue;
