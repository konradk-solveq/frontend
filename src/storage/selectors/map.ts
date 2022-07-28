import {createSelector} from 'reselect';
import {RootState} from '../storage';
import {FeaturedMapType, Map} from '../../models/map.model';
import {mapsListToClass} from '../../utils/transformData';
import routes from '../reducers/routes';
import {getMapFromFeaturedSections} from './utils/map';
import {NestedPaginationType} from '@src/interfaces/api';
import {
    ActiveFilters,
    FiltersState,
    IMapsListError,
    MapsState,
} from '@storage/reducers/maps';
import {appConfigSelector} from '@storage/selectors/app';

export enum selectorMapTypeEnum {
    regular = 'regular',
    private = 'private',
    favourite = 'favourite',
    featured = 'featured',
}

export const mapSelector = (state: RootState): MapsState => state.maps;

export const rawMapsListSelector = createSelector(
    mapSelector,
    maps => maps.maps,
);

export const rawPrivateMapsListSelector = createSelector(
    mapSelector,
    maps => maps.privateMaps,
);

export const rawFavouritesMapsListSelector = createSelector(
    mapSelector,
    maps => maps.plannedMaps,
);

export const mapsListSelector = createSelector(
    rawMapsListSelector,
    appConfigSelector,
    (maps, appConfig) => mapsListToClass(maps, appConfig),
);

export const privateMapsListSelector = createSelector(
    rawPrivateMapsListSelector,
    appConfigSelector,
    (maps, appConfig) => mapsListToClass(maps, appConfig),
);

export const favouritesMapsSelector = createSelector(
    rawFavouritesMapsListSelector,
    appConfigSelector,
    (maps, appConfig) => mapsListToClass(maps, appConfig),
);

export const mapsCountSelector = (state: RootState): FiltersState =>
    state.maps.filters;

export const mapsActiveFiltersSelector = (state: RootState): ActiveFilters =>
    state.maps.mapsAppliedFilters;

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

export const loadingMapsSelector = createSelector(
    mapSelector,
    maps => maps.loading,
);

export const formLoadingMapsSelector = createSelector(
    mapSelector,
    maps => maps.formLoading,
);

export const mapsErroSelector = createSelector(mapSelector, maps => maps.error);
export const mapsStatusCodeSelector = createSelector(
    mapSelector,
    maps => maps.statusCode,
);

export const mapsErrorSelector = createSelector(
    mapsErroSelector,
    mapsStatusCodeSelector,
    (error, status) => ({
        message: error,
        statusCode: status,
    }),
);

export const refreshMapsSelector = (state: RootState): boolean =>
    state.maps.refresh;

export const mapIdToAddSelector = createSelector(
    mapSelector,
    maps => maps.mapToAddId,
);

export const mapDataByIDSelector = (mapID?: string) =>
    createSelector(mapsListSelector, (maps: Map[]) =>
        maps.find(m => m.id === mapID),
    );

export const favouriteMapDataByIDSelector = (mapID: string) =>
    createSelector(favouritesMapsSelector, (maps: Map[]) =>
        maps.find(m => m.id === mapID),
    );

export const privateDataByIDSelector = (mapID: string) =>
    createSelector(privateMapsListSelector, (pMaps: Map[]) =>
        pMaps.find(m => m.id === mapID),
    );

export const selectMapDataByIDBasedOnTypeSelector = (
    mapID: string,
    type: selectorMapTypeEnum,
) => {
    let selectorType = mapsListSelector;
    if (type === selectorMapTypeEnum.private) {
        selectorType = privateMapsListSelector;
    }
    if (type === selectorMapTypeEnum.favourite) {
        selectorType = favouritesMapsSelector;
    }
    if (type === selectorMapTypeEnum.featured) {
        return featuredMapDataByIdSelector(mapID);
    }

    return createSelector(selectorType, (maps: Map[]) =>
        maps.find(m => m.id === mapID),
    );
};

export const mapPathByIDSelector = (mapID: string) =>
    createSelector(
        mapsListSelector,
        (maps: Map[]) => maps.find(m => m.id === mapID)?.path,
    );

export const privateMapPathByIDSelector = (mapID: string) =>
    createSelector(
        privateMapsListSelector,
        (maps: Map[]) => maps.find(m => m.id === mapID)?.path,
    );

export const favouriteMapPathByIDSelector = (mapID: string) =>
    createSelector(
        favouritesMapsSelector,
        (maps: Map[]) => maps.find(m => m.id === mapID)?.path,
    );

export const selectMapPathByIDBasedOnTypeSelector = (
    mapID: string,
    type: selectorMapTypeEnum,
) => {
    let selectorType = mapsListSelector;
    if (type === selectorMapTypeEnum.private) {
        selectorType = privateMapsListSelector;
    }
    if (type === selectorMapTypeEnum.favourite) {
        selectorType = favouritesMapsSelector;
    }
    if (type === selectorMapTypeEnum.featured) {
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

export const featuredMapsLengthSelector = createSelector(
    featuredMapsSelector,
    fm => fm?.length || 0,
);

export const mapsListErrorSelector = (state: RootState): IMapsListError =>
    state.maps.mapsListError;

export const plannedMapsListErrorSelector = createSelector(
    mapsListErrorSelector,
    (errors: IMapsListError) => errors.planned,
);

export const privateMapsListErrorSelector = createSelector(
    mapsListErrorSelector,
    (errors: IMapsListError) => errors.private,
);

export const publicMapsListErrorSelector = createSelector(
    mapsListErrorSelector,
    (errors: IMapsListError) => errors.public,
);
