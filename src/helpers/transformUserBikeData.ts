import {UserBike} from '../models/userBike.model';

export const getBike = (bikes: UserBike[], serialNumber: string) => {
    let result = null;
    bikes?.map(el => {
        if (el.description.serial_number === serialNumber) {
            result = el;
        }
    });
    return result;
};