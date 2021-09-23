import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {FeaturedMapType, Map} from '../../models/map.model';
import {mapsListToClass} from '../../utils/transformData';
import routes from '../reducers/routes';
import {getMapFromFeaturedSections} from './utils/map';
import {NestedPaginationType} from '@src/interfaces/api';

export enum selectorTypeEnum {
    regular = 'regular',
    private = 'private',
    favourite = 'favourite',
    featured = 'featured',
}

export const mapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.maps, state.app.config);

export const privateMapsListSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.privateMaps, state.app.config);

export const favouritesMapsSelector = (state: RootState): Map[] =>
    mapsListToClass(state.maps.plannedMaps, state.app.config);

export const featuredMapsSelector = (state: RootState): FeaturedMapType[] =>
    state.maps.featuredMaps.map((e: FeaturedMapType) => {
        let elements: Map[] = [];
        if (e?.routes?.elements?.length) {
            elements = mapsListToClass(e.routes.elements, state.app.config);
        }

        if (!elements?.length) {
            return e;
        }

        return {
            ...e,
            routes: {
                ...routes,
                elements: elements,
            },
        };
    });

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

export const mapDataByIDSelector = (mapID?: string) =>
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
    if (type === selectorTypeEnum.featured) {
        return featuredMapDataByIdSelector(mapID);
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
    if (type === selectorTypeEnum.featured) {
        return featuredMapPathDataByIdSelector(mapID);
    }

    return createSelector(
        selectorType,
        maps => maps.find(m => m.id === mapID)?.path,
    );
};

export const featuredMapDataByIdSelector = (mapID: string) =>
    createSelector(featuredMapsSelector, fMaps =>
        getMapFromFeaturedSections(fMaps, mapID),
    );

export const featuredMapPathDataByIdSelector = (mapID: string) =>
    createSelector(
        featuredMapsSelector,
        fMaps => getMapFromFeaturedSections(fMaps, mapID)?.path,
    );

export const featuredMapDataBySectionIdSelector = (sectionID: string) =>
    createSelector(featuredMapsSelector, maps =>
        maps.find(m => m.section.id === sectionID),
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

export const nextPlannedPaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPlanned?.next;

export const prevPlannedPaginationCoursor = (
    state: RootState,
): string | undefined => state.maps.paginationCoursorPlanned?.prev;

export const nextFeaturedPaginationCoursors = (
    state: RootState,
): NestedPaginationType[] => state.maps.paginationCoursorFeatured;

export const nextFeaturedPaginationCoursor = (sectionID: string) =>
    createSelector(
        nextFeaturedPaginationCoursors,
        cursors => cursors?.find(c => c.id === sectionID)?.pagination?.next,
    );

export const hasRecordedRoutesSelector = (state: RootState): boolean =>
    state.maps.privateMaps?.length > 0;

export const totalMapsNumberSelector = (state: RootState): number | null =>
    state.maps.totalMaps;

export const privateTotalMapsNumberSelector = (
    state: RootState,
): number | null => state.maps.totalPrivateMaps;
