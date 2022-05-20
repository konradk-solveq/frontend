import React, {useCallback, useMemo} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';

import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BodyPrimary} from '@components/texts/texts';
import colors from '@theme/colors';
import {HorizontalDivider} from '@components/divider';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import {countDaysToEnd} from '@helpers/warranty';
import {
    getWarrantyStatusInfoText,
    getWarrantyStatusInfo,
    getWarrantyTypeText,
    shouldShowWarrantyStatusInfo,
} from '@pages/main/bike/utils/warranty';

const TYPE_NO_INFO = 'no-info';

interface Props {
    style?: any;
    type?: string;
    info: string;
    endDate?: Date;
    onPress: (e: GestureResponderEvent) => void;
}

const Warranty: React.FC<Props> = ({
    style,
    type,
    endDate,
    info,
    onPress,
}: Props) => {
    const {t} = useMergedTranslation('MainBike');
    const daysToEnd = useMemo(() => endDate && countDaysToEnd(endDate), [
        endDate,
    ]);
    const containsWarrantyInfo = type !== TYPE_NO_INFO;
    /**
     * When warranty is not equal to 'no-info' or 'extended',
     * and date is expired Warranty Satus Info should
     * not be displayed.
     */
    const showWarrantyStatusInfo = shouldShowWarrantyStatusInfo(
        type,
        daysToEnd,
    );

    /**
     * Information about warranty type, eg. 'basice', 'extended', 'no-info' etc.
     */
    const warrantyTypeText = getWarrantyTypeText(
        showWarrantyStatusInfo,
        info,
        containsWarrantyInfo,
    );

    const warrantyStatusInfo = getWarrantyStatusInfo(containsWarrantyInfo);

    const warrantyStatusInfoText = getWarrantyStatusInfoText(type, daysToEnd);

    const onPressHandler = useCallback(
        (e: GestureResponderEvent) => {
            if (!containsWarrantyInfo) {
                onPress(e);
            }
        },
        [containsWarrantyInfo, onPress],
    );

    return (
        <View style={style}>
            <View>
                <View style={styles.textLine}>
                    <BodyPrimary style={styles.leftText}>
                        {t('warranty.state')}
                    </BodyPrimary>
                    <BodyPrimary style={styles.rightText}>
                        {warrantyTypeText}
                    </BodyPrimary>
                </View>
                <HorizontalDivider
                    width={getFVerticalPx(1)}
                    color={colors.grey}
                />
                {showWarrantyStatusInfo && (
                    <View style={styles.textLine}>
                        <BodyPrimary style={styles.leftText}>
                            {warrantyStatusInfo}
                        </BodyPrimary>
                        <Pressable
                            style={styles.rightText}
                            onPress={onPressHandler}>
                            <BodyPrimary algin="right">
                                {warrantyStatusInfoText}
                            </BodyPrimary>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
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
