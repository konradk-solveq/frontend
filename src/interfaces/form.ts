import {SelectI, SelectOptionType} from '../models/map.model';

export type MapFormData = {
    id: string;
    name: string;
    publishWithName: boolean;
    short?: string;
    long?: string;
    difficulty?: SelectI;
    surface?: SelectI;
    tags?: SelectI;
};

export type MapFormDataResult = {
    id: string;
    name: string;
    publishWithName: boolean;
    short?: string;
    long?: string;
    difficulty?: string[];
    surface?: string[];
    tags?: string[];
};

export type OptionType = {
    difficulties: SelectOptionType[] | undefined;
    surfaces: SelectOptionType[] | undefined;
    tags: SelectOptionType[] | undefined;
};

export type ImageType = {
    fileName?: string;
    fileSize?: number;
    height?: number;
    type?: string;
    uri?: string;
    width?: number;
};

export type PickedFilters = {
    [key: string]: OptionType[];
};