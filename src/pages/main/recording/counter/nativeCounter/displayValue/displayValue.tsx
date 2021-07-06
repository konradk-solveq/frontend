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
    const displayFontSize = useRef(new Animated.Value(57)).current;
    const suffixFontSize = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        if (fontSize) {
            Animated.timing(displayFontSize, {
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
    }, [fontSize, displayFontSize, suffixFontSize]);

    return (
        <Animated.Text
            style={[styles.displayValue, style, {fontSize: displayFontSize}]}>
            {value}
            {noSpace ? '' : ' '}
            {suffix && (
                <Animated.Text
                    style={[
                        styles.displayValueSuffix,
                        {fontSize: suffixFontSize},
                    ]}>
                    {suffix}
                </Animated.Text>
            )}
        </Animated.Text>
    );
};

export default DisplayValue;
