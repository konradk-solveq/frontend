/**
 * Utils for bikes reducer.
 *
 * @author Sebastian Kasiński
 */

import {UserBike} from '@models/userBike.model';
import deepCopy from '@helpers/deepCopy';

export const addNewBikeDataOrReplaceIfExists = (
    oldBikesList: UserBike[],
    newBikeData: UserBike,
) => {
    try {
        if (!oldBikesList?.length) {
            return [newBikeData];
        }

        const oldBikes: UserBike[] = deepCopy(oldBikesList);
        if (!oldBikes?.length) {
            return [newBikeData];
        }

        const updatedBikes = oldBikes?.filter((el: UserBike) => {
            const frameNrExists =
                el.description.serial_number ===
                newBikeData.description.serial_number;

            return !frameNrExists;
        });

        updatedBikes.push(newBikeData);

        return updatedBikes;
    } catch (error) {
        return oldBikesList;
    }
};

export const updateBikesList = (
    oldBikesList: UserBike[],
    bikesToUpdateList: UserBike[],
    bikeNumbersList: string[],
) => {
    try {
        if (!oldBikesList?.length) {
            return bikesToUpdateList;
        }
        const oldBikes: UserBike[] = deepCopy(oldBikesList);

        if (!oldBikes?.length) {
            return bikesToUpdateList;
        }

        if (!bikeNumbersList?.length) {
            return oldBikes;
        }

        if (!bikesToUpdateList?.length) {
            return oldBikes;
        }

        const filteredBikes = oldBikes?.filter(
            el => !bikeNumbersList?.includes(el.description.serial_number),
        );

        return [...bikesToUpdateList, ...filteredBikes];
    } catch (error) {
        return oldBikesList;
    }
};
