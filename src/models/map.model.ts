import {
    IsNotEmpty,
    IsArray,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsNumber,
    IsDate,
    IsBoolean,
} from 'class-validator';
import {simplyTimer} from '../helpers/stringFoo';
import {transformMetersToKilometersString} from '../utils/metersToKilometers';
import validationRules from '../utils/validation/validationRules';

export const publishMapValidationRules = {
    name: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
        {[validationRules.max]: 150},
    ],
    publishWithName: [validationRules.boolean],
    short: [validationRules.string, {[validationRules.max]: 1000}],
    long: [validationRules.string, {[validationRules.max]: 5000}],
    difficulty: [validationRules.isArray],
    surface: [validationRules.isArray],
    tags: [validationRules.isArray],
};

export interface MapCoord {
    langitude: number;
    latitude: number;
    altitude: number;
    timestamp: number;
}

export type SelectOptionType = {
    enumValue: string;
    i18nValue: string;
};

export interface SelectI {
    options: SelectOptionType[];
    values: string[];
}

export interface Coords {
    latitude: number;
    longitude: number;
}
export type CoordsType = [latitude: number, longitude: number];

export type Image = {
    url: string;
    width: number;
    height: number;
};

export interface ImagesVariants {
    share: Image[];
    square: Image[];
    vertical: Image[];
}

export interface Images {
    id: string;
    type: string;
    variants: ImagesVariants;
}

export type MapDescriptionType = {
    short?: string;
    long?: string;
};

export interface MapDetails {
    intro?: string;
    description?: string;
    localization: string;
    level?: string; // łatwa | umiarkowana | wymagająca
    pavement?: string[]; // szutrowa | asfalt | utwardzona | nieutwardzona | ścieżka rowerowa
    images: string[]; // urls
    mapUrl: string;
}

// export interface MapType {
//     id: string;
//     name: string;
//     author?: string;
//     difficulty?: SelectI;
//     ownerId?: string;
//     surface?: SelectI;
//     description?: MapDescriptionType;
//     tags?: SelectI;
//     location?: string;
//     path: Coords[];
//     images?: Images[];
//     date: Date;
//     distance?: number;
//     distanceToRoute?: number;
//     time?: number;
//     rating?: number;
//     isPublish?: boolean;
// }

export class Map {
    @IsNotEmpty()
    @IsString()
    public id: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    public name: string;

    @IsArray()
    public path: CoordsType[];

    @IsDate()
    public date: Date;

    @IsDate()
    public createdAt: Date;

    @IsDate()
    public publishedAt: Date;

    @IsOptional()
    @IsNumber()
    public distance?: number;

    @IsOptional()
    @IsNumber()
    public distanceToRoute?: number;

    @IsOptional()
    @IsString()
    public totalTime?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    public author?: string;

    @IsOptional()
    @IsNumber()
    public rating?: number;

    @IsOptional()
    public tags?: SelectI;

    @IsOptional()
    public images?: Images[];

    @IsOptional()
    @IsArray()
    public difficulty?: SelectI;

    @IsOptional()
    @IsString()
    public ownerId?: string;

    @IsOptional()
    @IsArray()
    surface?: SelectI;

    @IsOptional()
    @IsArray()
    public description?: MapDescriptionType;

    @IsOptional()
    @IsString()
    public location?: string;

    @IsOptional()
    @IsNumber()
    public time?: number;

    @IsOptional()
    @IsBoolean()
    public isPublic?: boolean;

    constructor(
        id: string,
        name: string,
        path: CoordsType[],
        date: Date,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.date = date;
        this.createdAt = createdAt;
    }

    public get distanceInKilometers(): string {
        return transformMetersToKilometersString(this.distance);
    }

    public get distanceToRouteInKilometers(): string {
        return transformMetersToKilometersString(this.distanceToRoute);
    }

    public get formattedTimeString(): string {
        return simplyTimer(this.time ? this.time * 1000 : 0);
    }

    public get firstDifficulty(): string | undefined {
        return this?.difficulty?.options?.[0]?.i18nValue;
    }

    public get firstPickedDifficulty(): string | undefined {
        const values = this?.difficulty?.values;
        return this?.difficulty?.options?.find(o =>
            values?.includes(o.enumValue),
        )?.i18nValue;
    }

    public get firstSurface(): string | undefined {
        return this?.surface?.options?.[0]?.i18nValue;
    }

    public get firstPickedSurface(): string | undefined {
        const values = this?.surface?.values;
        return this?.surface?.options?.find(o => values?.includes(o.enumValue))
            ?.i18nValue;
    }
}

export interface MapType extends Map {
    // id: string;
    // name: string;
    // author?: string;
    // difficulty?: SelectI;
    // ownerId?: string;
    // surface?: SelectI;
    // description?: MapDescriptionType;
    // tags?: SelectI;
    // location?: string;
    // path: Coords[];
    // images?: Images[];
    // date: Date;
    // distance?: number;
    // distanceToRoute?: number;
    // time?: number;
    // rating?: number;
    // isPublish?: boolean;
}
