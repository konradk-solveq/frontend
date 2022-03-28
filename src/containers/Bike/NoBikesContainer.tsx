import React from 'react';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import colors from '@theme/colors';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {appContainerHorizontalMargin} from '@theme/commonStyle';

import {PrimaryButton, SecondaryButton} from '@components/buttons';
import {BikeSvg} from '@components/svg';
import {Header2, Header3} from '@components/texts/texts';
import ServicePointsTile from '@pages/main/bike/components/tiles/ServicePointsTile';

interface IProps {
    onPressPrimary: (e: GestureResponderEvent) => void;
    onPressSecondary: (e: GestureResponderEvent) => void;
    onPressTile: (e: GestureResponderEvent) => void;
}

const NoBikesContainer: React.FC<IProps> = ({
    onPressPrimary,
    onPressSecondary,
    onPressTile,
}: IProps) => {
    const {t} = useMergedTranslation('MainBike.noBikes');

    return (
        <View style={styles.container}>
            <View style={styles.tileContainer}>
                <View style={[styles.tile, styles.upperTile]}>
                    <View style={styles.imageContainer}>
                        <BikeSvg />
                    </View>
                    <View
                        style={[styles.upperTextWrapper, styles.bottomPadding]}>
                        <Header2 algin="center" style={styles.upperHeader}>
                            {t('addBikeTile.header')}
                        </Header2>
                        <Header3 algin="center" color={colors.darkGrey}>
                            {t('addBikeTile.body')}
                        </Header3>
                    </View>
                    <View
                        style={[
                            styles.bottomPadding,
                            {paddingHorizontal: getFHorizontalPx(32)},
                        ]}>
                        <PrimaryButton
                            text={t('addBikeTile.primaryButton')}
                            onPress={onPressPrimary}
                            withoutShadow
                            style={styles.primaryButton}
                        />
                        <SecondaryButton
                            text={t('addBikeTile.secondaryButton')}
                            onPress={onPressSecondary}
                            withoutShadow
                        />
                    </View>
                </View>
            </View>
            <ServicePointsTile onPressTile={onPressTile} />
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
    upperTile: {
        height: getFVerticalPx(377),
    },
    bottomTile: {
        height: getFVerticalPx(240),
    },
    imageContainer: {
        paddingBottom: getFVerticalPx(8),
        width: getFHorizontalPx(105),
        justifyContent: 'center',
        height: getFHorizontalPx(105),
    },
    upperTextWrapper: {
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

export default NoBikesContainer;
