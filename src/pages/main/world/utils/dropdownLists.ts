import i18next from '@translations/i18next';

import {DropdownItemT} from '@components/types/dropdown';

export const publicRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        value: 'nearest',
        text: i18next.t('MainWorld.BikeMap.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.BikeMap.sortBy.default'),
    },
    {
        id: '2',
        value: 'newest',
        text: i18next.t('MainWorld.BikeMap.sortBy.newest'),
    },
    {
        id: '3',
        value: 'oldest',
        text: i18next.t('MainWorld.BikeMap.sortBy.oldest'),
    },
];

export const privateRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        value: 'newest',
        text: i18next.t('MainWorld.MyRoutes.sortBy.newest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.MyRoutes.sortBy.default'),
    },
    {
        id: '2',
        value: 'nearest',
        text: i18next.t('MainWorld.MyRoutes.sortBy.nearest'),
    },
    {
        id: '3',
        value: 'oldest',
        text: i18next.t('MainWorld.MyRoutes.sortBy.oldest'),
    },
];

export const plannedRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        value: 'nearest',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.PlannedRoutes.sortBy.default'),
    },
    {
        id: '2',
        value: 'newest',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.newest'),
    },
    {
        id: '3',
        value: 'oldest',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.oldest'),
    },
];
