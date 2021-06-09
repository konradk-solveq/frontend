import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {Map} from '../../models/map.model';
import {mapsListToClass} from '../../utils/transformData';

export const mapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.maps);

export const privateMapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.privateMaps);

export const favouritesMapsIDSSelector = (state: RootState): string[] =>
    state.maps.favourites;

export const loadingMapsSelector = (state: RootState): boolean =>
    state.maps.loading;

export const mapsErrorSelector = (
    state: RootState,
): {message: string; statusCode: number} => ({
    message: state.maps.error,
    statusCode: state.maps.statusCode,
});

export const refreshMapsSelector = (state: RootState): boolean =>
    state.maps.refresh;

export const mapIdToAddSelector = (state: RootState): string =>
    state.maps.mapToAddId;

export const favouritesMapsSelector = createSelector(
    favouritesMapsIDSSelector,
    mapsListSelector,
    (fav, maps) => maps.filter(m => fav.includes(m.id)),
);

export const mapDataByIDSelector = (mapID: string) =>
    createSelector(mapsListSelector, maps => maps.find(m => m.id === mapID));

export const privateDataByIDSelector = (mapID: string) =>
    createSelector(privateMapsListSelector, pMaps =>
        pMaps.find(m => m.id === mapID),
    );

export const nextPaginationCoursor = (state: RootState): string | undefined =>
    state.maps.paginationCoursor?.next;

export const prevPaginationCoursor = (state: RootState): string | undefined =>
    state.maps.paginationCoursor?.prev;

export const nextPrivatePaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPrivate?.next;

export const prevPrivatePaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPrivate?.prev;

export const hasRecordedRoutesSelector = (state: RootState): boolean =>
    state.maps.privateMaps?.length > 0;
