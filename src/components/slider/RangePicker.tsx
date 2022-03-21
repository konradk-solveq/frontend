import React, {useCallback, useImperativeHandle, Ref} from 'react';
import Slider from '@components/slider/Slider';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {getFHorizontalPx} from '@theme/utils/appLayoutDimensions';
import {useMergedState} from '@hooks/useMergedState';

export type RangePickerRef = {
    reset: () => void;
};

interface IProps {
    style?: ViewStyle | ViewStyle[];
    options: string[];
    onValueChange: (low: string, high: string) => void;
    initLow?: string;
    initHigh?: string;
    ref?: Ref<RangePickerRef | undefined>;
}

const getLabelStyle = (index: number, optionsLength: number) => {
    if (index === 0) {
        return {
            textAlign: 'left',
            flex: 1,
            marginLeft: getFHorizontalPx(-18),
        };
    }
    if (index === optionsLength - 1) {
        return {
            textAlign: 'right',
            flex: 1,
            marginRight: getFHorizontalPx(-18),
        };
    }
    return {textAlign: 'center', flex: 1};
};

const renderLabelItem = (
    item: number | string,
    index: number,
    options: string[],
) => (
    <View key={index} style={[getLabelStyle(index, options.length)]}>
        <Text style={[styles.labelItemText]}>{item}</Text>
    </View>
);

const RangePicker: React.FC<IProps> = React.forwardRef(
    ({options, onValueChange, style, initLow, initHigh}, ref) => {
        console.log(initLow, initHigh);
        const [{low, high}, setRangeValues] = useMergedState({
            low: initLow ? options.findIndex(val => val === initLow) : 0,
            high: initHigh
                ? options.findIndex(val => val === initHigh)
                : options.length - 1,
        });
        const handleValueChange = useCallback(
            (lowInput: number, highInput: number) => {
                setRangeValues({low: lowInput, high: highInput});
                onValueChange(options[lowInput], options[highInput]);
            },
            [onValueChange, options, setRangeValues],
        );

        const reset = () => {
            setRangeValues({
                low: 0,
                high: options.length - 1,
            });
        };

        useImperativeHandle(ref, () => ({
            reset: () => reset(),
        }));

        if (options.length < 2) {
            return null;
        }

        return (
            <View style={style}>
                <Slider
                    min={0}
                    max={options.length - 1}
                    low={low}
                    high={high}
                    step={1}
                    onValueChange={handleValueChange}
                />
                <View style={styles.label}>{options.map(renderLabelItem)}</View>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getFVerticalPx(14),
        paddingHorizontal: getFHorizontalPx(14),
    },
    labelItemText: {
        fontFamily: 'DIN2014-Regular',
        color: colors.darkGrey,
        width: '100%',
        textAlign: 'center',
    },
});

export default RangePicker;
