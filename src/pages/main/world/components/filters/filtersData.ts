import {OptionType, PickedFilters, SelectOptionType} from '@interfaces/form';

export interface BaseFilter {
    name: string;
    options: OptionType[] | undefined;
}

export interface FilterI {
    [key: string]: BaseFilter;
}

export interface FiltersI {
    [key: string]: {
        name: string;
        options: SelectOptionType[] | [];
        radioType: boolean;
    };
}

export const getFilters = (mapOptions: OptionType): FiltersI => {
    let filters: FiltersI = {
        difficulties: {
            name: 'difficulties',
            options: [],
            radioType: true,
        },
        surfaces: {
            name: 'surfaces',
            options: [],
            radioType: false,
        },
        tags: {
            name: 'tags',
            options: [],
            radioType: false,
        },
    };

    Object.keys(mapOptions)?.forEach((mo: string) => {
        const options = mapOptions?.[mo as keyof OptionType] || [];

        filters[mo as keyof FiltersI] = {
            name: mo,
            options: options,
            radioType: mo === 'difficulties' ? true : false,
        };
    });

    return filters;
};

export const updateFilters = (
    filters: PickedFilters,
    filterToUpdate: string,
    filtersToUpdate: string[],
) => {
    let filterToReturn = {...filters};
    if (filtersToUpdate?.length < 1) {
        filterToReturn = Object.keys({...filters}).reduce(
            (total: PickedFilters, k: string) => {
                if (k !== filterToUpdate) {
                    total[k] = filters[k];
                }

                return total;
            },
            {},
        );
    } else {
        filterToReturn = {
            ...filters,
            ...{[filterToUpdate]: filtersToUpdate},
        };
    }

    return filterToReturn;
};
