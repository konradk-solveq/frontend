import {levelFilter, pavementFilter, tagsFilter} from '@enums/mapsFilters';

export type OptionFilterType = levelFilter | pavementFilter | tagsFilter;

export interface BaseFilter {
    name: string;
    options: OptionFilterType[];
}

export interface FilterI {
    [key: string]: BaseFilter;
}

export const attributes: FilterI = {
    level: {
        name: 'level',
        options: [levelFilter.easy, levelFilter.medium, levelFilter.hard],
    },
    pavement: {
        name: 'pavement',
        options: [
            pavementFilter.asphalt,
            pavementFilter.paved,
            pavementFilter.unsealed,
            pavementFilter.bike,
        ],
    },
    tags: {
        name: 'tags',
        options: [
            tagsFilter.observation,
            tagsFilter.smallTraffic,
            tagsFilter.weekend,
            tagsFilter.attraction,
            tagsFilter.goodFood,
            tagsFilter.forKids,
        ],
    },
};
