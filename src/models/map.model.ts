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
    IsDateString,
} from 'class-validator';
import {simplyTimer} from '../helpers/stringFoo';
import {getDateString} from '../utils/dateTime';
import {transformMetersToKilometersString} from '../utils/metersToKilometers';
import validationRules from '../utils/validation/validationRules';
import {version} from '../../package.json';

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

export type PausePeriod = {
    start: number;
    end: number | null;
};

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

/**
 * Legacy properties. They haven't exists since version 1.4.0 for new objects.
 */
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

export enum MarkerTypes {
    PUBLIC = 'PUBLIC',
    OWN = 'OWN',
    FAVORITE = 'FAVORITE',
    RECOMMENDED = 'RECOMMENDED',
}

export type ReactionsType = {
    like: number;
    wow: number;
    love: number;
};

export type MarkerDetailsType = {
    id: string;
    name: string;
    distance: number;
    distanceToRoute: number;
    totalTime: number;
    mapImageUrl: string;
    openHours: string;
};

export type MapMarkerType = {
    type: string;
    lat: number;
    lng: number;
    details: MarkerDetailsType;
    markerType: MarkerTypes[];
};

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

    @IsDateString()
    public createdAt: string;

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
    public description?: MapDescriptionType | string;

    @IsOptional()
    @IsString()
    public location?: string;

    @IsOptional()
    @IsNumber()
    public time?: number;

    @IsOptional()
    @IsBoolean()
    public isPublic?: boolean;

    @IsNumber()
    @IsOptional()
    public downloads?: number;

    @IsString()
    @IsOptional()
    public reaction?: string;

    @IsString()
    @IsOptional()
    public reactions?: ReactionsType;

    constructor(
        id: string,
        name: string,
        path: CoordsType[],
        date: Date,
        createdAt: string,
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

    public get createdAtDate(): Date {
        return new Date(this.createdAt);
    }

    public get createdAtDateString(): string {
        return getDateString(new Date(this.createdAt));
    }

    public get mapDescription(): string {
        console.log('[1]')
        if (version < '1.4.0') {
            console.log('[2]')
            console.log('[2]')
            return this.mapDescriptionLong;
        }
        console.log('[typof]', typeof this.description)
        if (typeof this?.description === 'string') {
            console.log('[3]')
            return this.description;
        }
        console.log('[4]')

        return '';
    }

    public get mapDescriptionShort(): string {
        if (typeof this?.description === 'string') {
            return '';
        }

        return this?.description?.short || '';
    }

    public get mapDescriptionLong(): string {
        if (typeof this?.description === 'string') {
            return '';
        }

        return this?.description?.long || '';
    }
}

export interface MapType extends Map {}
