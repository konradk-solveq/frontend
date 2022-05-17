import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getDay, getYear} from '@helpers/overviews';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {
    Header3,
    Header2,
    BodySecondary,
    Subtitle,
} from '@components/texts/texts';
import {Overview} from '@models/bike.model';
import {isInPast} from '@utils/dateTime';
import {checkPeriodic, checkWarranty} from '@utils/bike/warranty';
import Approved from '@components/icons/Approved';
import Warning from '@components/icons/Warning';

interface Props {
    style?: any;
    list: any;
    description: any;
    onReviewPress: (e: Overview) => void;
}

interface RProps {
    overview: Overview;
    index: number;
    listLength: number;
    onReviewPress: (e: Overview) => void;
}

const Review = ({overview, index, listLength, onReviewPress}: RProps) => {
    const isPeriodic = useMemo(() => checkPeriodic(overview.type), [
        overview.type,
    ]);
    const isWarranty = useMemo(() => checkWarranty(overview.type), [
        overview.type,
    ]);
    const icon = useMemo(() => {
        if (!isInPast(overview.date) || !(isWarranty || isPeriodic)) {
            return null;
        }
        if (overview.style?.checkmark) {
            return <Approved />;
        }
        return <Warning />;
    }, [overview.style?.checkmark, overview.date, isPeriodic, isWarranty]);
    return (
        <View
            style={[
                styles.item,
                index === 0 && styles.firstItem,
                index === listLength - 1 && styles.latItem,
            ]}
            key={'item_' + index}>
            <TouchableWithoutFeedback onPress={() => onReviewPress(overview)}>
                <View style={styles.box}>
                    <Header2 style={styles.day}>
                        {getDay(String(overview.date))}
                    </Header2>
                    {overview.style && <View style={styles.icon}>{icon}</View>}
                    <BodySecondary style={styles.year}>
                        {getYear(String(overview.date))}
                    </BodySecondary>
                    <Subtitle style={styles.type}>{overview.info}</Subtitle>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const Reviews: React.FC<Props> = ({
    style,
    list,
    description,
    onReviewPress,
}: Props) => {
    return (
        <View style={style}>
            <Header3 style={styles.title}>{description.name}</Header3>
            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.list}>
                    {list.map((overview: Overview, index: number) => (
                        <Review
                            onReviewPress={onReviewPress}
                            overview={overview}
                            index={index}
                            listLength={list.length}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    title: {
        left: getFHorizontalPx(16),
    },
    scroll: {
        width: '100%',
    },
    list: {
        paddingTop: getFVerticalPx(10),
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    item: {
        marginLeft: getFHorizontalPx(15),
    },
    icon: {
        position: 'absolute',
        top: getFVerticalPx(12),
        right: getFHorizontalPx(16),
    },
    box: {
        borderRadius: getFHorizontalPx(16),
        width: getFHorizontalPx(127),
        height: getFVerticalPx(96),
        backgroundColor: colors.white,
    },
    firstItem: {
        marginLeft: getFHorizontalPx(16),
    },
    latItem: {
        marginRight: getFHorizontalPx(16),
    },
    day: {
        marginTop: getFVerticalPx(12),
        marginLeft: getFHorizontalPx(16),
    },
    year: {
        marginLeft: getFHorizontalPx(16),
    },
    type: {
        marginTop: getFVerticalPx(12),
        marginLeft: getFHorizontalPx(16),
    },
});
