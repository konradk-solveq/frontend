import {IsNotEmpty, MinLength, IsString} from 'class-validator';
import validationRules from '../utils/validation/validationRules';

export type UserLoginInfoValidationRuleT = (string | {[key: string]: number})[];
export interface UserLoginInfoValidationRulesI {
    email: UserLoginInfoValidationRuleT;
    password: UserLoginInfoValidationRuleT;
}

export const userLoginInfoValidationRules: UserLoginInfoValidationRulesI = {
    email: [
        validationRules.required,
        validationRules.string,
        validationRules.email,
        {[validationRules.min]: 3},
    ],
    password: [
        validationRules.required,
        validationRules.string,
        {[validationRules.min]: 8},
    ],
};

export interface UserLoginInfo {
    email: string;
    password: string;
}

export class UserLoginData implements UserLoginInfo {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    public email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
