import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {ReactionsType} from '@models/map.model';

import {MykrossIconFont} from '@theme/enums/iconFonts';
import colors from '@theme/colors';

import {BodyPrimary, BodySecondary, Header2} from '@components/texts/texts';
import {IconButton} from '@components/buttons';
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
    likeReaction?: boolean;
    onPressReaction?: () => void;
    surfaceString?: string;
    testID?: string;
}

const DIFF_PLACEHOLDER = '-';

const PrologDescription: React.FC<IProps> = ({
    name,
    distance = '-',
    time = '-',
    distanceToRoute = '-',
    difficultiesLevels,
    reactions,
    likeReaction = false,
    onPressReaction,
    surfaceString,
    testID = 'prolog-description-test-id',
}: IProps) => {
    const {t} = useMergedTranslation('RoutesDetails.details');
    const difficultyLevel = useMemo(
        () =>
            getDifficultyString(
                difficultiesLevels,
                t('multiDifficulties'),
                DIFF_PLACEHOLDER,
            ),
        [difficultiesLevels, t],
    );

    const onPressReactionHandler = useCallback(() => {
        onPressReaction && onPressReaction();
    }, [onPressReaction]);

    const isDifficultyPlaceholder = useMemo(
        () => difficultyLevel !== DIFF_PLACEHOLDER,
        [difficultyLevel],
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
                <BodySecondary testID={`${testID}-difficulty-surface-info`}>
                    {!(surfaceString && !isDifficultyPlaceholder) &&
                        difficultyLevel}
                    {difficultyLevel !== DIFF_PLACEHOLDER &&
                        !!surfaceString &&
                        ' - '}
                    {surfaceString}
                </BodySecondary>
            </View>
            <View
                style={[styles.row, styles.flexStart]}
                testID={`${testID}-row3`}>
                <IconButton
                    icon={
                        !likeReaction
                            ? MykrossIconFont.MYKROSS_ICON_LIKE_OFF
                            : MykrossIconFont.MYKROSS_ICON_LIKE_ON
                    }
                    iconSize={20}
                    iconColor={colors.black}
                    style={styles.iconButton}
                    onPress={onPressReactionHandler}
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
        paddingBottom: getFVerticalPx(12),
    },
    flexStart: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconButton: {
        paddingRight: getFHorizontalPx(8),
        backgroundColor: 'transparent',
        width: 'auto',
    },
});

export default PrologDescription;
