import React, {useMemo} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    GestureResponderEvent,
} from 'react-native';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {Header1, Header3, Paragraph} from '@components/texts/texts';
import {firstLetterToUpperCase} from '@utils/strings';
import {getDateString, isInPast} from '@utils/dateTime';
import Approved from '@components/icons/Approved';
import Warning from '@components/icons/Warning';
import BulletRow from '@containers/Bike/components/BulletRow';
import ServicePointsTile from '@pages/main/bike/components/tiles/ServicePointsTile';
import {
    checkSeasonal,
    checkPeriodic,
    checkWarranty,
} from '@utils/bike/warranty';

interface IProps {
    date: string | Date;
    type: string;
    checkmark: string | boolean;
    operations: string[];
    info: string;
    onServicesTilePress: (e: GestureResponderEvent) => void;
    overviewsTitle?: string;
    warning: string;
}

const ReviewDetailsContainer = ({
    date,
    type,
    checkmark,
    operations,
    info,
    overviewsTitle,
    onServicesTilePress,
    warning,
}: IProps) => {
    const displayDate = useMemo(() => getDateString(new Date(date)), [date]);
    const isSeasonal = useMemo(() => checkSeasonal(type), [type]);
    const isPeriodic = useMemo(() => checkPeriodic(type), [type]);
    const isWarranty = useMemo(() => checkWarranty(type), [type]);
    const icon = useMemo(() => {
        if (!isInPast(date) || !(isWarranty || isPeriodic)) {
            return null;
        }
        if (checkmark) {
            return <Approved style={styles.checkmark} />;
        }
        return <Warning style={styles.checkmark} />;
    }, [checkmark, date, isPeriodic, isWarranty]);
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerBackground}>
                {!isSeasonal && (
                    <View style={styles.headerContainer}>
                        <Header1>{displayDate}</Header1>
                        {icon}
                    </View>
                )}
                <Header3 style={styles.subHeader}>
                    {firstLetterToUpperCase(info)}
                </Header3>
            </View>
            {!!overviewsTitle && (
                <Header3 style={styles.overviewTitle}>{overviewsTitle}</Header3>
            )}
            {operations.map(operation => (
                <BulletRow content={operation} />
            ))}
            <ServicePointsTile
                onPressTile={onServicesTilePress}
                showImage
                style={styles.servicesTile}
            />
            <Paragraph style={styles.warning}>{warning}</Paragraph>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: getFHorizontalPx(358),
    },
    headerContainer: {
        marginBottom: getFVerticalPx(8),
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeader: {
        color: colors.darkGrey,
    },
    checkmark: {
        marginLeft: getFHorizontalPx(8),
    },
    headerBackground: {
        height: getFVerticalPx(112),
        backgroundColor: colors.white,
        width: '100%',
        borderRadius: getFHorizontalPx(12),
        marginTop: getFVerticalPx(25),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getFVerticalPx(16),
    },
    overviewTitle: {
        marginBottom: getFVerticalPx(8),
    },
    servicesTile: {
        width: '100%',
        marginTop: getFVerticalPx(32),
        marginBottom: getFVerticalPx(24),
    },
    warning: {
        textAlign: 'center',
        color: colors.red,
    },
    scrollContent: {
        paddingBottom: getFHorizontalPx(48),
    },
});

export default ReviewDetailsContainer;
