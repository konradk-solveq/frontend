import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import {Map, ReactionsType} from '@models/map.model';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {modifyReaction} from '@storage/actions/maps';
import {
    Demi14h48,
    Demi16h36,
    Demi18h28,
    Demi18h28crop,
} from '@components/texts/texts';
import {getFHorizontalPx} from '@src/helpers/appLayoutDimensions';
import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';
import {getImageToDisplay} from '@utils/transformData';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {LikeIcon, MoreIcon, ShareIcon} from '../icons/reactionIcons';
import {timeWithHandM} from '@src/helpers/stringFoo';
import {capitalize} from 'lodash';
import {getFullDate} from '@src/helpers/overviews';

interface PropsI {
    onPress: (state: boolean, mapID: string) => void;
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    testID?: string;
}

const ListTile: React.FC<PropsI> = ({
    onPress,
    mapData,
    images,
    onPressTile,
    tilePressable,
    testID,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
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

    const handleDistance = () => {
        if (!mapData?.distance) {
            return '-';
        }
        return (mapData.distance / 1000).toFixed(0) + t('distanceUnit');
    };

    const handleTime = () => {
        if (!mapData?.formattedTimeString) {
            return '-';
        }
        const time = timeWithHandM(mapData.formattedTimeString);
        return `${time.h}${t('hours')} ${time.m}${t('minutes')}`;
    };

    const handleDistanceToStart = () => {
        if (!mapData?.distanceToRoute) {
            return '-';
        }
        return `${(mapData.distanceToRoute / 1000).toFixed(0)}${t(
            'distanceToStart',
        )}`;
    };

    const handleCapitalize = () => {
        const difficulty = mapData?.firstPickedDifficulty || '-';
        const surface = mapData?.firstPickedSurface || '-';

        return `${capitalize(difficulty)}${t('separator')}${capitalize(
            surface,
        )}`;
    };

    const imagesToDisplay = getImageToDisplay(images);

    const styles = StyleSheet.create({
        wrap: {
            width: getFHorizontalPx(358),
            left: getFHorizontalPx(16),
        },
        area: {
            height: getFHorizontalPx(311),
            marginBottom: getFHorizontalPx(8),
        },
        tile: {
            width: '100%',
            height: '100%',
            borderRadius: getFHorizontalPx(12),
            backgroundColor: '#f0f0f0',
            overflow: 'hidden',
        },
        imageWrapper: {
            width: '100%',
            height: getFHorizontalPx(163),
            backgroundColor: '#6fda5d',
            overflow: 'hidden',
        },
        image: {
            height: '100%',
            width: '100%',
        },
        noImage: {
            marginTop: getFHorizontalPx(-106),
        },
        description: {
            left: getFHorizontalPx(16),
            top: getFHorizontalPx(8),
            width: getFHorizontalPx(326),
            height: getFHorizontalPx(124),
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        reactions: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
        },
        number: {
            marginLeft: getFHorizontalPx(4),
            marginRight: getFHorizontalPx(16),
            top: getFHorizontalPx(-1),
        },
        edit: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
    });

    return (
        <Pressable
            onPress={onTilePressedHandler}
            testID={testID || 'list-tile'}>
            <View style={styles.wrap}>
                <Demi14h48>{getFullDate(mapData?.createdAt)}</Demi14h48>
                <View style={styles.area}>
                    <View style={styles.tile}>
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
                        <View style={styles.description}>
                            <Demi18h28crop>
                                {mapData?.name || t('noTitle')}
                            </Demi18h28crop>
                            <Demi18h28>
                                {handleDistance()}
                                {t('separator')}
                                {handleTime()}
                            </Demi18h28>
                            <View style={styles.row}>
                                <Demi16h36>{handleDistanceToStart()}</Demi16h36>
                                <Demi16h36>{handleCapitalize()}</Demi16h36>
                            </View>

                            <View style={styles.reactions}>
                                <LikeIcon
                                    check={
                                        mapData.reaction ===
                                        likeValue?.enumValue
                                    }
                                    value={currentLikeNumber}
                                    onPress={onLikePressedHandler}
                                />

                                <ShareIcon onPress={() => {}} />
                            </View>

                            <View style={styles.edit}>
                                <MoreIcon
                                    onPress={onDetailsButtonPressedHandler}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ListTile;
