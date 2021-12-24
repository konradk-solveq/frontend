export type MapFormData = {
    id: string;
    name: string;
    publishWithName: boolean;
    description?: string;
    difficulty?: string[];
    surface?: string[];
    tags?: string[];
};

export type MapFormDataResult = {
    id: string;
    name: string;
    publishWithName: boolean;
    description?: string;
    difficulty?: string[];
    surface?: string[];
    tags?: string[];
};

export type LoginFormDataResult = {
    email: string;
    password: string;
};

export type SelectOptionType = {
    enumValue: string;
    i18nValue: string;
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
    [key: string]: string[];
};
