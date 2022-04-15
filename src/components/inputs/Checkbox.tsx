import React, {useMemo} from 'react';
import {View, Pressable, ViewStyle, StyleSheet, Insets} from 'react-native';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    checked: boolean;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
    iconColor?: string;
    style?: ViewStyle;
    hitSlop?: number | Insets | null;
}

interface IIconProps {
    color: string;
    size: number;
}

const CheckIcon = ({color, size}: IIconProps) => {
    const width = getFVerticalPx((size * 13) / 18);
    const height = getFVerticalPx((size * 10) / 18);
    return (
        <Svg width={width} height={height} viewBox="0 0 13 10" fill="none">
            <Path
                d="M1.27172 5.41553L4.58449 8.7283L11.3054 2.00735"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

const Checkbox = ({
    checked,
    iconColor = colors.white,
    backgroundColor = colors.black,
    size = 18,
    onPress,
    style,
    hitSlop,
}: IProps) => {
    const dimensionStyles = useMemo(
        () => ({
            width: getFVerticalPx(size),
            height: getFVerticalPx(size),
            borderWidth: getFVerticalPx(size / 9),
            borderRadius: getFVerticalPx(size / 9),
        }),
        [size],
    );
    return (
        <Pressable onPress={onPress} hitSlop={hitSlop}>
            <View
                style={[
                    styles.container,
                    dimensionStyles,
                    style,
                    checked && {backgroundColor: backgroundColor},
                    {borderColor: backgroundColor},
                ]}>
                {checked && <CheckIcon color={iconColor} size={size} />}
            </View>
        </Pressable>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stretch: {
        width: '100%',
        height: '100%',
    },
});
