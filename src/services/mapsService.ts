import {
    addPlannedRoute,
    editPrivateMapMetaData,
    getMaps,
    getPlannedRoutes,
    getPrivateRoutes,
    publishPrivateMapData,
    removeImagesToMapData,
    removePlannedRoute,
    removePrivateMapData,
    uploadImageToMapData,
    getRoute,
    getMarkersList,
    getFeaturedMaps,
} from '@api/index';

import {BBox} from '@models/places.model';
import {
    MapType,
    Coords,
    MapMarkerType,
    MapsData,
    FeaturedMapType,
    MapsCountData,
} from '@models/map.model';
import {ImagesMetadataType} from '@interfaces/api';
import {MapFormDataResult, PickedFilters} from '@interfaces/form';
import {BasicCoordsType} from '@type/coords';
import '@utils/polyfills/Promise.allSettled';
import i18next from '@translations/i18next';

import {
    createFileFormData,
    mapFormMetadataToAPIRequest,
} from '@utils/apiDataTransform/prepareRequest';
import {getFiltersParam} from '@utils/apiDataTransform/filters';
import {loggErrorMessage} from '@sentryLogger/sentryLogger';
import {getImgErrorMessage} from '@services/utils/getErrorMessage';
import {
    getMapsCount,
    getPrivateMapsCount,
    getPlannedMapsCount,
} from '@api/maps';

export type CreatedPlannedMap = {
    id: string;
};

export interface MapsResponse {
    data: MapsData;
    status: number;
    error: string;
}
export interface MapsCountResponse {
    data: MapsCountData;
    status: number;
    error: string;
}

export interface FeaturedMapsResponse {
    data: FeaturedMapType[];
    status: number;
    error: string;
}

export interface MapResponse {
    data: MapType | null;
    status: number;
    error: string;
}

export interface MapMarkersResponse {
    data: MapMarkerType[];
    status: number;
    error: string;
}

export interface PlannedMapsResponse {
    data: CreatedPlannedMap | null;
    status: number;
    error: string;
}

export interface MapsDataResponse {
    data: string | null;
    status: number;
    error: string;
}

export const getMapsList = async (
    location: Coords,
    paginationUrl?: string,
    filters?: PickedFilters,
): Promise<MapsResponse> => {
    const f = getFiltersParam(filters);

    const response = await getMaps(location, paginationUrl, f);
    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}, total: 0},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
            total: response.data.total,
        },
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getMapsListCount = async (
    filters?: PickedFilters,
    controller?: AbortController,
): Promise<MapsCountResponse> => {
    const f = getFiltersParam(filters);
    const response = await getMapsCount(f, controller);
    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {total: '0'},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getPrivateMapsListCount = async (
    filters?: PickedFilters,
    controller?: AbortController,
): Promise<MapsCountResponse> => {
    const f = getFiltersParam(filters);
    const response = await getPrivateMapsCount(f, controller);
    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {total: '0'},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getPlannedMapsListCount = async (
    filters?: PickedFilters,
    controller?: AbortController,
): Promise<MapsCountResponse> => {
    const f = getFiltersParam(filters);
    const response = await getPlannedMapsCount(f, controller);
    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {total: '0'},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getPrivateMapsListService = async (
    location: Coords,
    page?: string,
    filters?: PickedFilters,
): Promise<MapsResponse> => {
    const f = getFiltersParam(filters);

    const response = await getPrivateRoutes(location, page, f);

    if (!response?.data || response?.status >= 400) {
        let errorMessage = 'error';
        if (response?.data?.message || response?.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}, total: 0},
            status: response?.data?.statusCode || response?.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data?.elements,
            links: response.data?.links,
            total: response.data?.total,
        },
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const editPrivateMapMetadataService = async (
    data: MapFormDataResult,
    author: string,
    images?: ImagesMetadataType,
    publish?: boolean,
    id?: string,
): Promise<MapsDataResponse> => {
    const metadata = mapFormMetadataToAPIRequest(
        data,
        data.publishWithName ? author : '',
    );
    /* Update metadata */
    const response = await editPrivateMapMetaData(id || data.id, metadata);

    /* TODO:  extract error methods */
    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    /* Publish route */
    if (publish) {
        const publishResponse = await publishPrivateMapData(id || data.id);

        if (
            !publishResponse?.data ||
            publishResponse.status >= 400 ||
            publishResponse.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (publishResponse.data?.message || publishResponse.data?.error) {
                errorMessage =
                    publishResponse.data.message || publishResponse.data.error;
                if (publishResponse.data?.statusCode !== 400) {
                    errorMessage = i18next.t('dataAction.mapData.publishError');
                }
            }
            return {
                data: null,
                status:
                    publishResponse.data?.statusCode || publishResponse.status,
                error: errorMessage,
            };
        }
    }

    /* Upload images */
    if (images?.save?.length) {
        const imagePromises = [];
        for (let i = 0; i < images.save.length; i++) {
            const formdata = createFileFormData(images.save[i]);
            imagePromises.push(uploadImageToMapData(id || data.id, formdata));
        }
        const imageResponses = await Promise.allSettled(imagePromises);
        const errorMessages: string[] = [];
        let errorStatus;
        imageResponses.forEach((imgResponse, i) => {
            if (imgResponse.status === 'rejected') {
                const errorMessage = getImgErrorMessage(
                    imgResponse.reason,
                    images.save && images.save[i].fileName,
                );
                errorMessages.push(errorMessage);
                errorStatus =
                    imgResponse?.reason?.status ||
                    imgResponse?.reason?.data?.statusCode;
                return;
            }
            if (imgResponse.status === 'fulfilled' && !imgResponse.value.data) {
                const errorMessage = getImgErrorMessage(
                    imgResponse.value,
                    images.save && images.save[i].fileName,
                );
                errorMessages.push(errorMessage);
                errorStatus = imgResponse?.value?.status;
            }
        });
        const errorMessage = Array.from(
            new Set(errorMessages.filter(x => !!x)),
        ).join(', ');
        if (errorStatus) {
            return {
                data: null,
                status: errorStatus,
                error: errorMessage,
            };
        }
    }

    /* Delete images */
    if (images?.delete?.length) {
        const deletedImagesResponse = await removeImagesToMapData(
            data.id,
            images.delete,
        );

        if (
            !deletedImagesResponse?.data ||
            deletedImagesResponse.status >= 400 ||
            deletedImagesResponse.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (
                deletedImagesResponse.data?.message ||
                deletedImagesResponse.data?.error
            ) {
                errorMessage =
                    deletedImagesResponse.data.message ||
                    deletedImagesResponse.data.error;
            }
            return {
                data: null,
                status:
                    deletedImagesResponse.data?.statusCode ||
                    deletedImagesResponse.status,
                error: errorMessage,
            };
        }
    }

    return {
        data: '',
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const removePrivateMapByIdService = async (
    id: string,
): Promise<MapsDataResponse> => {
    const response = await removePrivateMapData(id);

    if (response.status >= 400 || response.data?.statusCode >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
            if (
                response.data?.statusCode !== 400 &&
                response.data.statusCode !== 404
            ) {
                errorMessage = i18next.t(
                    'dataAction.routeData.removeRouteError',
                );
            }
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: '',
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getPlannedMapsListService = async (
    location: Coords,
    page?: string,
    filters?: PickedFilters,
): Promise<MapsResponse> => {
    const f = getFiltersParam(filters);

    const response = await getPlannedRoutes(location, page, f);

    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}, total: 0},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
            total: response.data.total,
        },
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const addPlannedMapsListService = async (
    id: string,
): Promise<PlannedMapsResponse> => {
    const response = await addPlannedRoute(id);

    if (response.status >= 400 || response.data?.statusCode >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: null,
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const removePlannedMapByIdService = async (
    id: string,
): Promise<MapsDataResponse> => {
    const response = await removePlannedRoute(id);

    if (response.status >= 400 || response.data?.statusCode >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
            if (
                response.data?.statusCode !== 400 &&
                response.data.statusCode !== 404
            ) {
                errorMessage = i18next.t(
                    'dataAction.routeData.removeRouteError',
                );
            }
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: '',
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getMapsByTypeAndId = async (
    mapId: string,
    location?: Coords,
    withPath?: boolean,
    controller?: AbortController,
): Promise<MapResponse> => {
    const response = await getRoute(mapId, location, withPath, controller);

    if (
        !response?.data ||
        response.status >= 400 ||
        response.data?.statusCode >= 400
    ) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: response.data,
        status: response.data?.statusCode || response.status,
        error: '',
    };
};

export const getMarkersListService = async (
    bbox: BBox,
    location: BasicCoordsType,
    controller?: AbortController,
): Promise<MapMarkersResponse> => {
    try {
        const response = await getMarkersList(bbox, location, controller);

        if (
            !response?.data ||
            response.status >= 400 ||
            response?.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
            }
            return {data: [], status: response.status, error: errorMessage};
        }

        return {
            data: response.data,
            status: response.status,
            error: '',
        };
    } catch (error) {
        return {
            data: [],
            status: 500,
            error: error,
        };
    }
};

export const getFeaturedMapsListService = async (
    location: Coords,
    paginationUrl?: string,
): Promise<FeaturedMapsResponse> => {
    try {
        const response = await getFeaturedMaps(location, paginationUrl);
        if (
            !response?.data ||
            response.status >= 400 ||
            response.data?.statusCode >= 400
        ) {
            let errorMessage = 'error';
            if (response.data?.message || response.data?.error) {
                errorMessage = response.data.message || response.data.error;
            }
            return {
                data: [],
                status: response.data?.statusCode || response.status,
                error: errorMessage,
            };
        }

        return {
            data: response.data,
            status: response.data?.statusCode || response.status,
            error: '',
        };
    } catch (error) {
        loggErrorMessage(error, 'getFeaturedMapsList -- maps');
        return {
            data: [],
            status: 500,
            error: 'Internal error',
        };
    }
};
