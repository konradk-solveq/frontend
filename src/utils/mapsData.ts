import {FeaturedMapType, MapType, ReactionsType} from '@models/map.model';
import deepCopy from '@src/helpers/deepCopy';

export const updateReactionsInMap = (
    maps: MapType[],
    mapIdToModify: string,
    reaction: string,
) => {
    try {
        return [...maps].map(m => {
            if (mapIdToModify && m?.id === mapIdToModify) {
                let oldValue = 0;
                const k = reaction as keyof ReactionsType;
                if (m.reactions?.[k]) {
                    oldValue = m.reactions[k];
                }
                if (m?.reaction && m.reaction === reaction) {
                    return {
                        ...m,
                        reaction: null,
                        reactions: {
                            ...m.reactions,
                            [reaction]: oldValue - 1,
                        },
                    };
                }

                return {
                    ...m,
                    reaction: reaction,
                    reactions: {
                        ...m.reactions,
                        [reaction]: oldValue + 1,
                    },
                };
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
                        let oldValue = 0;
                        const k = reaction as keyof ReactionsType;
                        if (m.reactions?.[k]) {
                            oldValue = m.reactions[k];
                        }
                        if (m?.reaction && m.reaction === reaction) {
                            return {
                                ...m,
                                reaction: null,
                                reactions: {
                                    ...m.reactions,
                                    [reaction]: oldValue - 1,
                                },
                            };
                        }

                        return {
                            ...m,
                            reaction: reaction,
                            reactions: {
                                ...m.reactions,
                                [reaction]: oldValue + 1,
                            },
                        };
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
