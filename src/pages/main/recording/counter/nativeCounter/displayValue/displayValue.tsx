import React from 'react';
import {TextStyle} from 'react-native';
import {Text} from 'react-native';

import styles from './style';

interface IProps {
    value: string | number;
    suffix?: string;
    noSpace?: boolean;
    style?: TextStyle;
}

const DisplayValue: React.FC<IProps> = ({
    value,
    suffix,
    noSpace,
    style,
}: IProps) => {
    return (
        <Text style={[styles.displayValue, style]}>
            {value}
            {noSpace ? '' : ' '}
            {suffix && <Text style={styles.displayValueSuffix}>{suffix}</Text>}
        </Text>
    );
};

export default DisplayValue;
