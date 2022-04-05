import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {BikeDescription} from '../../models/bike.model';
import {UserBike} from '../../models/userBike.model';
import {getBike, getDescription} from '../../helpers/transformUserBikeData';
import {
    bikesConfigToClass,
    bikesListToClass,
    genericBikeToClass,
} from '@utils/transformData';
import {BikesState} from '@storage/reducers/bikes';

export const bikeSelector = (state: RootState): BikesState => state.bikes;

export const bikesListSelector = (state: RootState): UserBike[] =>
    bikesListToClass(state.bikes.list);

export const bikeByFrameNumberSelector = (frameNr: string) =>
    createSelector(bikesListSelector, bs => getBike(bs, frameNr));

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

export const genericBikeSelector = createSelector(bikeSelector, bs =>
    genericBikeToClass(bs.genericBike),
);

export const bikesConfigSelector = createSelector(bikeSelector, bs =>
    bikesConfigToClass(bs.config),
);

export const bikeTypesSelector = createSelector(
    bikesConfigSelector,
    bc => bc?.bikeTypesOptions,
);
