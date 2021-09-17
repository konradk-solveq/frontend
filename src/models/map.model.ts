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

export type PublishMapValidationRuleT = (string | {[key: string]: number})[];
export interface PublishMapValidationRulesI {
    name: PublishMapValidationRuleT;
    publishWithName: PublishMapValidationRuleT;
    description: PublishMapValidationRuleT;
    difficulty: PublishMapValidationRuleT;
    surface: PublishMapValidationRuleT;
    tags: PublishMapValidationRuleT;
}

export const publishMapValidationRules: PublishMapValidationRulesI = {
    name: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
        {[validationRules.max]: 150},
    ],
    publishWithName: [validationRules.boolean],
    description: [validationRules.string, {[validationRules.max]: 10000}],
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

export type OptionsEnumsT = {
    difficultyOptions: SelectOptionType[];
    surfacesOptions: SelectOptionType[];
    tagsOptions: SelectOptionType[];
    reactions: SelectOptionType[];
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
    public publishedAt?: Date;

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
    public tags?: string[];

    @IsOptional()
    public images?: Images[];

    @IsOptional()
    @IsArray()
    public difficulty?: string[];

    @IsOptional()
    @IsString()
    public ownerId?: string;

    @IsOptional()
    @IsArray()
    surface?: string[];

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

    private optionsEnums: OptionsEnumsT | undefined;

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
        const difficultyOptions = this.optionsEnums?.difficultyOptions?.[0]
            ?.i18nValue;
        return difficultyOptions;
    }

    public get firstPickedDifficulty(): string | undefined {
        const values = this?.difficulty;
        const difficultyOptions = this?.optionsEnums?.difficultyOptions?.find(
            o => values?.includes(o?.enumValue),
        )?.i18nValue;

        return difficultyOptions;
    }

    public get firstSurface(): string | undefined {
        const surfaceOptions = this.optionsEnums?.surfacesOptions?.[0]
            ?.i18nValue;

        return surfaceOptions;
    }

    public get firstPickedSurface(): string | undefined {
        const values = this?.surface;
        const surfaceOptions = this?.optionsEnums?.surfacesOptions?.find(o =>
            values?.includes(o?.enumValue),
        )?.i18nValue;

        return surfaceOptions;
    }

    public get createdAtDate(): Date {
        return new Date(this.createdAt);
    }

    public get createdAtDateString(): string {
        return getDateString(new Date(this.createdAt));
    }

    public get mapDescription(): string {
        if (version < '1.4.0') {
            return this.mapDescriptionLong;
        }
        console.log('[typof]', typeof this.description);
        if (typeof this?.description === 'string') {
            return this.description;
        }

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

    public set optionsEnumsValues(opt: OptionsEnumsT | undefined) {
        if (!opt) {
            return;
        }

        this.optionsEnums = {
            difficultyOptions: opt.difficultyOptions,
            surfacesOptions: opt.surfacesOptions,
            tagsOptions: opt.tagsOptions,
            reactions: opt.reactions,
        };
    }

    public get optionsEnumsValues(): OptionsEnumsT | undefined {
        return this.optionsEnums;
    }
}

export interface MapType extends Map {}

export interface MapsData {
    elements: MapType[] | [];
    links: {prev: string};
    total: number;
}

export type FeaturedMapType = {
    section: {
        id: string;
        title: string;
    };
    routes: MapsData;
};
