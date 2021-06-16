import {
    editPrivateMapMetaData,
    getMaps,
    getPrivateRoutes,
    publishPrivateMapData,
    removeImagesToMapData,
    removePrivateMapData,
    uploadImageToMapData,
} from '../api';
import {ImagesMetadataType} from '../interfaces/api';
import {MapFormDataResult, PickedFilters} from '../interfaces/form';
import {MapType, Coords} from '../models/map.model';
import {getFiltersParam} from '../utils/apiDataTransform/filters';
import {
    createFileFormData,
    mapFormMetadataToAPIRequest,
} from '../utils/apiDataTransform/prepareRequest';

export interface MapsData {
    elements: MapType[] | [];
    links: {prev: string};
}

export interface MapsResponse {
    data: MapsData;
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
            data: {elements: [], links: {prev: ''}},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
        },
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

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}},
            status: response.data?.statusCode || response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
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
                    errorMessage =
                        "Route can't be published. Please try again later";
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
        for (let i = 0; i < images.save.length; i++) {
            const formdata = createFileFormData(images.save[i]);
            const imageResponse = await uploadImageToMapData(
                id || data.id,
                formdata,
            );

            if (
                !imageResponse?.data ||
                imageResponse.status >= 400 ||
                imageResponse.data?.statusCode >= 400
            ) {
                let errorMessage = 'error';
                if (imageResponse.data?.message || imageResponse.data?.error) {
                    errorMessage =
                        imageResponse.data.message || imageResponse.data.error;
                    if (imageResponse.data?.statusCode !== 400) {
                        errorMessage = `File [${images.save[i].fileName}] could not be uloaded. Please try again later`;
                    }
                }
                return {
                    data: null,
                    status:
                        imageResponse.data?.statusCode || imageResponse.status,
                    error: errorMessage,
                };
            }
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
                errorMessage =
                    'Route could not be removed. Please try again later.';
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
