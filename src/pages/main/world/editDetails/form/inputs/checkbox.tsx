import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
    getHorizontalPx,
    getVerticalPx,
} from '../../../../../../helpers/layoutFoo';

import CheckBox from '../../../../../../sharedComponents/checkBox/checkBox';

interface IProps {
    label: string;
    value: boolean;
    isValid: boolean;
    onCheck: (v: boolean) => void;
    disabled?: boolean;
}

const Checkbox: React.FC<IProps> = ({
    label,
    value,
    isValid,
    onCheck,
    disabled,
}) => {
    return (
        <View style={styles.row}>
            <View style={styles.checkbox}>
                <CheckBox
                    checked={!!value}
                    wrong={isValid}
                    getCheck={onCheck}
                    disabled={disabled}
                />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: getHorizontalPx(25),
        height: getVerticalPx(25),
        justifyContent: 'center',
    },
    label: {
        marginLeft: getHorizontalPx(25),
        fontFamily: 'DIN2014Narrow-Light',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#555555',
    },
});

export default Checkbox;
