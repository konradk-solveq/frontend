import i18next from '@translations/i18next';

import {DropdownItemT} from '@components/types/dropdown';

export const publicRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        sortBy: 'distance',
        order: 'asc',
        text: i18next.t('MainWorld.BikeMap.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.BikeMap.sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: i18next.t('MainWorld.BikeMap.sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: i18next.t('MainWorld.BikeMap.sortBy.oldest'),
    },
];

export const privateRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        sortBy: 'created',
        order: 'desc',
        text: i18next.t('MainWorld.MyRoutes.sortBy.newest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.MyRoutes.sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'distance',
        order: 'asc',
        text: i18next.t('MainWorld.MyRoutes.sortBy.nearest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'desc',
        text: i18next.t('MainWorld.MyRoutes.sortBy.oldest'),
    },
];

export const plannedRoutesDropdownList: DropdownItemT[] = [
    {
        id: '1',
        sortBy: 'distance',
        order: 'asc',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.nearest'),
        isDefault: true,
        defaultItemSuffix: i18next.t('MainWorld.PlannedRoutes.sortBy.default'),
    },
    {
        id: '2',
        sortBy: 'created',
        order: 'desc',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.newest'),
    },
    {
        id: '3',
        sortBy: 'created',
        order: 'asc',
        text: i18next.t('MainWorld.PlannedRoutes.sortBy.oldest'),
    },
];
