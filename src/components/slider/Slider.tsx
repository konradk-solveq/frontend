import React, {useMemo, useCallback} from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';
import RangeSlider from 'rn-range-slider';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    min: number;
    max: number;
    step: number;
    onValueChange: (low: number, high: number) => void;
    low?: number;
    high?: number;
    thumbColor?: string;
    disabledThumbColor?: string;
    railColor?: string;
    selectedRailColor?: string;
    disabled?: boolean;
    style?: ViewStyle | ViewStyle[];
    thumbStyle?: ViewStyle | ViewStyle[];
    railStyle?: ViewStyle | ViewStyle[];
    selectedRailStyle?: ViewStyle | ViewStyle[];
    testID?: string;
}

const Slider: React.FC<IProps> = ({
    min,
    max,
    step,
    onValueChange,
    high,
    low,
    thumbColor = colors.white,
    railColor = colors.transparentGrey,
    selectedRailColor = colors.red,
    disabledThumbColor = colors.grey,
    disabled = false,
    style = styles.slider,
    thumbStyle = styles.thumb,
    railStyle = styles.rail,
    selectedRailStyle = styles.selectedRail,
    testID = 'slider-test-id',
}: IProps) => {
    const tColor = useMemo(() => (disabled ? disabledThumbColor : thumbColor), [
        disabled,
        thumbColor,
        disabledThumbColor,
    ]);
    const renderThumb = useCallback(
        () => (
            <View
                style={[styles.shadow, thumbStyle, {backgroundColor: tColor}]}
                testID={`${testID}-thumb`}
            />
        ),
        [tColor, testID, thumbStyle],
    );
    const renderRail = useCallback(
        () => (
            <View
                style={[railStyle, {backgroundColor: railColor}]}
                testID={`${testID}-rail`}
            />
        ),
        [railColor, railStyle, testID],
    );
    const renderRailSelected = useCallback(
        () => (
            <View
                style={[
                    selectedRailStyle,
                    {backgroundColor: selectedRailColor},
                ]}
                testID={`${testID}-selected-rail`}
            />
        ),
        [selectedRailColor, selectedRailStyle, testID],
    );
    return (
        <RangeSlider
            style={style}
            min={min}
            max={max}
            high={high}
            low={low}
            step={step}
            floatingLabel
            disabled={disabled}
            disableRange={disabled}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={onValueChange}
            testID={testID}
        />
    );
};

const styles = StyleSheet.create({
    slider: {width: '100%'},
    thumb: {
        width: getFHorizontalPx(28),
        height: getFVerticalPx(28),
        borderRadius: getFHorizontalPx(14),
    },
    rail: {
        width: '100%',
        height: getFVerticalPx(4),
        borderRadius: getFVerticalPx(2),
    },
    selectedRail: {
        width: '100%',
        height: getFVerticalPx(4),
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowRadius: getFHorizontalPx(13),
        shadowOffset: {height: getFVerticalPx(6), width: 0},
        shadowOpacity: 1,
        elevation: 5,
    },
});

export default Slider;
