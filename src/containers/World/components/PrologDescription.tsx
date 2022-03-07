import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {ReactionsType} from '@models/map.model';

import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {BodyPrimary, BodySecondary, Header2} from '@components/texts/texts';
import {TextIcon} from '@components/icons';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {getDifficultyString} from '@containers/World/utils/transformRouteDataStrings';

interface IProps {
    name?: string;
    distance?: string;
    time?: string;
    distanceToRoute?: string;
    difficultiesLevels?: string[];
    reactions?: ReactionsType;
    testID?: string;
}

const PrologDescription: React.FC<IProps> = ({
    name,
    distance = '-',
    time = '-',
    distanceToRoute = '-',
    difficultiesLevels,
    reactions,
    testID = 'prolog-description-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details');
    const difficultyLevel = useMemo(
        () => getDifficultyString(difficultiesLevels, t('multiDifficulties')),
        [difficultiesLevels, t],
    );

    return (
        <>
            <View
                style={{
                    paddingBottom: getFVerticalPx(16),
                }}
                testID={`${testID}-row1`}>
                <Header2>{name || ''}</Header2>
                <Header2>
                    {distance}km - {time}
                </Header2>
            </View>
            <View style={styles.row} testID={`${testID}-row2`}>
                <BodySecondary>{`${distanceToRoute} ${t(
                    'distanceToStart',
                )}`}</BodySecondary>
                <BodySecondary>{difficultyLevel}</BodySecondary>
            </View>
            <View
                style={[styles.row, styles.flexStart]}
                testID={`${testID}-row3`}>
                <TextIcon
                    icon={MykrossIconFont.MYKROSS_ICON_LIKE_OFF}
                    iconColor={colors.black}
                    style={{
                        marginRight: getFHorizontalPx(8),
                    }}
                />
                <BodyPrimary testID={`${testID}-row3-likes`}>
                    {reactions?.like || 0}
                </BodyPrimary>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: getFVerticalPx(20),
    },
    flexStart: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default PrologDescription;
