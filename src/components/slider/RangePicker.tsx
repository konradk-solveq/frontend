import React from 'react';
import Slider from '@components/slider/Slider';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    style?: ViewStyle | ViewStyle[];
    options: number[] | string[];
    onValueChange: (low: number | string, high: number | string) => void;
}

const renderLabelItem = (item: number | string, index: number) => (
    <View key={index} style={styles.labelItem}>
        <Text style={styles.labelItemText}>{item}</Text>
    </View>
);

const RangePicker: React.FC<IProps> = ({options, onValueChange, style}) => {
    if (options.length < 2) {
        return null;
    }
    const handleValueChange = (low: number, high: number) => {
        onValueChange(options[low], options[high]);
    };

    return (
        <View style={style}>
            <Slider
                min={0}
                max={options.length - 1}
                step={1}
                onValueChange={handleValueChange}
            />
            <View style={styles.label}>{options.map(renderLabelItem)}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getFVerticalPx(6),
    },
    labelItem: {},
    labelItemText: {
        fontFamily: 'DIN2014-Regular',
        color: colors.darkGrey,
        width: '100%',
    },
});

export default RangePicker;
