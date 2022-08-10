import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/core';

import {Map, ReactionsType} from '@models/map.model';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {userIdSelector} from '@storage/selectors';
import {modifyReaction, removePlannedMap} from '@storage/actions/maps';
import {getMapImageToDisplay} from '@utils/transformData';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {RegularStackRoute} from '@navigation/route';
import {capitalize, timeWithHoursAndMinutes} from '@src/helpers/stringFoo';
import {getFullDate} from '@src/helpers/overviews';
import {addPlannedMap} from '@storage/actions/maps';
import ListTileView from '@components/tiles/listTileView';
import {getMapType} from '../utils/routes';
import {useToastContext} from '@providers/ToastProvider/ToastProvider';
import Bookmark from '@src/components/icons/Bookmark';
import {StyleProp, ViewStyle} from 'react-native';
import {RouteTilePlaceholder} from '@src/components/tiles';
import RouteShareModal from '@src/containers/World/components/RouteShareModal';

interface PropsI {
    onPress: (state: boolean, mapID: string) => void;
    mapData: Map;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    mode: 'public' | 'my' | 'saved' | 'featured';
    sectionID?: string;
    testID?: string;
    hideDistanceToStart?: boolean;
    style?: StyleProp<ViewStyle>;
    isRouteNewest?: boolean;
}

const ListTile: React.FC<PropsI> = ({
    onPress,
    mapData,
    onPressTile,
    tilePressable,
    mode,
    sectionID,
    testID,
    hideDistanceToStart,
    isRouteNewest,
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
    const {t: tbm} = useMergedTranslation('MainWorld.BikeMap');
    const [showShareModal, setShowShareModal] = useState(false);
    const [mapToShareId, setMapToShareId] = useState('');

    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const config = useAppSelector(mapReactionsConfigSelector);
    const likeValue = config?.find(c => c.enumValue === 'like');
    const likesNumber = likeValue?.enumValue
        ? mapData?.reactions?.[likeValue.enumValue as keyof ReactionsType] || 0
        : 0;

    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const {addToast} = useToastContext();
    const mapType = useMemo(() => getMapType(mode), [mode]);
    const userID = useAppSelector(userIdSelector);

    useEffect(() => {
        setNumberOfLikes(likesNumber);
    }, [likesNumber]);

    const onTilePressedHandler = useCallback(() => {
        if (!tilePressable || !onPressTile) {
            return;
        }
        onPressTile(mapData.id);
    }, [mapData.id, onPressTile, tilePressable]);

    const handleDetailsPressOn = useCallback(() => {
        onPress(true, mapData.id);
    }, [mapData.id, onPress]);

    const handleLikePressOn = useCallback(
        (state: boolean) => {
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

    const handleCheckLike = useCallback(
        () => mapData.reaction === likeValue?.enumValue,
        [likeValue?.enumValue, mapData.reaction],
    );

    const handleDistanceAndTime = useCallback(() => {
        const getDistance = () => {
            if (!mapData.distanceInKilometers) {
                return null;
            }
            return mapData.distanceInKilometers + t('distanceUnit');
        };

        const getTime = () => {
            if (!mapData?.formattedTimeString) {
                return null;
            }
            const ti = timeWithHoursAndMinutes(mapData.formattedTimeString);
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
    }, [mapData.distanceInKilometers, mapData.formattedTimeString, t]);

    const handleDifficultyAndSurface = useCallback(() => {
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
    }, [mapData?.firstPickedDifficulty, mapData?.firstPickedSurface, t]);

    const handleToggleFavoritePressOn = useCallback(
        (state: boolean) => {
            const toggleRouteToPlanned = tbm(
                state ? 'addRouteToPlanned' : 'removeRouteFromPlanned',
                {
                    name: '',
                },
            );
            addToast({
                key: `route-${mapData.id}-${state ? 'added' : 'removed'}`,
                title: toggleRouteToPlanned,
                icon: <Bookmark />,
            });
            state
                ? dispatch(addPlannedMap(mapData.id))
                : dispatch(removePlannedMap(mapData.id));
        },
        [addToast, dispatch, mapData.id, tbm],
    );

    const handleEditPressOn = useCallback(() => {
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {
                mapID: mapData.id,
                private: !mapData.isPublic || mapData?.ownerId === userID,
            },
        });
    }, [mapData.id, mapData.isPublic, mapData?.ownerId, navigation, userID]);

    const onSharePressedHandler = useCallback(() => {
        setMapToShareId(mapData.id);
        setShowShareModal(true);
    }, [mapData.id]);

    const onShareModalCloseHandler = () => {
        setShowShareModal(false);
        setMapToShareId('');
    };

    const imageUrl = useMemo(
        () => getMapImageToDisplay(mapData.mapsImages)?.url,
        [mapData.mapsImages],
    );

    const isDataNotComplete = useCallback(() => {
        return (
            !mapData?.name ||
            !mapData.distance ||
            !mapData.time ||
            !mapData?.distanceToRoute
        );
    }, [mapData]);

    const isNewestRouteLackingData = useCallback(() => {
        return isRouteNewest && (isDataNotComplete() || !imageUrl);
    }, [isRouteNewest, imageUrl, isDataNotComplete]);

    return (
        <>
            {isNewestRouteLackingData() ? (
                <RouteTilePlaceholder
                    isDataNotComplete={isDataNotComplete()}
                    name={mapData?.name}
                    imageUrl={imageUrl}
                    distanceAndTime={handleDistanceAndTime()}
                    distanceToStart={mapData.distanceToRouteInKilometers}
                    difficultyAndSurface={handleDifficultyAndSurface()}
                    fullDate={getFullDate(mapData?.createdAt)}
                    tilePressOn={onTilePressedHandler}
                    detailsPressOn={handleDetailsPressOn}
                    editPressOn={handleEditPressOn}
                    testID={testID}
                />
            ) : (
                <ListTileView
                    tilePressOn={onTilePressedHandler}
                    fullDate={getFullDate(mapData?.createdAt)}
                    imageToDisplay={imageUrl}
                    name={mapData?.name || t('noTitle')}
                    distanceAndTime={handleDistanceAndTime()}
                    distanceToStart={mapData.distanceToRouteInKilometers}
                    difficultyAndSurface={handleDifficultyAndSurface()}
                    numberOfLikes={numberOfLikes}
                    checkLike={handleCheckLike()}
                    checkPublic={mapData?.isPublic}
                    checkUserFavorite={mapData?.isUserFavorite}
                    likePressOn={handleLikePressOn}
                    toggleFavoritePressOn={handleToggleFavoritePressOn}
                    editPressOn={handleEditPressOn}
                    detailsPressOn={handleDetailsPressOn}
                    onPressShare={onSharePressedHandler}
                    mode={mode}
                    hideDistanceToStart={hideDistanceToStart}
                    testID={testID}
                />
            )}

            <RouteShareModal
                showModal={showShareModal}
                mapId={mapToShareId}
                onClose={onShareModalCloseHandler}
            />
        </>
    );
};

export default React.memo(ListTile);
