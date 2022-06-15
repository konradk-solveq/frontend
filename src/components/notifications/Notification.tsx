import React from 'react';
import {View, StyleSheet, Pressable, ViewStyle, TextStyle} from 'react-native';
import {TextIcon} from '@components/icons';
import {MykrossIconFont, IconFont} from '@theme/enums/iconFonts';
import {Header3, Subtitle, BodyPrimary} from '@components/texts/texts';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
    getFFontSize,
} from '@helpers/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';

export interface NotificationDataI {
    title: string;
    icon: MykrossIconFont | IconFont | Element;
    subtitle?: string;
    action?: () => void;
    actionText?: string;
}

export interface NotificationI extends NotificationDataI {
    containerStyle?: ViewStyle;
    iconColor?: string;
    iconSize?: number;
    iconStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    actionStyle?: TextStyle;
    withoutShadow?: boolean;
}

const Notification = ({
    title,
    subtitle,
    actionText,
    action,
    icon,
    containerStyle,
    iconColor = colors.red,
    iconSize = getFFontSize(24),
    iconStyle = {},
    titleStyle = {color: colors.red},
    subtitleStyle,
    actionStyle,
    withoutShadow = false,
}: NotificationI) => {
    const showButton = !!(actionText && action);
    const renderBottomRow = showButton || !!subtitle;
    return (
        <View
            style={[
                styles.container,
                !withoutShadow && styles.shadow,
                containerStyle,
            ]}>
            <View style={styles.row}>
                {typeof icon === 'string' ? (
                    <TextIcon
                        icon={icon}
                        iconSize={iconSize}
                        iconColor={iconColor}
                        style={[styles.icon, iconStyle]}
                    />
                ) : (
                    icon
                )}
                <Header3 style={titleStyle}>{title}</Header3>
            </View>
            {renderBottomRow && (
                <View
                    style={[
                        styles.row,
                        styles.bottom,
                        !subtitle && styles.actionOnly,
                    ]}>
                    {!!subtitle && (
                        <Subtitle
                            style={[styles.subtitle, subtitleStyle]}
                            testID={'notification-subtitle'}>
                            {subtitle}
                        </Subtitle>
                    )}
                    {showButton && (
                        <Pressable
                            onPress={action}
                            testID={'notification-action-button'}>
                            <BodyPrimary style={[styles.action, actionStyle]}>
                                {actionText}
                            </BodyPrimary>
                        </Pressable>
                    )}
                </View>
            )}
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginHorizontal: appContainerHorizontalMargin,
        paddingHorizontal: getFHorizontalPx(16),
        paddingVertical: getFVerticalPx(12),
        borderRadius: getFVerticalPx(16),
    },
    shadow: {
        shadowColor: colors.black,
        shadowRadius: getFHorizontalPx(8),
        shadowOffset: {height: 0, width: getFHorizontalPx(20)},
        shadowOpacity: 0.07,
        elevation: 5,
    },
    icon: {
        marginRight: getFHorizontalPx(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        marginTop: getFVerticalPx(12),
        justifyContent: 'space-between',
    },
    subtitle: {
        color: colors.black,
    },
    action: {
        color: colors.red,
    },
    actionOnly: {
        flexDirection: 'row-reverse',
    },
});
