import {
    IsNotEmpty,
    IsArray,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsNumber,
} from 'class-validator';

export interface MapCoord {
    langitude: number;
    latitude: number;
    altitude: number;
    timestamp: number;
}

export interface MapType {
    id: string;
    name: string;
    coords: MapCoord[];
    totalDistance?: number;
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

    @IsOptional()
    @IsNumber()
    public totalDistance?: number;

    constructor(id: string, name: string, coords: MapCoord[]) {
        this.id = id;
        this.name = name;
        this.coords = coords;
    }
}
