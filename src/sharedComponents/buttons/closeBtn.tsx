import {getHorizontalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: StyleProp<ViewStyle>;
    iconColor?: string;
}

const CloseBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
    iconColor,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 20 20" style={[styles.icon, iconStyle]}>
                    <Path
                        fill={iconColor || '#313131'}
                        fill-rule="nonzero"
                        d="M1.043 1.043a1 1 0 011.414 0L10 8.585l7.543-7.542a1 1 0 011.497 1.32l-.083.094L11.415 10l7.542 7.543.083.094a1 1 0 01-1.497 1.32L10 11.415l-7.543 7.542a1 1 0 01-1.497-1.32l.083-.094L8.585 10 1.043 2.457.96 2.363a1 1 0 01.083-1.32z"
                    />
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: getHorizontalPx(20),
        width: getHorizontalPx(20),
        height: getHorizontalPx(20),
    },
});

export default CloseBtn;
