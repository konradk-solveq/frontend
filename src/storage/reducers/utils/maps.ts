/**
 * Utils for maps reducer.
 *
 * @author Sebastian Kasiński
 */

import {NestedPaginationType} from '@interfaces/api';
import {FeaturedMapType} from '@models/map.model';
import {getTimeInUTCMilliseconds} from '@src/utils/transformData';
import {NestedTotalMapsType} from '@type/maps';

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
    const pcf = paginationCoursorFeatured;
    const tfm = totalFeaturedMaps;

    mapsData?.forEach(c => {
        const newPag = {
            id: c?.section?.id,
            pagination: c?.routes?.links,
        };
        const newTotal = {
            id: c?.section?.id,
            value: c?.routes?.total || 0,
        };
        
        const ele = pcf.find(p => p.id === c?.section?.id);
        const el2 = tfm.find(p => p.id === c?.section?.id);
        if (!ele || !pcf?.length) {
            
            pcf.push(newPag);
        } else {
            
            const indexToReplace = pcf?.indexOf(ele);
            
            pcf[indexToReplace] = newPag;
        }

        if (!el2 || !tfm?.length) {
            tfm.push(newTotal);
        } else {
            const indexToReplace = tfm?.indexOf(el2);
            tfm[indexToReplace] = newTotal;
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
    let newFeaturedMaps = oldFeaturedMaps;
    let pcf = oldPaginationCoursorFeatured;
    let tfm = oldTotalFeaturedMaps;

    if (refresh) {
        if (Array.isArray(featuredMaps)) {
            newFeaturedMaps = [...featuredMaps];
        } else {
            newFeaturedMaps = [featuredMaps];
        }
        pcf = [];
        tfm = [];
    }

    if (!refresh && newFeaturedMaps?.length && !Array.isArray(featuredMaps)) {
        /**
         * Pagintaion returns single object
         */
        const newMaps: FeaturedMapType = featuredMaps;
        const newMapsId = newMaps?.section?.id;
        const el = newFeaturedMaps?.find(fm => fm.section.id === newMapsId);
        if (newMapsId && el) {
            const indexToReplace = newFeaturedMaps?.indexOf(el);
            if (indexToReplace === undefined) {
                newFeaturedMaps = [...newFeaturedMaps, newMaps];
            } else {
                const elementsToAdd = newMaps?.routes?.elements || [];
                const newLinks = newMaps?.routes?.links;
                const oldMap = newFeaturedMaps[indexToReplace];
                const sorted = [
                    ...oldMap.routes.elements,
                    ...elementsToAdd,
                ]?.sort((a, b) => {
                    const distanceA = a.distanceToRoute || 0;
                    const distanceB = b.distanceToRoute || 0;
        
                    if (distanceA === distanceB) {
                        const createdAtA = getTimeInUTCMilliseconds(
                            a.createdAt,
                        );
                        const createdAtB = getTimeInUTCMilliseconds(
                            b.createdAt,
                        );
        
                        if (createdAtA === createdAtB) {
                            if (createdAtA === createdAtB) {
                                return 0;
                            }
        
                            return createdAtA < createdAtB ? -1 : 1;
                        }
        
                        return createdAtA < createdAtB ? -1 : 1;
                    }
        
                    return distanceA < distanceB ? -1 : 1;
                });

                newFeaturedMaps[indexToReplace] = {
                    ...oldMap,
                    routes: {
                        ...oldMap.routes,
                        elements: sorted,
                        links: newLinks
                    },
                };
            }
        } else {
            console.log('[SET HERE]')
            newFeaturedMaps = [...newFeaturedMaps, newMaps]?.map(m => {
                return m?.sort((a, b) => {
                    const distanceA = a.distanceToRoute || 0;
                    const distanceB = b.distanceToRoute || 0;
        
                    if (distanceA === distanceB) {
                        const createdAtA = getTimeInUTCMilliseconds(
                            a.createdAt,
                        );
                        const createdAtB = getTimeInUTCMilliseconds(
                            b.createdAt,
                        );
        
                        if (createdAtA === createdAtB) {
                            if (createdAtA === createdAtB) {
                                return 0;
                            }
        
                            return createdAtA < createdAtB ? -1 : 1;
                        }
        
                        return createdAtA < createdAtB ? -1 : 1;
                    }
        
                    return distanceA < distanceB ? -1 : 1;
                });
            });
        }
    }

    // const mToAdd = Array.isArray(featuredMaps) ? featuredMaps : [featuredMaps];

    const additionalData = getFeaturedMapsListPaginations(pcf, tfm, newFeaturedMaps);

    return {
        newFeaturedMaps: newFeaturedMaps,
        ...additionalData,
    };
};
