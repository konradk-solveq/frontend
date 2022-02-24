import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import colors from '@theme/colors';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {IconFont, MykrossIconFont} from '@theme/enums/iconFonts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {TransparentButton} from '@components/buttons';
import {DropdownItemT} from '@components/types/dropdown';
import {DropdownItem} from '@components/dropdown';

const ITEM_HEIGHT = 48;
const BOTTOM_AREA_HEIGHT = 64;

interface IProps {
    list: DropdownItemT[];
    buttonText: string;
    buttonIcon?: MykrossIconFont;
    buttonStyle?: ViewStyle;
    buttonContainerStyle?: ViewStyle;
    boxStyle?: ViewStyle;
    withResetButton?: boolean;
    resetButtonText?: string;
    onPressItem?: (elementId: string) => void;
    openOnStart?: boolean;
    style?: ViewStyle;
    testID?: string;
}

const DropdownList: React.FC<IProps> = ({
    list,
    buttonText,
    buttonIcon = MykrossIconFont.MYKROSS_ICON_CHEVRON_DOWN,
    buttonStyle,
    buttonContainerStyle,
    boxStyle,
    withResetButton = true,
    resetButtonText = 'Reset',
    onPressItem,
    openOnStart = false,
    style,
    testID = 'dropdown-test-id',
}: IProps) => {
    const [open, setOpen] = useState(openOnStart || false);

    const dropdownHeight = useMemo(
        () =>
            getFVerticalPx(
                ITEM_HEIGHT * list.length +
                    (withResetButton ? BOTTOM_AREA_HEIGHT : 0),
            ),
        [list, withResetButton],
    );

    const boxHeight = useSharedValue(openOnStart ? dropdownHeight : 0);
    const boxOpacity = useSharedValue(openOnStart ? 1 : 0);
    const itemOpacity = useSharedValue(openOnStart ? 1 : 0);

    const [activeItem, setActiveItem] = useState<string | undefined>();
    const buttonName = useMemo(
        () =>
            activeItem
                ? list.find(el => el.id === activeItem)?.text || buttonText
                : buttonText,
        [activeItem, list, buttonText],
    );

    /**
     * Dropdown box animation style
     */
    const boxAnimation = useAnimatedStyle(() => ({
        height: withTiming(boxHeight.value, {duration: 750}),
        opacity: withTiming(boxOpacity.value, {
            duration: boxOpacity.value ? 350 : 950,
        }),
    }));

    /**
     * Dropdown list animation style
     */
    const dropdownListAnimations = useAnimatedStyle(() => ({
        opacity: withTiming(itemOpacity.value, {
            duration: itemOpacity.value ? 850 : 750,
        }),
    }));

    /**
     * Animate box height and visibility
     */
    useEffect(() => {
        boxHeight.value = open ? dropdownHeight : 0;

        boxOpacity.value = open ? 1 : 0;

        itemOpacity.value = open ? 1 : 0;
    }, [open, boxHeight, boxOpacity, itemOpacity, dropdownHeight]);

    const toggleDropdown = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    /**
     * Trigger action, set clicked item as active and close dropdown
     */
    const onPressListItem = useCallback(
        (id: string) => {
            setActiveItem(id);

            if (onPressItem) {
                onPressItem(id);
            }

            setOpen(false);
        },
        [onPressItem],
    );

    /**
     * Trigger action, reset active item and close dropdown
     */
    const onResetPickedListItem = () => {
        setActiveItem(undefined);
        setOpen(false);
    };

    /**
     * Renders single item
     */
    const renderItem = useCallback(
        (item: DropdownItemT) => {
            /* Check element is set as active */
            const isActiveElement =
                item.id === activeItem || (!activeItem && item.isDefault);
            /* If element contains additional text it will be displayed as suffix */
            const defaultItem =
                (!activeItem && item.isDefault && item.defaultItemSuffix) || '';

            return (
                <DropdownItem
                    key={item.id}
                    text={`${item.text} ${defaultItem}`}
                    onPress={() => onPressListItem(item.id)}
                    isSelected={isActiveElement}
                    selectedItemIcon={IconFont.FONT_ICON_OK}
                    testID={`${testID}-dropdown-item-${item.id}`}
                />
            );
        },
        [activeItem, onPressListItem, testID],
    );

    return (
        <View style={[styles.outerContainer, style]} testID={testID}>
            <TransparentButton
                text={buttonName}
                onPress={toggleDropdown}
                icon={buttonIcon}
                style={{...styles.button, ...buttonStyle}}
                containerStyle={{
                    ...styles.buttonContainer,
                    ...buttonContainerStyle,
                }}
                testID={`${testID}-button`}
            />
            <Animated.View
                style={[styles.container, boxStyle, boxAnimation]}
                testID={`${testID}-items-box`}>
                <Animated.ScrollView
                    style={dropdownListAnimations}
                    testID={`${testID}-items-list`}>
                    {list?.map(el => renderItem(el))}
                    {withResetButton && (
                        <View style={styles.bottomArea}>
                            <TransparentButton
                                text={resetButtonText}
                                onPress={onResetPickedListItem}
                                style={styles.bottomButton}
                                testID={`${testID}-reset-button`}
                            />
                        </View>
                    )}
                </Animated.ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        height: getFVerticalPx(48),
        width: '100%',
        paddingVertical: 2,
    },
    container: {
        width: '100%',
        backgroundColor: colors.white,
        height: 0,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        opacity: 0,
        paddingHorizontal: appContainerHorizontalMargin,
    },
    listItem: {
        opacity: 1,
        height: getFVerticalPx(48),
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomColor: colors.greyish,
        borderBottomWidth: 0.5,
        borderRadius: 1,
    },
    button: {
        height: '100%',
        width: getFHorizontalPx(135),
    },
    buttonContainer: {},
    bottomArea: {
        flex: 1,
        width: '100%',
        height: getFVerticalPx(60),
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    bottomButton: {
        height: '100%',
        width: getFHorizontalPx(115),
    },
});

export default DropdownList;
