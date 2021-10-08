/**
 * Utils for maps reducer.
 *
 * @author Sebastian Kasiński
 */

import {FeaturedMapType, MapType} from '@models/map.model';
import {NestedPaginationType} from '@interfaces/api';
import {NestedTotalMapsType} from '@type/maps';

import {getTimeInUTCMilliseconds} from '@utils/transformData';
import deepCopy from '@helpers/deepCopy';

interface FeaturedMapsDataI {
    refresh: boolean;
    featuredMaps: FeaturedMapType[] | FeaturedMapType;
}

interface FeaturedMapsOldDataI {
    oldFeaturedMaps: FeaturedMapType[];
    oldPaginationCoursorFeatured: NestedPaginationType[];
    oldTotalFeaturedMaps: NestedTotalMapsType[];
}

interface MergedPaginationI {
    paginationCoursorFeatured: NestedPaginationType[];
    totalFeaturedMaps: NestedTotalMapsType[];
}

export interface MergedFeaturedMapsI {
    paginationCoursorFeatured: NestedPaginationType[];
    totalFeaturedMaps: NestedTotalMapsType[];
    newFeaturedMaps: FeaturedMapType[];
}

export const sortByDistance = (data: MapType[]) => {
    const m: MapType[] = deepCopy(data);

    return m?.sort((a, b) => {
        const distanceA = a.distanceToRoute || 0;
        const distanceB = b.distanceToRoute || 0;

        if (distanceA === distanceB) {
            const createdAtA = getTimeInUTCMilliseconds(a.createdAt);
            const createdAtB = getTimeInUTCMilliseconds(b.createdAt);

            if (createdAtA === createdAtB) {
                const dA = a.distance || 0;
                const dB = b.distance || 0;

                if (dA === dB) {
                    return 0;
                }

                return dA < dB ? -1 : 1;
            }

            return createdAtA < createdAtB ? -1 : 1;
        }

        return distanceA < distanceB ? -1 : 1;
    });
};

/**
 *
 * Merge pagination and total maps number
 *
 * @param {Array} paginationCoursorFeatured
 * @param {Array} totalFeaturedMaps
 * @param  {Array} mapsData
 *
 * @returns {Object} Retruns object according to MergedPaginationI
 *
 * @example
 *
 * ```typescript
 * {
 *    paginationCoursorFeatured: [{
 *      id: "id-string",
 *      pagination: {next: "nextUrl", prev: "prevUrl", self: "selfUrl"}
 *   }],
 *   totalFeaturedMaps: [{
 *      id: "id-string",
 *      value: 3
 *   }],
 * }
 * ```
 *
 */
export const getFeaturedMapsListPaginations = (
    paginationCoursorFeatured: NestedPaginationType[],
    totalFeaturedMaps: NestedTotalMapsType[],
    mapsData: FeaturedMapType[],
): MergedPaginationI => {
    /** src: paginationCoursorFeatured */
    const pcf: NestedPaginationType[] = deepCopy(paginationCoursorFeatured);
    /** src: totalFeaturedMaps */
    const tfm: NestedTotalMapsType[] = deepCopy(totalFeaturedMaps);

    mapsData?.forEach(c => {
        const newPagination = {
            id: c?.section?.id,
            pagination: c?.routes?.links,
        };
        const newTotalNumber = {
            id: c?.section?.id,
            value: c?.routes?.total || 0,
        };

        const sectionPagination = pcf.find(p => p.id === c?.section?.id);
        if (!sectionPagination || !pcf?.length) {
            pcf.push(newPagination);
        } else {
            const indexToReplace = pcf?.indexOf(sectionPagination);

            pcf[indexToReplace] = newPagination;
        }

        const sectionTotalNumber = tfm.find(p => p.id === c?.section?.id);
        if (!sectionTotalNumber || !tfm?.length) {
            tfm.push(newTotalNumber);
        } else {
            const indexToReplace = tfm?.indexOf(sectionTotalNumber);
            tfm[indexToReplace] = newTotalNumber;
        }
    });

    return {
        paginationCoursorFeatured: pcf,
        totalFeaturedMaps: tfm,
    };
};

/**
 *
 * Merge featured maps data
 *
 * @param {Object} FeaturedMapsData {refresh, featuredMaps}
 * @param {Object} FeaturedMapsOldData {oldFeaturedMaps, oldPaginationCoursorFeatured, oldTotalFeaturedMaps}
 *
 * @returns {Object} Retruns object according to MergedFeaturedMapsI
 *
 * @example
 *
 * ```typescript
 * {
 *    paginationCoursorFeatured: [{
 *      id: "id-string",
 *      pagination: {next: "nextUrl", prev: "prevUrl", self: "selfUrl"}
 *   }],
 *   totalFeaturedMaps: [{
 *      id: "id-string",
 *      value: 3
 *   }],
 *   newFeaturedMaps: [{
 *      section: {
 *      id: "id-string",
 *      title: "Title",
 *      },
 *      routes: {
 *        elements: [],
 *        links: {prev: ""},
 *        total: 0
 *      },
 *   }]
 * }
 * ```
 *
 */
export const mergeFeaturedMapsListData = (
    {refresh, featuredMaps}: FeaturedMapsDataI,
    {
        oldFeaturedMaps,
        oldPaginationCoursorFeatured,
        oldTotalFeaturedMaps,
    }: FeaturedMapsOldDataI,
): MergedFeaturedMapsI => {
    /** src: oldFeaturedMaps */
    let newFeaturedMaps: FeaturedMapType[] = deepCopy(oldFeaturedMaps);
    /** src: oldPaginationCoursorFeatured */
    let pcf: NestedPaginationType[] = deepCopy(oldPaginationCoursorFeatured);
    /** src: oldTotalFeaturedMaps */
    let tfm: NestedTotalMapsType[] = deepCopy(oldTotalFeaturedMaps);

    const newMaps: FeaturedMapType | FeaturedMapType[] = deepCopy(featuredMaps);

    if (refresh) {
        if (Array.isArray(newMaps)) {
            newFeaturedMaps = [...newMaps];
        } else {
            newFeaturedMaps = [newMaps];
        }
        pcf = [];
        tfm = [];
    }

    if (!refresh && newFeaturedMaps?.length && !Array.isArray(newMaps)) {
        /**
         * Pagintaion returns single object
         */
        const newMapsId = newMaps?.section?.id;
        /** Check if section with such ID exists */
        const oldFeaturedMap = newFeaturedMaps?.find(
            fm => fm.section.id === newMapsId,
        );
        if (newMapsId && oldFeaturedMap) {
            /** Find index of section */
            const indexToReplace = newFeaturedMaps?.indexOf(oldFeaturedMap);
            if (indexToReplace === undefined) {
                newFeaturedMaps = [...newFeaturedMaps, newMaps];
            } else {
                const elementsToAdd = newMaps?.routes?.elements || [];
                const newPaginationLinks = newMaps?.routes?.links;
                const oldMap = newFeaturedMaps[indexToReplace];

                const sorted = sortByDistance([
                    ...oldMap.routes.elements,
                    ...elementsToAdd,
                ]);

                newFeaturedMaps[indexToReplace] = {
                    ...oldMap,
                    routes: {
                        ...oldMap.routes,
                        elements: sorted,
                        links: newPaginationLinks,
                    },
                };
            }
        } else {
            newFeaturedMaps = [...newFeaturedMaps, newMaps]?.map(m => {
                const sortedElements = sortByDistance(m.routes.elements);
                return {
                    ...m,
                    routes: {
                        ...m.routes,
                        elements: sortedElements,
                    },
                };
            });
        }
    }

    const additionalData = getFeaturedMapsListPaginations(
        pcf,
        tfm,
        newFeaturedMaps,
    );

    return {
        newFeaturedMaps: newFeaturedMaps,
        ...additionalData,
    };
};
