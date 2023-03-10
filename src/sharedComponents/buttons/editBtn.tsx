import {getHorizontalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: StyleProp<ViewStyle>;
    testID?: string;
}

const EditBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    iconStyle,
    testID,
}: IProps) => {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>
            <View style={containerStyle} testID={testID || 'edit-btn'}>
                <Svg viewBox="0 0 20 20" style={[styles.icon, iconStyle]}>
                    <Path
                        fill="#313131"
                        fill-rule="nonzero"
                        d="M2 13.8L6.2 18 0 20l2-6.2zM13.163 2.605l4.242 4.243-9.758 9.758-4.242-4.243 9.758-9.758zM15.5.3c.4-.4 1-.4 1.4 0l2.8 2.8c.4.4.4 1 0 1.4l-.9.9-4.2-4.2z"
                    />
                </Svg>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    icon: {
        margin: getHorizontalPx(20),
        width: getHorizontalPx(20),
        height: getHorizontalPx(20),
    },
});

export default EditBtn;
