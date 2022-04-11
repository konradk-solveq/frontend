import { Header3, Subtitle } from '@src/components/texts/texts';
import { getFVerticalPx } from '@src/helpers/appLayoutDimensions';
import colors from '@src/theme/colors';
import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface IStatisticElementProps {
    text: string;
    value: string;
}

const StatisticElement: React.FC<IStatisticElementProps> = ({text, value}) => {
    return (
        <View style={styles.columnWrapper}>
            <View style={styles.statRow}>
                <Subtitle>
                    {text}
                </Subtitle>
                <Header3>
                    {value}
                </Header3>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    columnWrapper: {

    },
    statRow: {

    },
    statTitle: {
        color: colors.darkGrey,
        marginBottom: getFVerticalPx(8),
    }
});

export default StatisticElement;
