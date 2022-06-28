import {FeaturedMapType, MapType, ReactionsType} from '@models/map.model';
import deepCopy from '@src/helpers/deepCopy';
import {RootState} from '@storage/storage';
import {IMapsListError} from '@storage/reducers/maps';

export const deductReactions = (currentValue: number) => {
    if (currentValue > 0) {
        return currentValue - 1;
    }

    return currentValue;
};

const updateSingleMapReaction = (map: MapType, reaction: string) => {
    let oldValue = 0;
    const k = reaction as keyof ReactionsType;
    if (map.reactions?.[k]) {
        oldValue = map.reactions[k];
    }
    if (map?.reaction && map.reaction === reaction) {
        return {
            ...map,
            reaction: null,
            reactions: {
                ...map.reactions,
                [reaction]: deductReactions(oldValue),
            },
        };
    }

    return {
        ...map,
        reaction: reaction,
        reactions: {
            ...map.reactions,
            [reaction]: oldValue + 1,
        },
    };
};

export const updateReactionsInMap = (
    maps: MapType[],
    mapIdToModify: string,
    reaction: string,
) => {
    try {
        return [...maps].map(m => {
            if (mapIdToModify && m?.id === mapIdToModify) {
                return updateSingleMapReaction(m, reaction);
            }

            return m;
        });
    } catch (_) {
        return maps;
    }
};

export const updateReactionsInFeatueedMap = (
    maps: FeaturedMapType[],
    mapIdToModify: string,
    reaction: string,
    sectionID: string,
): FeaturedMapType[] => {
    if (!maps?.length) {
        return maps;
    }

    try {
        const nfMaps: FeaturedMapType[] = deepCopy(maps).map(
            (om: FeaturedMapType) => {
                if (om.section.id !== sectionID) {
                    return om;
                }

                const featuredMap = om?.routes?.elements;
                if (!featuredMap?.length) {
                    return om;
                }

                const updatedMaps = featuredMap.map((m: MapType) => {
                    if (mapIdToModify && m?.id === mapIdToModify) {
                        return updateSingleMapReaction(m, reaction);
                    }

                    return m;
                });

                return {
                    ...om,
                    routes: {
                        ...om.routes,
                        elements: updatedMaps,
                    },
                };
            },
        );

        return nfMaps;
    } catch (_) {
        return maps;
    }
};

export const updateIsUserFavouriteInMap = (
    maps: MapType[],
    mapIdToModify: string,
    isFavourite: boolean,
) => {
    try {
        if (!maps.find(m => m.id === mapIdToModify)) {
            return maps;
        }

        return [...maps].map(m => {
            if (!!m?.id && m?.id === mapIdToModify) {
                if (isFavourite !== m.isUserFavorite) {
                    return {
                        ...m,
                        isUserFavorite: isFavourite,
                    };
                }
            }

            return m;
        });
    } catch (_) {
        return maps;
    }
};

export const updateListErrorState = (
    state: RootState,
    error: string,
    statusCode: number,
    type: keyof IMapsListError,
) => ({
    ...state,
    loading: false,
    refresh: false,
    mapsListError: {
        ...state.mapsListError,
        [type]: {
            error: error,
            statusCode: statusCode,
        },
    },
});
