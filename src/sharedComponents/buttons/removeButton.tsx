import {getHorizontalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {StyleSheet, Pressable, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
}

const RemoveBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
}: IProps) => {
    return (
        <Pressable
            onPress={() => onPress()}
            hitSlop={{bottom: 20, top: 0, left: 40, right: 20}}>
            <View style={containerStyle}>
                <Svg viewBox="0 0 16 16" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#D8232A"
                        d="M13.66 2.34c-3.122-3.12-8.198-3.12-11.32 0-3.12 3.122-3.12 8.2 0 11.32A7.98 7.98 0 008 16c2.05 0 4.099-.78 5.66-2.34 3.12-3.12 3.12-8.198 0-11.32zm-2.36 8.02a.664.664 0 010 .943.663.663 0 01-.942 0L8 8.943l-2.357 2.358a.667.667 0 01-.943-.943L7.057 8 4.699 5.642a.668.668 0 01.943-.943L8 7.057l2.358-2.358a.668.668 0 01.943.943L8.943 8l2.358 2.359z"
                    />
                </Svg>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: getHorizontalPx(16),
        height: getHorizontalPx(16),
    },
});

export default RemoveBtn;
