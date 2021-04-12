import {IsNotEmpty, IsString, IsInt} from 'class-validator';
import validationRules from '../utils/validation/validationRules';

export interface RiderProfile {
    cyclingStyle: number;
    tours: number;
    whereDoYouGo: number;
    drivingSpeed: number;
    distancePerMonth: number;
    whoAreYou: number;
    profileNumber: number;
    name: string;
}

export const userRiderProfileValidationRules = {
    cyclingStyle: [validationRules.required, validationRules.int],
    tours: [validationRules.required, validationRules.int],
    whereDoYouGo: [validationRules.required, validationRules.int],
    drivingSpeed: [validationRules.required, validationRules.int],
    distancePerMonth: [validationRules.required, validationRules.int],
    whoAreYou: [validationRules.required, validationRules.int],
    profileNumber: [validationRules.required, validationRules.int],
    name: [validationRules.required, validationRules.string],
};

export class UserRideProfile implements RiderProfile {
    @IsNotEmpty()
    @IsInt()
    public cyclingStyle: number;

    @IsNotEmpty()
    @IsInt()
    public tours: number;

    @IsNotEmpty()
    @IsInt()
    public whereDoYouGo: number;

    @IsNotEmpty()
    @IsInt()
    public drivingSpeed: number;

    @IsNotEmpty()
    @IsInt()
    public distancePerMonth: number;

    @IsNotEmpty()
    @IsInt()
    public whoAreYou: number;

    @IsNotEmpty()
    @IsInt()
    public profileNumber: number;

    @IsNotEmpty()
    @IsString()
    public name: string;

    constructor(
        cyclingStyle: number,
        tours: number,
        whereDoYouGo: number,
        drivingSpeed: number,
        distancePerMonth: number,
        whoAreYou: number,
        profileNumber: number,
        name: string,
    ) {
        this.cyclingStyle = cyclingStyle;
        this.tours = tours;
        this.whereDoYouGo = whereDoYouGo;
        this.drivingSpeed = drivingSpeed;
        this.distancePerMonth = distancePerMonth;
        this.whoAreYou = whoAreYou;
        this.profileNumber = profileNumber;
        this.name = name;
    }
}
