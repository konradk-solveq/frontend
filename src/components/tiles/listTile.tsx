import React, {useEffect, useCallback, useState} from 'react';
import {View, Image, Pressable} from 'react-native';
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
import RouteImagePlaceholder from '@sharedComponents/images/routeListImagePlaceholder';
import {getImageToDisplay} from '@utils/transformData';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {LikeIcon, MoreIcon, SaveIcon, ShareIcon} from '../icons/reactionIcons';
import {capitalize, timeWithHandM} from '@src/helpers/stringFoo';
import {getFullDate} from '@src/helpers/overviews';
import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';
import {addPlannedMap} from '@storage/actions/maps';
import {styles} from './style';
interface PropsI {
    onPress: (state: boolean, mapID: string) => void;
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    showSave?: boolean;
    sectionID?: string;
    testID?: string;
}

const ListTile: React.FC<PropsI> = ({
    onPress,
    mapData,
    images,
    onPressTile,
    tilePressable,
    showSave,
    sectionID,
    testID,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
    const {t: tbm} = useMergedTranslation('MainWorld.BikeMap');

    const dispatch = useAppDispatch();

    const config = useAppSelector(mapReactionsConfigSelector);
    const likeValue = config?.find(c => c.enumValue === 'like');
    const likesNumber = likeValue?.enumValue
        ? mapData?.reactions?.[likeValue.enumValue as keyof ReactionsType] || 0
        : 0;

    const [currentLikeNumber, setCurrentLikeNumber] = useState(0);
    const notificationContext = useNotificationContext();

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

    const handleDistanceAndTime = () => {
        const getDistance = () => {
            if (!mapData?.distance) {
                return null;
            }
            return (mapData.distance / 1000).toFixed(0) + t('distanceUnit');
        };

        const getTime = () => {
            if (!mapData?.formattedTimeString) {
                return null;
            }
            const ti = timeWithHandM(mapData.formattedTimeString);
            return `${ti.h}${t('hours')} ${ti.m}${t('minutes')}`;
        };

        const distance = getDistance();
        const time = getTime();

        if (distance && time) {
            return `${distance}${t('separator')}${time}`;
        } else if (distance && !time) {
            return distance;
        } else if (!distance && time) {
            return time;
        }
        return '';
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
        const difficulty = mapData?.firstPickedDifficulty;
        const surface = mapData?.firstPickedSurface;

        if (difficulty && surface) {
            return `${capitalize(difficulty)}${t('separator')}${capitalize(
                surface,
            )}`;
        } else if (!difficulty && surface) {
            return capitalize(surface);
        } else if (difficulty && !surface) {
            return capitalize(difficulty);
        }
        return '';
    };

    const handleAddToFavorites = () => {
        const addRouteToPlanned = tbm('addRouteToPlanned', {
            name: '',
        });
        notificationContext.setNotificationVisibility(addRouteToPlanned);
        dispatch(addPlannedMap(mapData.id));
    };

    const imagesToDisplay = getImageToDisplay(images);

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
                            <Demi18h28>{handleDistanceAndTime()}</Demi18h28>
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

                                {showSave && (
                                    <View style={styles.iconWrap}>
                                        <SaveIcon
                                            check={
                                                mapData.reaction ===
                                                likeValue?.enumValue
                                            }
                                            onPress={handleAddToFavorites}
                                        />
                                    </View>
                                )}

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
