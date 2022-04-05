export type BikeTypesT = {
    options: BikeType[];
    values: string[];
};

export type BikeType = {
    enumValue: string;
    i18nValue: string;
};

export type BikesConfig = {
    bikeTypes: BikeType[];
};
