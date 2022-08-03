import React, {useContext, useEffect, useMemo} from 'react';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';
import {
    useGetAverageSpeed,
    useRecordingTimer,
} from '@containers/Recording/hooks';
import {
    DEFAULT_DISTANCE,
    DEFAULT_SPEED,
} from '@hooks/utils/localizationTracker';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {HorizontalSpacer} from '@components/divider';
import {BodySecondary, Header1, Header3} from '@components/texts/texts';
import {
    DistanceSvg,
    SpeedAvgSvg,
    SpeedSvg,
    StoperSvg,
} from '@components/svg/icons';
import {SecondaryButton} from '@components/buttons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface IProps {
    onOpenPress: (e: GestureResponderEvent) => void;
    started: boolean;
    startTime?: Date;
    topSpace?: number;
}

const FullMetrics: React.FC<IProps> = ({
    onOpenPress,
    started,
    startTime,
    topSpace = 0,
}: IProps) => {
    const {t} = useMergedTranslation('MainCounter.metrics.full');
    const {top} = useSafeAreaInsets();
    const topMargin = useSharedValue(0);
    const topMarginAnimated = useAnimatedStyle(() => ({
        height: withTiming(topMargin.value, {
            duration: topMargin.value ? 350 : 950,
        }),
    }));

    const speed =
        useContext(CounterDataContext).trackerData?.speed || DEFAULT_SPEED;
    const distance =
        useContext(CounterDataContext).trackerData?.distance ||
        DEFAULT_DISTANCE;
    const pauseTime = useContext(CounterDataContext).pauseTime;
    const time = useRecordingTimer(startTime, started, pauseTime);
    const avgSpeed = useGetAverageSpeed(startTime, started);
    const averageSpeed = useMemo(() => avgSpeed, [avgSpeed]);

    /**
     * Add additional space when there are notifications
     */
    useEffect(() => {
        topMargin.value = topSpace;
    }, [topSpace, topMargin]);

    return (
        <>
            <Animated.View style={topMarginAnimated} />
            <HorizontalSpacer height={60 + top} />

            <View style={styles.tilesContainer}>
                <View style={styles.row}>
                    <View style={styles.tile}>
                        <StoperSvg />
                        <View style={styles.timerRow}>
                            <Header1 style={styles.textDistance}>
                                {`${time.hoursWithMinutes}:`}
                            </Header1>
                            <Header3
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={[styles.seconds, styles.textDistance]}>
                                {time.dzSeconds}
                            </Header3>
                        </View>
                        <BodySecondary>{t('time')}</BodySecondary>
                    </View>
                    <View style={styles.tile}>
                        <DistanceSvg />
                        <Header1 style={styles.textDistance}>
                            {distance}
                        </Header1>
                        <BodySecondary>{t('distance')}</BodySecondary>
                    </View>
                </View>

                <HorizontalSpacer height={16} />

                <View style={styles.row}>
                    <View style={styles.tile}>
                        <SpeedSvg />
                        <Header1 style={styles.textDistance}>{speed}</Header1>
                        <BodySecondary>{t('speed')}</BodySecondary>
                    </View>
                    <View style={styles.tile}>
                        <SpeedAvgSvg />
                        <Header1 style={styles.textDistance}>
                            {averageSpeed}
                        </Header1>
                        <BodySecondary>{t('averageSpeed')}</BodySecondary>
                    </View>
                </View>
            </View>

            <HorizontalSpacer height={16} />

            <View style={styles.closeButtonContainer}>
                <SecondaryButton
                    icon={MykrossIconFont.MYKROSS_ICON_MAP}
                    text="Pokaż mapę"
                    onPress={onOpenPress}
                    withoutShadow
                    style={{width: getFHorizontalPx(201)}}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tilesContainer: {},
    tile: {
        height: getFVerticalPx(124),
        width: getFHorizontalPx(171),
        borderRadius: getFHorizontalPx(12),
        padding: getFVerticalPx(16),
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
    },
    textDistance: {
        marginTop: getFVerticalPx(8),
        marginBottom: getFVerticalPx(4),
    },
    closeButtonContainer: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timerRow: {
        flexDirection: 'row',
    },
    seconds: {
        alignSelf: 'flex-end',
        paddingBottom: getFVerticalPx(2),
    },
});

export default React.memo(FullMetrics);
