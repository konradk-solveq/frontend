import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {modifyReaction} from '@storage/actions/maps';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {I18n} from '@translations/I18n';
import {Map, ReactionsType} from '@models/map.model';

import TileBackground from './tileBackground';
import RouteImagePlaceholder from '../../../../../sharedComponents/images/routeListImagePlaceholder';
import {getImageToDisplay} from '@utils/transformData';
import {jsonStringify} from '@utils/transformJson';

import styles from './styles/commonStyles';
import nextTileStyles from './styles/styleNextTile';

import FourthSection from './sections/fourthSection';
import ThirdSection from './sections/thirdSection';
import NextTileHeader from './NextTileHeader';
import {getHorizontalPx} from '@src/helpers/layoutFoo';

interface IProps {
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPress: (state: boolean, mapID: string) => void;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    headerTitle?: string;
    sectionID?: string;
}

const NextTile: React.FC<IProps> = ({
    mapData,
    images,
    onPress,
    onPressTile,
    tilePressable,
    headerTitle,
    sectionID,
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
                        sectionID,
                    ),
                );
            }
        },
        [dispatch, likeValue, mapData?.id, sectionID],
    );

    const imagesToDisplay = getImageToDisplay(images);

    return (
        <Pressable onPress={onTilePressedHandler}>
            <TileBackground>
                <View style={styles.container}>
                    {headerTitle && <NextTileHeader text={headerTitle} />}
                    <View>
                        <View
                            style={[
                                styles.firstSection,
                                nextTileStyles.firstSection,
                            ]}>
                            <View style={nextTileStyles.firstSectionLeftColumn}>
                                <View style={nextTileStyles.imageWrapper}>
                                    {imagesToDisplay ? (
                                        <Image
                                            source={{
                                                uri: imagesToDisplay,
                                            }}
                                            style={nextTileStyles.image}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <RouteImagePlaceholder
                                            noBackgroundImage
                                            containerStyles={
                                                styles.placeholderLogo
                                            }
                                            logoSize={{
                                                height: getHorizontalPx(22),
                                                width: getHorizontalPx(28),
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                            <View
                                style={nextTileStyles.firstSectionRightColumn}>
                                <Text
                                    style={styles.tileSectionTitle}
                                    numberOfLines={1}>
                                    {mapData?.name || trans.noTitle}
                                </Text>
                                <View
                                    style={nextTileStyles.firstSectionContent}>
                                    <Text
                                        style={[
                                            styles.distanceToStart,
                                            styles.column,
                                        ]}>
                                        {mapData.distanceToRouteInKilometers}
                                        {trans.distanceToStart}
                                    </Text>
                                    <View
                                        style={[
                                            styles.raitingContainer,
                                            styles.column,
                                        ]}>
                                        <View
                                            style={styles.borderVerticalLine}
                                        />
                                        <View style={styles.raitingIconWrap}>
                                            <Text
                                                style={styles.raitingIconFont}>
                                                f
                                            </Text>
                                        </View>

                                        <Text style={styles.ratingValue}>
                                            {mapData?.downloads || '-'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.borderLine} />
                                <View style={nextTileStyles.secondtSection}>
                                    <View style={styles.sectionContentRow}>
                                        <View style={styles.sectionTextRow}>
                                            <View
                                                style={
                                                    nextTileStyles.bikeIconFontWrap
                                                }>
                                                <Text
                                                    style={
                                                        nextTileStyles.bikeIconFont
                                                    }>
                                                    i
                                                </Text>
                                            </View>
                                            <Text
                                                style={
                                                    styles.secondSectionText
                                                }>
                                                {mapData.distanceInKilometers ||
                                                    '-'}{' '}
                                                <Text
                                                    style={
                                                        styles.secondSectionSuffix
                                                    }>
                                                    {trans.distanceUnit}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.sectionTextRow}>
                                            <View
                                                style={
                                                    nextTileStyles.clockIconFontWrap
                                                }>
                                                <Text
                                                    style={
                                                        nextTileStyles.clockIconFont
                                                    }>
                                                    j
                                                </Text>
                                            </View>
                                            <Text
                                                style={
                                                    styles.secondSectionText
                                                }>
                                                {mapData?.formattedTimeString ||
                                                    '-:--'}{' '}
                                                <Text
                                                    style={
                                                        styles.secondSectionSuffix
                                                    }>
                                                    {trans.timeUnit}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.borderLine} />
                            </View>
                        </View>

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

export default React.memo(NextTile);
