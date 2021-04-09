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

export class UserRideProfile implements RiderProfile {
    /* TODO: class validator */
    constructor(
        public cyclingStyle: number,
        public tours: number,
        public whereDoYouGo: number,
        public drivingSpeed: number,
        public distancePerMonth: number,
        public whoAreYou: number,
        public profileNumber: number,
        public name: string
    ){}
}