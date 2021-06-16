import {OptionType, PickedFilters} from '../../../../../interfaces/form';

export interface BaseFilter {
    name: string;
    options: OptionType[];
}

export interface FilterI {
    [key: string]: BaseFilter;
}

export interface FitlersI {
    [key: string]: {
        name: string;
        options: {enumValue: string; i18nValue: string}[] | [];
        radioType: boolean;
    };
}

export const getFitlers = (
    mapOptions: OptionType,
    orderTranslations: string[],
): FitlersI => {
    let filters = {
        order: {
            name: 'order',
            options: [
                {
                    enumValue: 'desc',
                    i18nValue: orderTranslations?.[0] || 'Od najnowszych',
                },
                {
                    enumValue: 'asc',
                    i18nValue: orderTranslations?.[1] || 'Od najstarszych',
                },
            ],
            radioType: true,
        },
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
        const options = mapOptions?.[mo as keyof OptionType]?.map(o => {
            return {
                ...o,
                i18nValue: o.i18nValue,
            };
        }, []);
        filters[mo as keyof FitlersI] = {
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
    filtersToUpdate: OptionType[],
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
