import React, {useMemo} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

import colors from '@theme/colors';
import {IconFont, MykrossIconFont} from '@theme/enums/iconFonts';
import {getFHorizontal, getFVerticalPx} from '@theme/utils/appLayoutDimensions';

import {TextIcon} from '@components/icons';
import {BodyPrimary} from '@components/texts/texts';
import {HorizontalDivider} from '@components/divider';

interface IProps {
    text: string;
    onPress: () => void;
    isSelected?: boolean;
    selectedItemColor?: string;
    selectedItemIcon?: MykrossIconFont | IconFont;
    containerStyle?: ViewStyle;
    style?: ViewStyle;
    testID?: string;
}

const DropdownItem: React.FC<IProps> = ({
    text,
    onPress,
    selectedItemColor = colors.red,
    isSelected,
    selectedItemIcon,
    containerStyle,
    style,
    testID = 'dropdown-item-test-id',
}: IProps) => {
    const pickedItemStyle = useMemo(
        () => (isSelected ? {color: selectedItemColor} : {}),
        [isSelected, selectedItemColor],
    );

    return (
        <View style={[styles.container, containerStyle]} testID={testID}>
            <View style={[styles.listItem, style]}>
                <Pressable onPress={onPress} testID={`${testID}-button`}>
                    <View style={styles.textWrapper}>
                        <BodyPrimary
                            style={pickedItemStyle}
                            testID={`${testID}-text`}>
                            {text}
                        </BodyPrimary>
                        {isSelected && selectedItemIcon && (
                            <TextIcon
                                icon={selectedItemIcon}
                                iconSize={12}
                                style={styles.icon}
                                testID={`${testID}-icon`}
                            />
                        )}
                    </View>
                </Pressable>
            </View>
            <HorizontalDivider />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    listItem: {
        opacity: 1,
        height: getFVerticalPx(48),
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: getFHorizontal(10),
    },
});

export default DropdownItem;
