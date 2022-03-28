import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getDay, getYear} from '../../../../helpers/overviews';
import {getFHorizontalPx, getFVerticalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';
import {
    Header3,
    Header2,
    BodySecondary,
    Subtitle,
} from '@components/texts/texts';
import Ok from '@pages/main/bike/components/images/ok';
import Warning from '@pages/main/bike/components/images/warning';
import {Overview} from '@models/bike.model';

interface Props {
    style?: any;
    list: any;
    details: any;
    description: any;
    onPress?: Function;
    onReviewPress: (e: Overview) => void;
}

const Reviews: React.FC<Props> = (props: Props) => {
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

    return (
        <View style={props.style}>
            <Header3 style={styles.title}>{props.description.name}</Header3>

            <ScrollView
                horizontal={true}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.list}>
                    {props.list.map((e: Overview, i: number) => (
                        <View
                            style={[
                                styles.item,
                                i === 0 && styles.firstItem,
                                i === props.list.length - 1 && styles.latItem,
                            ]}
                            key={'item_' + i}>
                            <TouchableWithoutFeedback
                                onPress={() => props.onReviewPress(e)}>
                                <View style={styles.box}>
                                    <Header2 style={styles.day}>
                                        {getDay(String(e.date))}
                                    </Header2>
                                    {e.style && (
                                        <View style={styles.icon}>
                                            {e.style.checkmark ? (
                                                <Ok />
                                            ) : (
                                                <Warning />
                                            )}
                                        </View>
                                    )}
                                    <BodySecondary style={styles.year}>
                                        {getYear(String(e.date))}
                                    </BodySecondary>
                                    <Subtitle style={styles.type}>
                                        {e.info}
                                    </Subtitle>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Reviews;
