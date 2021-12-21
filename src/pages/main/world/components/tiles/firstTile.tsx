import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { mapReactionsConfigSelector } from '@storage/selectors/app';
import { modifyReaction } from '@storage/actions/maps';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { I18n } from '@translations/I18n';
import { Map, ReactionsType } from '@models/map.model';
import { jsonStringify } from '@utils/transformJson';
import { getImageToDisplay } from '@utils/transformData';

import TileBackground from './tileBackground';
import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';

import styles from './styles/commonStyles';
import firstTileStyles from './styles/styleFirstTile';

import ThirdSection from './sections/thirdSection';
import FourthSection from './sections/fourthSection';

interface IProps {
    mapData: Map;
    images: { images: string[]; mapImg: string };
    onPress: (state: boolean, mapID: string) => void;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
}

const FirstTile: React.FC<IProps> = ({
    mapData,
    images,
    onPress,
    onPressTile,
    tilePressable,
}: IProps) => {
    const trans: any = I18n.t('MainWorld.BikeMap');
    const dispatch = useAppDispatch();

    const config = useAppSelector(mapReactionsConfigSelector);
    const likeValue = config?.find(c => c.enumValue === 'like');
    const likesNumber = likeValue?.enumValue
        ? mapData?.reactions?.[likeValue.enumValue as keyof ReactionsType] || 0
        : 0;

    const [currentLikeNumber, setCurrentLikeNumber] = useState(0);

    useEffect(() => {
        setCurrentLikeNumber(likesNumber);
    }, [likesNumber]);

    const onTilePressedHandler = () => {
        if (!tilePressable || !onPressTile) {
            return;
        }
        onPressTile(mapData.id);
    };

    const onDetailsButtonPressedHandler = () => {
        onPress(true, mapData.id);
    };

    const onLikePressedHandler = useCallback(
        (state: boolean) => {
            setCurrentLikeNumber(prev => (!state ? prev - 1 : prev + 1));
            if (mapData?.id) {
                dispatch(
                    modifyReaction(
                        mapData?.id,
                        likeValue?.enumValue || 'like',
                        !state,
                    ),
                );
            }
        },
        [dispatch, likeValue, mapData?.id],
    );

    const imagesToDisplay = getImageToDisplay(images);

    return (
        <Pressable onPress={onTilePressedHandler}>
            <TileBackground>
                <View style={styles.container}>
                    <View style={styles.imageWrapper}>
                        {imagesToDisplay ? (
                            <Image
                                source={{
                                    uri: imagesToDisplay,
                                }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={[styles.image, styles.noImage]}>
                                <RouteImagePlaceholder />
                            </View>
                        )}
                    </View>
                    <View style={styles.sectionsContainer}>
                        <View style={styles.firstSection}>
                            <Text
                                numberOfLines={1}
                                style={styles.tileSectionTitle}>
                                {mapData?.name || trans.noTitle}
                            </Text>
                            <View style={styles.firstSectionContent}>
                                <Text style={styles.distanceToStart}>
                                    {mapData.distanceToRouteInKilometers}
                                    {trans.distanceToStart}
                                </Text>
                                <View style={styles.raitingContainer}>
                                    <View style={styles.borderVerticalLine} />
                                    <Text style={styles.raitingIconFont}>
                                        f
                                    </Text>
                                    <Text style={styles.ratingValue}>
                                        {mapData?.downloads || '-'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.borderLine} />
                        <View style={styles.secondtSection}>
                            <View style={styles.sectionContentRow}>
                                <View style={styles.sectionTextRow}>
                                    <View style={firstTileStyles.bikeIconFontWrap}>
                                        <Text style={firstTileStyles.bikeIconFont}>
                                            i
                                        </Text>
                                    </View>
                                    <Text style={styles.secondSectionText}>
                                        {mapData.distanceInKilometers || '-'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {trans.distanceUnit}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.sectionTextRow}>
                                    <View style={firstTileStyles.clockIconFontWrap}>
                                        <Text style={firstTileStyles.clockIconFont}>
                                            j
                                        </Text>
                                    </View>
                                    <Text style={styles.secondSectionText}>
                                        {mapData?.formattedTimeString || '-:--'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {trans.timeUnit}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.borderLine} />

                        <ThirdSection
                            firstPickedDifficulty={
                                mapData?.firstPickedDifficulty
                            }
                            firstPickedSurface={mapData?.firstPickedSurface}
                        />
                        <View style={styles.borderLine} />

                        <FourthSection
                            key={`${jsonStringify(
                                mapData?.reactions,
                                'reactions',
                            )}-${mapData?.id}`}
                            likeGaved={
                                mapData.reaction === likeValue?.enumValue
                            }
                            likeValue={currentLikeNumber}
                            onLikePress={onLikePressedHandler}
                            onDetails={onDetailsButtonPressedHandler}
                        />
                    </View>
                </View>
            </TileBackground>
        </Pressable>
    );
};

export default FirstTile;
