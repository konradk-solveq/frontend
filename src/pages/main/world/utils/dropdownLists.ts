import {DropdownItemT} from '@components/types/dropdown';

export const getPublicRoutesDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '1',
        sortBy: 'distance',
        order: 'asc',
        text: t('BikeMap.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: t('BikeMap.sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: t('BikeMap.sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: t('BikeMap.sortBy.oldest'),
    },
];

export const getPrivateRoutesDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '1',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.newest'),
        isDefault: true,
        defaultItemSuffix: t('sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'distance',
        order: 'asc',
        text: t('sortBy.nearest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.oldest'),
    },
];

export const getPlannedRoutesDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '1',
        sortBy: 'distance',
        order: 'asc',
        text: t('sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: t('sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: t('sortBy.oldest'),
    },
];

export const getPublicRoutesNoLocationDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: t('BikeMap.sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: t('BikeMap.sortBy.oldest'),
    },
];

export const getPrivateRoutesNoLocationDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '1',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.newest'),
        isDefault: true,
        defaultItemSuffix: t('sortBy.default'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.oldest'),
    },
];

export const getPlannedRoutesNoLocationDropdownList = (
    t: (trans: string) => string,
): DropdownItemT[] => [
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: t('sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: t('sortBy.oldest'),
    },
];
