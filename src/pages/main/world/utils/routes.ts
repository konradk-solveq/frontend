import {selectorMapTypeEnum} from '@storage/selectors';

export const getMapType = (mode: 'public' | 'my' | 'saved' | 'featured') => {
    switch (mode) {
        case 'public':
            return selectorMapTypeEnum.regular;
        case 'my':
            return selectorMapTypeEnum.private;
        case 'saved':
            return selectorMapTypeEnum.favourite;
        case 'featured':
            return selectorMapTypeEnum.featured;
        default:
            return selectorMapTypeEnum.regular;
    }
};
