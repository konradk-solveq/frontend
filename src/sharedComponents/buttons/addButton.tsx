import React from 'react';
import {StyleSheet, View, ViewStyle, Pressable} from 'react-native';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import PlusSvg from '@components/svg/PlusSvg';

interface IProps {
    onPress: Function;
    containerStyle?: ViewStyle;
    iconStyle?: ViewStyle;
    disabled?: boolean;
}

const AddBtn: React.FC<IProps> = ({
    onPress,
    containerStyle,
    disabled,
}: IProps) => {
    return (
        <Pressable
            onPress={() => onPress()}
            disabled={disabled}
            style={containerStyle}>
            <View style={styles.button}>
                <View style={styles.icon}>
                    <PlusSvg />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: getFHorizontalPx(109),
        height: getFVerticalPx(81),
        borderRadius: getFVerticalPx(10),
        backgroundColor: colors.whiteGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: getFVerticalPx(24),
        height: getFVerticalPx(24),
        borderRadius: getFVerticalPx(12),
        backgroundColor: colors.lightRed,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddBtn;
