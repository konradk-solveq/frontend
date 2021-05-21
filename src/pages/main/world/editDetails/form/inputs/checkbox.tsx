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
}

const Checkbox: React.FC<IProps> = ({label, value, isValid, onCheck}) => {
    return (
        <View style={styles.row}>
            <View style={styles.checkbox}>
                <CheckBox
                    checked={!!value}
                    wrong={isValid}
                    getCheck={onCheck}
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
        color: '#555555',
    },
});

export default Checkbox;
