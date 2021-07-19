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
                        d="M18 11a2 2 0 012 2v5a2 2 0 01-2 2H2a2 2 0 01-2-2v-5a2 2 0 012-2h16zm0 2H2v5h16v-5zm0-13a2 2 0 012 2v5a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h16zm0 2H2v5h16V2z"
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
