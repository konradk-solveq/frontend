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
}

const FiltersBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 20 14" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M11 12a1 1 0 010 2H9a1 1 0 010-2h2zm4-6a1 1 0 010 2H5a1 1 0 010-2h10zm4-6a1 1 0 010 2H1a1 1 0 110-2h18z"
                    />
                </Svg>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: 20,
        width: 20,
        height: 20,
    },
});

export default FiltersBtn;
