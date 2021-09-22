import {RootState} from '../storage';
import {BikeDescription} from '../../models/bike.model';
import {UserBike} from '../../models/userBike.model';
import {getBike, getDescription} from '../../helpers/transformUserBikeData';
import {bikesListToClass} from '../../utils/transformData';

export const bikesListSelector = (state: RootState): UserBike[] =>
    bikesListToClass(state.bikes.list);

export const bikeByFrameNumberSelector = (
    state: RootState,
    frameNr: string,
): UserBike | null => getBike(state.bikes.list, frameNr);

export const loadingBikesSelector = (state: RootState): boolean =>
    state.bikes.loading;

export const errorBikesSelector = (state: RootState): string =>
    state.bikes.error;

export const bikeDescriptionByFrameNumberSelector = (
    state: RootState,
    frameNr: string,
): BikeDescription | null => getDescription(state.bikes.list, frameNr);

export const hasAnyBikeSelector = (state: RootState): boolean =>
    !!state.bikes.list.length;
