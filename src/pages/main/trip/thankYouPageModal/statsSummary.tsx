import {getFontSize, getVerticalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {I18n} from '../../../../../I18n/I18n';

const StatsSummary = () => {
    const trans: any = I18n.t('ThankYouPage');

    return (
        <View>
            <View style={styles.rowWrapper}>
                <View style={styles.row}>
                    <Text style={styles.label}>{trans.distance}</Text>
                    <Text style={styles.text}>
                        102,00{' '}
                        <Text style={styles.sufix}>{trans.distanceSufix}</Text>
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{trans.tripTime}</Text>
                    <Text style={styles.text}>
                        1:32{' '}
                        <Text style={styles.sufix}>{trans.tripTimeSufix}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.pauseSummaryWrapper}>
                <Text style={styles.pauseSummary}>
                    {`${trans.pausePrefix} `}
                    <Text style={styles.pauseSummaryValue}>0:30</Text>
                    {` ${trans.pauseSufix}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'row',
        marginTop: getVerticalPx(35),
    },
    row: {
        width: '50%',
    },
    label: {
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        fontFamily: 'DIN2014Narrow-Light',
    },
    text: {
        fontSize: getFontSize(57),
        fontFamily: 'DIN2014Narrow-Regular',
    },
    sufix: {
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        fontFamily: 'DIN2014Narrow-Regular',
    },
    pauseSummaryWrapper: {
        marginTop: getVerticalPx(20),
    },
    pauseSummary: {
        fontSize: getFontSize(18),
        letterSpacing: 0.5,
        textAlign: 'center',
        fontFamily: 'DIN2014Narrow-Light',
    },
    pauseSummaryValue: {
        fontSize: getFontSize(23),
        fontFamily: 'DIN2014Narrow-Regular',
    },
});

export default StatsSummary;
