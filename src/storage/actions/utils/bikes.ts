import {UserBikeI} from '@models/userBike.model';

export const getNumbersToUpdate = (bikesData: UserBikeI[]) => {
    if (!bikesData?.length || !Array.isArray(bikesData)) {
        return;
    }

    const numbers: string[] = [];

    bikesData?.forEach((el: UserBikeI) => {
        const num = el?.description?.serial_number;
        if (num) {
            numbers.push(num);
        }
    });

    return numbers;
};
