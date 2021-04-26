import {IsNotEmpty, MinLength, MaxLength, IsString} from 'class-validator';
import validationRules from '../utils/validation/validationRules';

export const userUserValidationRules = {
    userName: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 3},
        {[validationRules.max]: 30},
    ],
};

export interface User {
    userName: string;
}

export class UserProfile implements User {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    public userName: string;

    constructor(userName: string) {
        this.userName = userName;
    }
}
