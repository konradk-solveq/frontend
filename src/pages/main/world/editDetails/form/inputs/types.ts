import {
    levelFilter,
    pavementFilter,
    tagsFilter,
} from '../../../../../../enums/mapsFilters';

export type OptionType = levelFilter | pavementFilter | tagsFilter;

export interface FCPropsI {
    onChange: (...event: any[]) => void;
    value: any;
    isValid: boolean;
    errMsg: string | undefined;
}

export type FormData = {
    id: string;
    name: string;
    publishWithName: boolean;
    intro: string;
    description: string;
    level: OptionType[];
    pavement: OptionType[];
    tags: OptionType[];
};
