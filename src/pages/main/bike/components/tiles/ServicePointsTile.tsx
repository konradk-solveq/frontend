import {
    Pressable,
    View,
    StyleSheet,
    GestureResponderEvent,
    ViewStyle,
} from 'react-native';
import {TextIcon} from '@components/icons';
import {IconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {Header2, Paragraph, BodyPrimary} from '@components/texts/texts';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

interface IProps {
    onPressTile: (e: GestureResponderEvent) => void;
    style?: ViewStyle;
}

export default ({onPressTile, style}: IProps) => {
    const {t} = useMergedTranslation('MainBike.noBikes');
    return (
        <View style={[styles.tileContainer, style]}>
            <Pressable onPress={onPressTile}>
                <View style={styles.tile}>
                    <View style={styles.serviceImageContainer}>
                        <TextIcon
                            icon={IconFont.FONT_ICON_MAP_SERVICES}
                            iconColor={colors.white}
                        />
                    </View>
                    <View
                        style={[styles.upperTextWrapper, styles.bottomPadding]}>
                        <Header2 algin="center">
                            {t('servicesTile.header')}
                        </Header2>
                        <Paragraph
                            algin="center"
                            color={colors.darkGrey}
                            style={{
                                paddingBottom: getFVerticalPx(24),
                            }}>
                            {t('servicesTile.body')}
                        </Paragraph>
                        <BodyPrimary color={colors.red} algin="center">
                            {t('servicesTile.button')}
                        </BodyPrimary>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    tileContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    tile: {
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: getFVerticalPx(24),
        borderRadius: getFVerticalPx(12),
        marginBottom: getFVerticalPx(16),
        height: getFVerticalPx(240),
    },
    upperTextWrapper: {
        marginHorizontal: getFHorizontalPx(12),
    },
    bottomPadding: {
        paddingBottom: getFVerticalPx(24),
    },
    serviceImageContainer: {
        borderRadius: 50,
        backgroundColor: 'black',
        width: getFHorizontalPx(56),
        height: getFHorizontalPx(56),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getFVerticalPx(16),
    },
});
