import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {Map} from '../../models/map.model';
import {mapsListToClass} from '../../utils/transformData';

export const mapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.maps);

export const favouritesMapsIDSSelector = (state: RootState): string[] =>
    state.maps.favourites;

export const loadingMapsSelector = (state: RootState): boolean =>
    state.maps.loading;

export const refreshMapsSelector = (state: RootState): boolean =>
    state.maps.refresh;

export const favouritesMapsSelector = createSelector(
    favouritesMapsIDSSelector,
    mapsListSelector,
    (fav, maps) => maps.filter(m => fav.includes(m.id)),
);

export const mapDataByIDSelector = (mapID: string) =>
    createSelector(mapsListSelector, maps => maps.find(m => m.id === mapID));

export const nextPaginationCoursor = (state: RootState): string | undefined =>
    state.maps.paginationCoursor?.next;

export const prevPaginationCoursor = (state: RootState): string | undefined =>
    state.maps.paginationCoursor?.prev;
