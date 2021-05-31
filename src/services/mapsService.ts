import {
    editPrivateMapMetaData,
    getMaps,
    getPrivateRoutes,
    publishPrivateMapData,
} from '../api';
import {MapFormDataResult} from '../interfaces/form';
import {MapType, Coords} from '../models/map.model';
import {mapFormMetadataToAPIRequest} from '../utils/apiDataTransform/prepareRequest';

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
): Promise<MapsResponse> => {
    const response = await getMaps(location, paginationUrl);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}},
            status: response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
        },
        status: response.status,
        error: '',
    };
};

export const getPrivateMapsListService = async (
    location: Coords,
    page?: string,
): Promise<MapsResponse> => {
    const response = await getPrivateRoutes(location, page);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}},
            status: response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
        },
        status: response.status,
        error: '',
    };
};

export const editPrivateMapMetadataService = async (
    data: MapFormDataResult,
    author: string,
    publish?: boolean,
    id?: string,
): Promise<MapsDataResponse> => {
    const metadata = mapFormMetadataToAPIRequest(
        data,
        data.publishWithName ? author : '',
    );

    const response = await editPrivateMapMetaData(id || data.id, metadata);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: null,
            status: response.status,
            error: errorMessage,
        };
    }

    /* TODO: upload|remove images */

    if (publish) {
        const publishResponse = await publishPrivateMapData(id || data.id);

        if (
            !publishResponse?.data ||
            publishResponse.status > 400 ||
            publishResponse.status !== 201
        ) {
            let errorMessage = 'error';
            if (publishResponse.data?.message || publishResponse.data?.error) {
                errorMessage =
                    publishResponse.data.message || publishResponse.data.error;
            }
            return {
                data: null,
                status: publishResponse.status,
                error: errorMessage,
            };
        }
    }

    return {
        data: '',
        status: response.status,
        error: '',
    };
};
