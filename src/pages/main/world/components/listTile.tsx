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

interface PropsI {
    onPress: (state: boolean, mapID: string) => void;
    mapData: Map;
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    mode: 'public' | 'my' | 'saved' | 'featured';
    sectionID?: string;
    testID?: string;
    hideDistanceToStart?: boolean;
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
}) => {
    const {t} = useMergedTranslation('MainWorld.Tile');
    const {t: tbm} = useMergedTranslation('MainWorld.BikeMap');

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

    const onTilePressedHandler = () => {
        if (!tilePressable || !onPressTile) {
            return;
        }
        onPressTile(mapData.id);
    };

    const handleDetailsPressOn = () => {
        onPress(true, mapData.id);
    };

    const handleLikePressOn = useCallback(
        (state: boolean) => {
            setNumberOfLikes(prev => (!state ? prev - 1 : prev + 1));
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

    const handleCheckLike = () => mapData.reaction === likeValue?.enumValue;

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
    };

    const handleDistanceToStart = () => {
        if (!mapData?.distanceToRoute) {
            return '-';
        }
        return `${(mapData.distanceToRoute / 1000).toFixed(0)}${t(
            'distanceToStart',
        )}`;
    };

    const handleDifficultyAndSurface = () => {
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

    const handleToggleFavoritePressOn = (state: boolean) => {
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
    };

    const handleEditPressOn = () => {
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {
                mapID: mapData.id,
                private: !mapData.isPublic || mapData?.ownerId === userID,
            },
        });
    };

    const onPressShare = useCallback(() => {
        navigation.navigate({
            name: RegularStackRoute.SHARE_ROUTE_SCREEN,
            params: {mapID: mapData.id, mapType: mapType},
        });
    }, [navigation, mapData.id, mapType]);

    const imageUrl = useMemo(
        () => getMapImageToDisplay(mapData.mapsImages)?.url,
        [mapData.mapsImages],
    );

    return (
        <ListTileView
            tilePressOn={onTilePressedHandler}
            fullDate={getFullDate(mapData?.createdAt)}
            imageToDisplay={imageUrl}
            name={mapData?.name || t('noTitle')}
            distanceAndTime={handleDistanceAndTime()}
            distanceToStart={handleDistanceToStart()}
            difficultyAndSurface={handleDifficultyAndSurface()}
            numberOfLikes={numberOfLikes}
            checkLike={handleCheckLike()}
            checkPublic={mapData?.isPublic}
            checkUserFavorite={mapData?.isUserFavorite}
            likePressOn={handleLikePressOn}
            toggleFavoritePressOn={handleToggleFavoritePressOn}
            editPressOn={handleEditPressOn}
            detailsPressOn={handleDetailsPressOn}
            onPressShare={onPressShare}
            mode={mode}
            hideDistanceToStart={hideDistanceToStart}
            testID={testID}
        />
    );
};

export default React.memo(ListTile);
