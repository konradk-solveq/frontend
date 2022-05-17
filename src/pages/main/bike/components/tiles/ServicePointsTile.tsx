import {
    Pressable,
    View,
    StyleSheet,
    GestureResponderEvent,
    ViewStyle,
    Image,
} from 'react-native';
import {TextIcon} from '@components/icons';
import {IconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';
import {Header2, BodyPrimary, Header3} from '@components/texts/texts';
import {
    getFVerticalPx,
    getFHorizontalPx,
} from '@theme/utils/appLayoutDimensions';
import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

interface IProps {
    onPressTile: (e: GestureResponderEvent) => void;
    style?: ViewStyle;
    showImage?: boolean;
    testID?: string;
}

export default ({
    onPressTile,
    style,
    showImage,
    testID = 'services-tile-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('MainBike.noBikes');
    return (
        <View style={[styles.tileContainer, style]}>
            <Pressable onPress={onPressTile} testID={testID}>
                <View
                    style={[
                        styles.tile,
                        showImage && {paddingTop: getFVerticalPx(8)},
                    ]}>
                    {showImage ? (
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('@assets/images/services/serviceMap.png')}
                                style={styles.image}
                            />
                        </View>
                    ) : (
                        <View style={styles.serviceImageContainer}>
                            <TextIcon
                                icon={IconFont.FONT_ICON_MAP_SERVICES}
                                iconColor={colors.white}
                            />
                        </View>
                    )}
                    <View
                        style={[styles.upperTextWrapper, styles.bottomPadding]}>
                        <Header2 algin="center">
                            {t('servicesTile.header')}
                        </Header2>
                        <Header3
                            algin="center"
                            color={colors.darkGrey}
                            style={{
                                paddingBottom: getFVerticalPx(24),
                            }}>
                            {t('servicesTile.body')}
                        </Header3>
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
        paddingTop: getFVerticalPx(24),
        borderRadius: getFVerticalPx(12),
        marginBottom: getFVerticalPx(16),
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
        width: getFVerticalPx(56),
        height: getFVerticalPx(56),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getFVerticalPx(16),
    },
    imageContainer: {
        paddingHorizontal: getFHorizontalPx(8),
        width: '100%',
        alignItems: 'center',
    },
    image: {
        marginBottom: getFVerticalPx(16),
        borderRadius: getFVerticalPx(8),
        width: '100%',
    },
});
