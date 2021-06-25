import {
    levelFilter,
    pavementFilter,
    tagsFilter,
} from '../../../../../enums/mapsFilters';

export type OptionType = levelFilter | pavementFilter | tagsFilter;

export interface BaseFilter {
    name: string;
    options: OptionType[];
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
            pavementFilter.gravel,
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