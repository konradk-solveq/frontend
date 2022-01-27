import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {modifyReaction} from '@storage/actions/maps';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {Map, ReactionsType} from '@models/map.model';
import {getImageToDisplay} from '@utils/transformData';
import {jsonStringify} from '@utils/transformJson';

import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';

import TileBackground from './tileBackground';
import secondTileStyles from './styles/styleSecondTile';
import FourthSection from './sections/fourthSection';
import ThirdSection from './sections/thirdSection';

import styles from './styles/commonStyles';

interface IProps {
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPress: (state: boolean, mapID: string) => void;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
}

const SecondTile: React.FC<IProps> = ({
    mapData,
    images,
    onPress,
    onPressTile,
    tilePressable,
}: IProps) => {
    const {t} = useMergedTranslation('MainWorld.BikeMap');
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
                    <View>
                        <View
                            style={[
                                styles.firstSection,
                                secondTileStyles.firstSection,
                            ]}>
                            <View
                                style={secondTileStyles.firstSectionLeftColumn}>
                                <View style={secondTileStyles.imageWrapper}>
                                    <View style={secondTileStyles.imageWrapper}>
                                        {imagesToDisplay ? (
                                            <Image
                                                source={{
                                                    uri: imagesToDisplay,
                                                }}
                                                style={secondTileStyles.image}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <RouteImagePlaceholder
                                                noBackgroundImage
                                                containerStyles={
                                                    styles.placeholderLogo
                                                }
                                                logoSize={{
                                                    height: 22,
                                                    width: 28,
                                                }}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View
                                style={
                                    secondTileStyles.firstSectionRightColumn
                                }>
                                <Text
                                    style={styles.tileSectionTitle}
                                    numberOfLines={1}>
                                    {mapData?.name || t('noTitle')}
                                </Text>
                                <View style={styles.firstSectionContent}>
                                    <Text
                                        style={[
                                            styles.distanceToStart,
                                            styles.column,
                                        ]}>
                                        {mapData.distanceToRouteInKilometers}
                                        {t('distanceToStart')}
                                    </Text>
                                    <View
                                        style={[
                                            styles.raitingContainer,
                                            styles.column,
                                        ]}>
                                        <View
                                            style={styles.borderVerticalLine}
                                        />
                                        <Text style={styles.raitingIconFont}>
                                            f
                                        </Text>
                                        <Text style={styles.ratingValue}>
                                            {mapData?.downloads || '-'}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    numberOfLines={2}
                                    style={styles.localizationDescription}>
                                    {mapData?.description?.short || ''}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.borderLine} />
                        <View style={styles.secondtSection}>
                            <View style={styles.sectionContentRow}>
                                <View style={styles.sectionTextRow}>
                                    <View style={styles.bikeIconFontWrap}>
                                        <Text style={styles.bikeIconFont}>
                                            i
                                        </Text>
                                    </View>
                                    <Text style={styles.secondSectionText}>
                                        {mapData.distanceInKilometers || '-'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {t('distanceUnit')}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.sectionTextRow}>
                                    <View style={styles.clockIconFontWrap}>
                                        <Text style={styles.clockIconFont}>
                                            j
                                        </Text>
                                    </View>
                                    <Text style={styles.secondSectionText}>
                                        {mapData?.formattedTimeString || '-:--'}{' '}
                                        <Text
                                            style={styles.secondSectionSuffix}>
                                            {t('timeUnit')}
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

                        <View style={styles.fourthSectionWrap}>
                            <FourthSection
                                key={`${jsonStringify(
                                    mapData?.reactions || 'reactions',
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
                </View>
            </TileBackground>
        </Pressable>
    );
};

export default SecondTile;
