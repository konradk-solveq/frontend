import {MapType, ReactionsType} from '@models/map.model';

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
