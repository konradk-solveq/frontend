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
