import React, {useEffect, useCallback, useState} from 'react';
import {Map, ReactionsType} from '@models/map.model';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {modifyReaction} from '@storage/actions/maps';
import {getImageToDisplay} from '@utils/transformData';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useNavigation} from '@react-navigation/core';
import {RegularStackRoute} from '@navigation/route';
import {capitalize, timeWithHandM} from '@src/helpers/stringFoo';
import {getFullDate} from '@src/helpers/overviews';
import {useNotificationContext} from '@providers/topNotificationProvider/TopNotificationProvider';
import {addPlannedMap} from '@storage/actions/maps';
import ListTileView from './listTileView';
interface PropsI {
    onPress: (state: boolean, mapID: string) => void;
    mapData: Map;
    images: {images: string[]; mapImg: string};
    onPressTile?: (mapID: string) => void;
    tilePressable?: boolean;
    mode: 'public' | 'my' | 'saved';
    sectionID?: string;
    testID?: string;
}

const ListTile: React.FC<PropsI> = ({
    onPress,
    mapData,
    images,
    onPressTile,
    tilePressable,
    mode,
    sectionID,
    testID,
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
    const notificationContext = useNotificationContext();

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

    const handleAddToFavoritesPressOn = () => {
        const addRouteToPlanned = tbm('addRouteToPlanned', {
            name: '',
        });
        notificationContext.setNotificationVisibility(addRouteToPlanned);
        dispatch(addPlannedMap(mapData.id));
    };

    const handleEditPressOn = () => {
        navigation.navigate({
            name: RegularStackRoute.EDIT_DETAILS_SCREEN,
            params: {mapID: mapData.id, private: !mapData.isPublic},
        });
    };

    return (
        <ListTileView
            tilePressOn={onTilePressedHandler}
            fullDate={getFullDate(mapData?.createdAt)}
            imagesToDisplay={getImageToDisplay(images)}
            name={mapData?.name || t('noTitle')}
            distanceAndTime={handleDistanceAndTime()}
            distanceToStart={handleDistanceToStart()}
            difficultyAndSurface={handleDifficultyAndSurface()}
            numberOfLikes={numberOfLikes}
            checkLike={handleCheckLike()}
            likePressOn={handleLikePressOn}
            addToFavoritesPressOn={handleAddToFavoritesPressOn}
            editPressOn={handleEditPressOn}
            detailsPressOn={handleDetailsPressOn}
            mode={mode}
            testID={testID}
        />
    );
};

export default ListTile;
