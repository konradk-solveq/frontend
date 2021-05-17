import {BikeDescription} from '../models/bike.model';
import {UserBike} from '../models/userBike.model';
import {
    transformToUserBikeType,
    transfromToBikeDescription,
} from '../utils/transformData';

export const getBike = (
    bikes: UserBike[],
    serialNumber: string,
): UserBike | null => {
    let result = null;
    bikes?.map(el => {
        if (el.description.serial_number === serialNumber) {
            result = transformToUserBikeType(el);
        }
    });
    return result;
};

export const getDescription = (
    bikes: UserBike[],
    serialNumber: string,
): BikeDescription | null => {
    let result = null;
    bikes?.map(el => {
        if (el.description.serial_number === serialNumber) {
            result = transfromToBikeDescription(el.description);
        }
    });
    return result;
};
