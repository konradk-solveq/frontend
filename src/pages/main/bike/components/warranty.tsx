import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {BodyPrimary} from '@components/texts/texts';
import colors from '@theme/colors';
import {HorizontalDivider} from '@components/divider';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';

interface Props {
    style?: any;
    type: string;
    nextOverview: number | null | undefined;
    warranty: any;
    details: any;
}

const Warranty: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('MainBike');

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

    const warrantyText = !props.nextOverview
        ? t('warranty.noInfo')
        : `${props.nextOverview} ${props.warranty.days}`;
    return (
        <View style={props.style}>
            <View>
                <View style={styles.textLine}>
                    <BodyPrimary style={styles.leftText}>
                        {props.warranty.state}
                    </BodyPrimary>
                    <BodyPrimary style={styles.rightText}>
                        {props.type}
                    </BodyPrimary>
                </View>
                <HorizontalDivider
                    width={getFVerticalPx(1)}
                    color={colors.grey}
                />
                <View style={styles.textLine}>
                    <BodyPrimary style={styles.leftText}>
                        {props.warranty.nextOverview}
                    </BodyPrimary>
                    <BodyPrimary style={styles.rightText}>
                        {warrantyText}
                    </BodyPrimary>
                </View>
            </View>
        </View>
    );
};

export default Warranty;
