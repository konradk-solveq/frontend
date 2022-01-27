import {getFontSize, getVerticalPx} from '@src/helpers/layoutFoo';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

const StatsSummary = () => {
    const {t} = useMergedTranslation('ThankYouPage');

    return (
        <View>
            <View style={styles.rowWrapper}>
                <View style={styles.row}>
                    <Text style={styles.label}>{t('distance')}</Text>
                    <Text style={styles.text}>
                        102,00{' '}
                        <Text style={styles.sufix}>{t('distanceSuffix')}</Text>
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t('tripTime')}</Text>
                    <Text style={styles.text}>
                        1:32{' '}
                        <Text style={styles.sufix}>{t('tripTimeSuffix')}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.pauseSummaryWrapper}>
                <Text style={styles.pauseSummary}>
                    {`${t('pausePrefix')} `}
                    <Text style={styles.pauseSummaryValue}>0:30</Text>
                    {` ${t('pauseSuffix')}`}
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
