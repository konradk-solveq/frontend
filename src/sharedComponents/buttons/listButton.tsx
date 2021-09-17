import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: StyleProp<ViewStyle>;
}

const ListBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 20 20" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M1.043 1.043a1 1 0 0 1 1.414 0L10 8.585l7.543-7.542a1 1 0 0 1 1.497 1.32l-.083.094L11.415 10l7.542 7.543.083.094a1 1 0 0 1-1.497 1.32L10 11.415l-7.543 7.542a1 1 0 0 1-1.497-1.32l.083-.094L8.585 10 1.043 2.457.96 2.363a1 1 0 0 1 .083-1.32z"
                    />
                </Svg>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: 20,
        width: 20,
        height: 20,
    },
});

export default ListBtn;
