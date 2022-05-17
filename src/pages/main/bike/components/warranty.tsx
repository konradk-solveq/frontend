import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BodyPrimary} from '@components/texts/texts';
import colors from '@theme/colors';
import {HorizontalDivider} from '@components/divider';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {countDaysToEnd} from '@helpers/warranty';

interface Props {
    style?: any;
    type?: string;
    info: string;
    endDate?: Date;
}

const TYPE_EXTENDED = 'extended';

const Warranty: React.FC<Props> = ({style, type, endDate, info}: Props) => {
    const {t} = useMergedTranslation('MainBike');
    const daysToEnd = useMemo(() => endDate && countDaysToEnd(endDate), [
        endDate,
    ]);
    const showInfo = daysToEnd || type === TYPE_EXTENDED;
    const showDate = (daysToEnd && daysToEnd > 0) || type === TYPE_EXTENDED;
    const warrantyEndText =
        type === TYPE_EXTENDED
            ? t('warranty.lifetime')
            : `${daysToEnd} ${t('warranty.days', {count: daysToEnd})}`;
    const warrantyStatusText = showDate ? info : t('warranty.expired');
    return showInfo ? (
        <View style={style}>
            <View>
                <View style={styles.textLine}>
                    <BodyPrimary style={styles.leftText}>
                        {t('warranty.state')}
                    </BodyPrimary>
                    <BodyPrimary style={styles.rightText}>
                        {warrantyStatusText}
                    </BodyPrimary>
                </View>
                <HorizontalDivider
                    width={getFVerticalPx(1)}
                    color={colors.grey}
                />
                {showDate && (
                    <View style={styles.textLine}>
                        <BodyPrimary style={styles.leftText}>
                            {t('warranty.toEnd')}
                        </BodyPrimary>
                        <BodyPrimary style={styles.rightText}>
                            {warrantyEndText}
                        </BodyPrimary>
                    </View>
                )}
            </View>
        </View>
    ) : null;
};

export default Warranty;

const styles = StyleSheet.create({
    textLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: getFHorizontalPx(16),
        marginVertical: getFVerticalPx(16),
    },
    leftText: {
        width: '50%',
        textAlign: 'left',
        color: colors.darkGrey,
    },
    rightText: {
        color: colors.black,
        textAlign: 'right',
        width: '50%',
    },
});
