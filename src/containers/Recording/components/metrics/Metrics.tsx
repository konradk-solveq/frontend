import React, {useContext, useMemo} from 'react';
import {View, StyleSheet, GestureResponderEvent, Pressable} from 'react-native';

import {CounterDataContext} from '@pages/main/recording/counter/context/counterContext';
import {
    useGetAverageSpeed,
    useRecordingTimer,
} from '@containers/Recording/hooks';
import {
    DEFAULT_DISTANCE,
    DEFAULT_SPEED,
} from '@hooks/utils/localizationTracker';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

import {HorizontalSpacer} from '@components/divider';
import {Header1, Header3, Subtitle} from '@components/texts/texts';
import {ChevronUp} from '@components/svg';
import style from '@src/pages/template/styles';

interface IProps {
    onOpenPress: (e: GestureResponderEvent) => void;
    started: boolean;
    startTime?: Date;
}

const Metrics: React.FC<IProps> = ({
    onOpenPress,
    started,
    startTime,
}: IProps) => {
    const {t} = useMergedTranslation('MainCounter.metrics.short');
    const speed =
        useContext(CounterDataContext).trackerData?.speed || DEFAULT_SPEED;
    const distance =
        useContext(CounterDataContext).trackerData?.distance ||
        DEFAULT_DISTANCE;
    const time = useRecordingTimer(startTime, started);
    const avgSpeed = useGetAverageSpeed(startTime, started);
    const averageSpeed = useMemo(() => avgSpeed, [avgSpeed]);

    return (
        <>
            <HorizontalSpacer height={48} />

            <View style={styles.openButtonContainer}>
                <Pressable onPress={onOpenPress} hitSlop={20}>
                    <ChevronUp />
                </Pressable>
            </View>

            <View style={styles.row}>
                <View style={styles.cell}>
                    <View>
                        <View style={styles.row}>
                            <Header1 adjustsFontSizeToFit numberOfLines={1}>
                                {`${time.hoursWithMinutes}:`}
                            </Header1>
                            <Header3
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={styles.seconds}>
                                {time.dzSeconds}
                            </Header3>
                        </View>
                        <Subtitle>{t('time')}</Subtitle>
                    </View>
                </View>
                <View style={[styles.cell, styles.aligntToCenter]}>
                    <View>
                        <Header1 adjustsFontSizeToFit numberOfLines={1}>
                            {distance}
                        </Header1>
                        <Subtitle>{t('distance')}</Subtitle>
                    </View>
                </View>
                <View style={[styles.cell, styles.aligntToCenter]}>
                    <View>
                        <Header1 adjustsFontSizeToFit numberOfLines={1}>
                            {speed}
                        </Header1>
                        <Subtitle>{t('speed')}</Subtitle>
                    </View>
                </View>
                <View style={[styles.cell, styles.alignToRight]}>
                    <View>
                        <Header1 adjustsFontSizeToFit numberOfLines={1}>
                            {averageSpeed}
                        </Header1>
                        <Subtitle>{t('averageSpeed')}</Subtitle>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cell: {
        width: getFHorizontalPx(60),
        justifyContent: 'center',
        padding: 0,
    },
    startButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 11,
    },
    openButtonContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        top: getFVerticalPx(8),
    },
    aligntToCenter: {
        alignItems: 'center',
    },
    alignToRight: {
        alignItems: 'flex-end',
    },
    seconds: {
        alignSelf: 'flex-end',
        paddingBottom: getFVerticalPx(2),
    },
});

export default Metrics;
