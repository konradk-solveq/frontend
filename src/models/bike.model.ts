import {
    IsNotEmpty,
    IsString,
    IsNumberString,
    MinLength,
    MaxLength,
    IsOptional,
} from 'class-validator';
import validationRules from '../utils/validation/validationRules';

export const userBikeValidationRules = {
    id: [],
    sku: [],
    serial_number: [
        validationRules.required,
        validationRules.notEmpty,
        {min: 3},
    ],
    producer: [validationRules.required, validationRules.string, {min: 3}],
    name: [validationRules.required, validationRules.string, {min: 3}],
    size: [
        validationRules.required,
        validationRules.numberString,
        {min: 2},
        {max: 4},
    ],
    color: [validationRules.required, validationRules.string, {min: 3}],
};

export interface Warranty {
    id: string;
    type: string;
    end: Date;
    overviews: {
        type: WarrantyOverviewType[];
        date: Date;
        state: 0;
    }[];
    info: string;
}

enum WarrantyOverviewType {
    PERIODICAL = 'periodical',
    WARRANTY = 'warranty',
}

export enum ComplaintStateType {
    ONGOING = 0,
    FINISHED = 1,
}

export interface BikeDescriptionDetails {
    colorCodes?: string[];
    color?: string;
    size?: string;
    purpose?: {
        name: string;
        code: string;
    };
    bought?: {
        date: Date;
        address: {
            shopName: string;
            street: string;
            city: string;
            email: string;
            phone: string;
            lat: number;
            lon: number;
        };
    };
}

export interface BikeBaseData {
    name: string;
    id: string | null;
    sku: string;
    producer: string;
    serial_number: string;
    size?: string;
    color?: string;
}

export interface Parameter {
    name: string;
    value: string;
}

export interface Bike {
    images?: string[] /* urls */;
    description: BikeDescription;
    params?: Parameters[];
    warranty?: Warranty;
    complaintsRepairs?: ComplaintStateType;
}

export class Parameters {
    public name: string;
    public list?: Parameter[];
    public customizable: boolean;

    constructor(name: string, customizable: boolean, list?: Parameter[]) {
        this.name = name;
        this.customizable = customizable;
        if (list) {
            this.list = list;
        }
    }
}

export class BikeDescription implements BikeBaseData, BikeDescriptionDetails {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    id: string | null;

    @IsString()
    sku: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    producer: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    serial_number: string;

    @IsOptional()
    colorCodes?: string[];

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    color?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(2)
    @MaxLength(4)
    size?: string;

    @IsOptional()
    purpose?: {
        name: string;
        code: string;
    };

    @IsOptional()
    bought?: {
        date: Date;
        address: {
            shopName: string;
            street: string;
            city: string;
            email: string;
            phone: string;
            lat: number;
            lon: number;
        };
    };

    constructor(
        name: string,
        id: string,
        sku: string,
        producer: string,
        serial_number: string,
    ) {
        this.name = name;
        this.id = id;
        this.sku = sku;
        this.producer = producer;
        this.serial_number = serial_number;
    }
}
