import {
    IsNotEmpty,
    IsArray,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsNumber,
    IsDate,
} from 'class-validator';

export interface MapCoord {
    langitude: number;
    latitude: number;
    altitude: number;
    timestamp: number;
}

export interface MapDetails {
    intro?: string;
    description?: string;
    localization: string;
    level?: string; // łatwa | umiarkowana | wymagająca
    pavement?: string[]; // szutrowa | asfalt | utwardzona | nieutwardzona | ścieżka rowerowa
    images: string[]; // urls
    mapUrl: string;
}

export interface MapType {
    id: string;
    name: string;
    coords: MapCoord[];
    date: Date;
    author?: string;
    totalDistance?: number;
    details: MapDetails;
    tags?: string[]; // widokowa | mały ruch | weekendowa | ciekawe atrakcje | dobre jedzenie | dla dzieci
}

export class Map implements MapType {
    @IsNotEmpty()
    @IsString()
    public id: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    public name: string;

    @IsArray()
    public coords: MapCoord[];

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(1000)
    public details: MapDetails;

    @IsDate()
    public date: Date;

    @IsOptional()
    @IsNumber()
    public totalDistance?: number;

    constructor(
        id: string,
        name: string,
        details: MapDetails,
        coords: MapCoord[],
        date: Date,
    ) {
        this.id = id;
        this.name = name;
        this.coords = coords;
        this.details = details;
        this.date = date;
    }
}
