import {BikesConfigI} from '@src/models/bike.model';
import {BikeType} from '@type/bike';

export const bikeTypesOptions: BikeType[] = [
    {
        enumValue: 'mountain',
        i18nValue: 'górski',
    },
    {
        enumValue: 'gravel',
        i18nValue: 'gravel',
    },
    {
        enumValue: 'road',
        i18nValue: 'szosowy',
    },
    {
        enumValue: 'touristic',
        i18nValue: 'turystyczny',
    },
    {
        enumValue: 'city',
        i18nValue: 'miejski',
    },
    {
        enumValue: 'kids',
        i18nValue: 'dziecięcy',
    },
    {
        enumValue: 'other',
        i18nValue: 'inny',
    },
];

const bikeTypesValues = [
    'górski',
    'gravel',
    'szosowy',
    'turystyczny',
    'miejski',
    'dziecięcy',
    'inny',
];

export const bikesConfig: BikesConfigI = {
    bikeTypes: {options: bikeTypesOptions, values: bikeTypesValues},
};
