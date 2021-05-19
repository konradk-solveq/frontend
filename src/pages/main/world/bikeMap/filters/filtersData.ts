import {
    dateFilter,
    levelFilter,
    routeTypeFilter,
    pavementFilter,
    tagsFilter,
} from '../../../../../enums/mapsFilters';

export type OptionType =
    | dateFilter
    | levelFilter
    | routeTypeFilter
    | pavementFilter
    | tagsFilter;

export interface BaseFilter {
    name: string;
    options: OptionType[];
}

export interface FilterI {
    [key: string]: BaseFilter;
}

export const filters: FilterI = {
    date: {
        name: 'date',
        options: [dateFilter.latest, dateFilter.oldest],
    },
    routeType: {
        name: 'routeType',
        options: [
            routeTypeFilter.all,
            routeTypeFilter.nonPublic,
            routeTypeFilter.public,
        ],
    },
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
