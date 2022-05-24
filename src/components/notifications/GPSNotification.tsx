import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {Header3} from '@components/texts/texts';
import {TextIcon} from '@components/icons';

interface IProps {
    title?: string;
    showWhenLocationIsDisabled?: boolean;
    containerStyle?: ViewStyle;
    style?: ViewStyle;
}

const GPSNotification: React.FC<IProps> = ({
    title = '',
    containerStyle,
    style,
}: IProps) => {
    const {top} = useSafeAreaInsets();

    return (
        <View style={[styles.container, {top}, containerStyle]}>
            <View style={[styles.notificationContainer, style]}>
                <TextIcon
                    icon={MykrossIconFont.MYKROSS_ICON_SIGNAL}
                    style={styles.icon}
                />
                <Header3 color={colors.red}>{title}</Header3>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 1000,
    },
    notificationContainer: {
        marginHorizontal: appContainerHorizontalMargin,
        paddingHorizontal: getFHorizontalPx(18),
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: getFVerticalPx(48),
        shadowColor: colors.black,
        shadowRadius: getFHorizontalPx(8),
        shadowOffset: {height: 0, width: getFHorizontalPx(20)},
        shadowOpacity: 0.07,
        elevation: 5,
        borderRadius: getFVerticalPx(16),
        zIndex: 1000,
        alignItems: 'center',
    },
    icon: {
        marginRight: getFHorizontalPx(18),
    },
});

export default React.memo(GPSNotification);
