import React from 'react';
import {StyleSheet, Pressable, View, ViewStyle} from 'react-native';
import RemoveSvg from '@components/svg/RemoveSvg';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';

interface IProps {
    onPress: () => void;
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
    testID?: string;
}

const RemoveBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    testID,
}: IProps) => {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={getFVerticalPx(10)}
            testID={testID}>
            <View style={[styles.container, containerStyle]}>
                <RemoveSvg />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: getFVerticalPx(24),
        height: getFVerticalPx(24),
        borderRadius: getFVerticalPx(12),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RemoveBtn;
