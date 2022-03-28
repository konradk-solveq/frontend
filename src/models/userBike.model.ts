import {BikeType} from '@src/type/bike';
import {firstLetterToUpperCase} from '@src/utils/strings';
import {IsNotEmpty, IsOptional, IsArray, IsUrl} from 'class-validator';

import {
    Bike,
    BikeDescription,
    Parameters,
    Warranty,
    Complaint,
} from './bike.model';

export class UserBike implements Bike {
    @IsNotEmpty()
    // @Type(() => BikeDescription)
    public description: BikeDescription;

    @IsOptional()
    @IsArray()
    @IsUrl()
    public images?: string[] /* urls */;

    @IsOptional()
    public params?: Parameters[];

    @IsOptional()
    public warranty?: Warranty;

    @IsOptional()
    public complaintsRepairs?: Complaint[];

    constructor(description: BikeDescription) {
        this.description = description;
    }
}

export interface UserBikeI extends UserBike {}

export class GenericBike extends UserBike {
    @IsArray()
    public bikeTypes: BikeType[];

    constructor(description: BikeDescription, bikeTypes: BikeType[]) {
        super(description);
        this.bikeTypes = bikeTypes;
    }

    get bikeTypesList() {
        return this.bikeTypes.map(bt => ({
            enumValue: bt.enumValue,
            i18nValue: firstLetterToUpperCase(bt.i18nValue),
        }));
    }
}

export interface GenericBikeI extends GenericBike {}
