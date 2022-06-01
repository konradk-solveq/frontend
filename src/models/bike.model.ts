import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
} from 'class-validator';

import validationRules from '@utils/validation/validationRules';
import {firstLetterToUpperCase} from '@utils/strings';
import {BikeTypesT} from '@type/bike';

export const userBikeValidationRules = {
    id: [],
    sku: [],
    serial_number: [
        validationRules.required,
        validationRules.notEmpty,
        {[validationRules.min]: 3},
        {[validationRules.max]: 20},
    ],
    producer: [validationRules.required, validationRules.string, {min: 3}],
    name: [validationRules.required, validationRules.string, {min: 3}],
    size: [validationRules.required, {min: 1}, {max: 10}],
    color: [validationRules.required, validationRules.string, {min: 3}],
};

type OverviewStyleT = 'color' | 'dashed' | 'checkmark';

export interface Overview {
    type: string;
    date: Date;
    info: string;
    operations: string[] | null;
    style?: Record<OverviewStyleT, string | boolean>;
}

export interface Warranty {
    id?: string;
    type: string;
    end?: Date;
    overviews: Overview[];
    info: string;
    warning?: string;
}

export enum ComplaintStateType {
    ONGOING = 0,
    FINISHED = 1,
}

export interface CompaintState {
    type: ComplaintStateType;
    description: string;
}

export class Complaint {
    public id: string;
    public name: string;
    public date: Date;
    public description: Date;
    public state: {
        type: ComplaintStateType;
        description: string;
    };

    constructor(
        id: string,
        name: string,
        date: Date,
        description: Date,
        state: {
            type: ComplaintStateType;
            description: string;
        },
    ) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.state = state;
    }
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
    complaintsRepairs?: Complaint[];
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

export interface ParametersI extends Parameters {}

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
    @MaxLength(20)
    serial_number: string;

    @IsNotEmpty()
    @IsString()
    bikeType?: string;

    @IsOptional()
    colorCodes?: string[];

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    color?: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    size?: string;

    /* TODO: probably shoudln't be validated => only for internal purpose*/
    @IsOptional()
    purpose?: {
        name: string;
        code: string;
    };

    /* TODO: probably shoudln't be validated => only for internal purpose */
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
        id: string | null,
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

export interface BikeDescriptionI extends BikeDescription {}

export interface BikesConfigI {
    bikeTypes: BikeTypesT;
}
export class BikesConfig implements BikesConfigI {
    bikeTypes: BikeTypesT;

    constructor(data: BikesConfigI) {
        this.bikeTypes = data.bikeTypes;
    }

    get bikeTypesOptions() {
        return this.bikeTypes?.options?.map(
            bt => ({
                enumValue: bt.enumValue,
                i18nValue: firstLetterToUpperCase(bt.i18nValue),
            }),
            [],
        );
    }
}
