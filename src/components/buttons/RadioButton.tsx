import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import colors from '@theme/colors';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {TextIcon} from '@components/icons';
import {BodyPrimary} from '@components/texts/texts';

interface IProps {
    icon: MykrossIconFont | Element;
    onPress: (e: GestureResponderEvent) => void;
    text?: string;
    textColor?: string;
    style?: ViewStyle;
    testID?: string;
}

const RadioButton: React.FC<IProps> = ({
    icon,
    onPress,
    text = '',
    textColor = colors.black,
    style,
    testID = 'radio-button-test-id',
}: IProps) => {
    return (
        <View style={[styles.container, style]} testID={testID}>
            <Pressable onPress={onPress} testID={`${testID}-press`}>
                <View style={styles.row}>
                    <BodyPrimary color={textColor} testID={`${testID}-body`}>
                        {text}
                    </BodyPrimary>
                    <TextIcon icon={icon} iconColor={textColor} />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: getFVerticalPx(48),
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default RadioButton;
