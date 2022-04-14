import React from 'react';
import {GestureResponderEvent, StyleSheet, View, ViewStyle} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import colors from '@theme/colors';

import {PrimaryButton, SecondaryButton} from '@components/buttons';
import {Header2, Header3} from '@components/texts/texts';
import {BikeSvg} from '@components/svg';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    header?: string;
    image?: Element;
    height?: number | string;
    imageContainer?: ViewStyle;
    testID?: string;
}

const AddBikeTile: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    header,
    image = <BikeSvg />,
    height = getFVerticalPx(377),
    imageContainer,
    testID = 'add-bike-tile',
}: IProps) => {
    const {t} = useMergedTranslation('MainBike.AddBikeTile');
    const th = {height: height};

    return (
        <View style={[styles.tile, th]} testID={testID}>
            <View style={[styles.imageContainer, imageContainer]}>{image}</View>
            <View style={[styles.textWrapper, styles.bottomPadding]}>
                <Header2 algin="center" style={styles.upperHeader}>
                    {header || t('header')}
                </Header2>
                <Header3 algin="center" color={colors.darkGrey}>
                    {t('body')}
                </Header3>
            </View>
            <View
                style={[
                    styles.bottomPadding,
                    {paddingHorizontal: getFHorizontalPx(32)},
                ]}>
                <PrimaryButton
                    text={t('primaryButton')}
                    onPress={onPressPrimary}
                    withoutShadow
                    style={styles.primaryButton}
                    testID={`${testID}-primary-button`}
                />
                <SecondaryButton
                    text={t('secondaryButton')}
                    onPress={onPressSecondary}
                    withoutShadow
                    testID={`${testID}-secondary-button`}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.screenBackgroundPrimary,
        paddingHorizontal: appContainerHorizontalMargin,
        paddingBottom: getFVerticalPx(40),
    },
    tileContainer: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    tile: {
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: getFVerticalPx(24),
        height: getFVerticalPx(377),
        borderRadius: getFVerticalPx(12),
        marginBottom: getFVerticalPx(16),
    },
    imageContainer: {
        marginBottom: getFVerticalPx(8),
        width: getFHorizontalPx(105),
        justifyContent: 'center',
        height: getFHorizontalPx(105),
    },
    textWrapper: {
        marginHorizontal: getFHorizontalPx(12),
    },
    upperHeader: {
        paddingBottom: getFVerticalPx(8),
    },
    primaryButton: {
        marginBottom: getFVerticalPx(16),
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

export default React.memo(AddBikeTile);
