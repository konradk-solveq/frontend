import React, {useEffect, useRef} from 'react';
import {TextStyle, Animated} from 'react-native';

import styles from './style';

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
    const valueFontSize = useRef(new Animated.Value(57)).current;
    const suffixFontSize = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        if (fontSize) {
            Animated.timing(valueFontSize, {
                toValue: fontSize,
                duration: 300,
                useNativeDriver: false,
            }).start();

            Animated.timing(suffixFontSize, {
                toValue: fontSize === 57 ? 18 : 14,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [fontSize, valueFontSize, suffixFontSize]);

    return (
        <Animated.Text style={[styles.value, style, {fontSize: valueFontSize}]}>
            {value}
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
