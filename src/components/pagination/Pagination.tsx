import {getFHorizontalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {PaginationDot} from '@components/pagination';
import React from 'react';

interface IProps {
    maxIndex: number;
    activeIndex?: number;
    dotSize?: number;
    transitionDuration?: number;
    spacing?: number;
    activeColor?: string;
    inactiveColor?: string;
    style?: StyleProp<ViewStyle>;
}

const Pagination = ({
    maxIndex,
    activeIndex,
    dotSize = getFHorizontalPx(8),
    transitionDuration = 500,
    spacing,
    activeColor = colors.red,
    inactiveColor = colors.greyish,
    style,
}: IProps) => {
    return (
        <View style={[styles.container, style]}>
            {[...Array(maxIndex)].map((_, index) => (
                <PaginationDot
                    active={index === activeIndex}
                    size={dotSize}
                    transitionDuration={transitionDuration}
                    style={{marginLeft: index && (spacing ?? dotSize)}}
                    activeColor={activeColor}
                    inactiveColor={inactiveColor}
                />
            ))}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
