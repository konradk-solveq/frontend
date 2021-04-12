import {
    IsNotEmpty,
    IsString,
    IsNumberString,
    MinLength,
    MaxLength,
} from 'class-validator';
import validationRules from '../utils/validation/validationRules';

export interface Bike {
    frameNumber: string;
    producer: string;
    model: string;
    size: string;
    color: string;
}

export const userBikeValidationRules = {
    frameNumber: [validationRules.required, validationRules.notEmpty, {min: 3}],
    producer: [validationRules.required, validationRules.string, {min: 3}],
    model: [validationRules.required, validationRules.string, {min: 3}],
    size: [
        validationRules.required,
        validationRules.string,
        validationRules.numberString,
        {min: 2},
        {max: 4},
    ],
    color: [validationRules.required, validationRules.string, {min: 3}],
};

export class UserBike implements Bike {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    public frameNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    public producer: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    public model: string;

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(2)
    @MaxLength(4)
    public size: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    public color: string;

    constructor(
        frameNumber: string,
        producer: string,
        model: string,
        size: string,
        color: string,
    ) {
        this.frameNumber = frameNumber;
        this.producer = producer;
        this.model = model;
        this.size = size;
        this.color = color;
    }
}
