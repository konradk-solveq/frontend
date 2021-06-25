import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {Map} from '../../models/map.model';
import {mapsListToClass} from '../../utils/transformData';

export enum selectorTypeEnum {
    regular = 'regular',
    private = 'private',
    favourite = 'favourite',
}

export const mapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.maps);

export const privateMapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.privateMaps);

export const favouritesMapsSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.plannedMaps);

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

// export const favouritesMapsSelector = createSelector(
//     favouritesMapsIDSSelector,
//     mapsListSelector,
//     (fav, maps) => maps.filter(m => fav.includes(m.id)),
// );

export const mapDataByIDSelector = (mapID: string) =>
    createSelector(mapsListSelector, maps => maps.find(m => m.id === mapID));

export const favouriteMapDataByIDSelector = (mapID: string) =>
    createSelector(favouritesMapsSelector, maps =>
        maps.find(m => m.id === mapID),
    );

export const privateDataByIDSelector = (mapID: string) =>
    createSelector(privateMapsListSelector, pMaps =>
        pMaps.find(m => m.id === mapID),
    );

export const selectMapDataByIDBasedOnTypeSelector = (
    mapID: string,
    type: selectorTypeEnum,
) => {
    let selectorType = mapsListSelector;
    if (type === selectorTypeEnum.private) {
        selectorType = privateMapsListSelector;
    }
    if (type === selectorTypeEnum.favourite) {
        selectorType = favouritesMapsSelector;
    }

    return createSelector(selectorType, maps => maps.find(m => m.id === mapID));
};

export const mapPathByIDSelector = (mapID: string) =>
    createSelector(
        mapsListSelector,
        maps => maps.find(m => m.id === mapID)?.path,
    );

export const privateMapPathByIDSelector = (mapID: string) =>
    createSelector(
        privateMapsListSelector,
        maps => maps.find(m => m.id === mapID)?.path,
    );

export const favouriteMapPathByIDSelector = (mapID: string) =>
    createSelector(
        favouritesMapsSelector,
        maps => maps.find(m => m.id === mapID)?.path,
    );

export const selectMapPathByIDBasedOnTypeSelector = (
    mapID: string,
    type: selectorTypeEnum,
) => {
    let selectorType = mapsListSelector;
    if (type === selectorTypeEnum.private) {
        selectorType = privateMapsListSelector;
    }
    if (type === selectorTypeEnum.favourite) {
        selectorType = favouritesMapsSelector;
    }

    return createSelector(
        selectorType,
        maps => maps.find(m => m.id === mapID)?.path,
    );
};

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

export const nextPlannedPaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPlanned?.next;

export const prevPlannedPaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPlanned?.prev;

export const hasRecordedRoutesSelector = (state: RootState): boolean =>
    state.maps.privateMaps?.length > 0;

export const totalMapsNumberSelector = (state: RootState): number | null =>
    state.maps.totalMaps;

export const privateTotalMapsNumberSelector = (
    state: RootState,
): number | null => state.maps.totalPrivateMaps;
