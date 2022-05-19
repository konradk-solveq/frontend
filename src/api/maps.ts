import instance, {axiosGet, source} from './api';
import {Coords} from '@models/map.model';
import {MapMetadataType} from '@interfaces/api';
import {OptionType} from '@interfaces/form';
import {BBox} from '@models/places.model';
import {
    tranformParamsToBasicLocationRequest,
    tranformParamsToBBoxRequest,
} from '@utils/apiDataTransform/prepareRequest';
import {BasicCoordsType} from '@type/coords';

import {AxiosResponse} from 'axios';

const BASE_URL = '/routes';
const BASE_ROUTE_URL = `${BASE_URL}/route`;
const PLANNED_ROUTE_URL = `${BASE_URL}/favorites`;
const BASE_FIND_URL = `${BASE_URL}/find`;

type MapFitlerType = {
    [k: string]: OptionType[];
};

export const getMaps = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
    range?: number,
    limit?: number,
) => {
    const r = range || 50000;
    const l = limit || 10;
    let url = `${BASE_URL}/find/location?lat=${location.latitude}&lng=${location.longitude}&range=${r}&limit=${l}&page=1&detailed=true`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(
        paginationUrl || url,
        paginationUrl ? undefined : params,
    );
};
export const getMapsCount = async (
    location: Coords,
    filters?: MapFitlerType,
) => {
    let url = `${BASE_URL}/find/location/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params);
};

export const getPrivateMapsCount = async (
    location: Coords,
    filters?: MapFitlerType,
) => {
    let url = `${BASE_URL}/find/my/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params);
};

export const getPlannedMapsCount = async (
    location: Coords,
    filters?: MapFitlerType,
) => {
    let url = `${BASE_URL}/favorites/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params);
};

export const getRoute = async (
    id: string,
    location?: Coords,
    withPath?: boolean,
) => {
    let url = `${BASE_ROUTE_URL}/${id}`;
    if (location) {
        url = `${url}?lat=${location.latitude}&lng=${
            location.longitude
        }&distance=true&path=${!!withPath}`;
    }

    return await axiosGet(url);
};

export const getPrivateRoutes = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
) => {
    /**
     * Default: private routes are filtered by created_at.
     */
    const params =
        filters && Object.keys(filters)?.length > 0
            ? {params: filters}
            : {params: {sortBy: 'created', order: 'desc'}};
    return await axiosGet(
        paginationUrl ||
            `${BASE_URL}/find/my?lat=${location.latitude}&lng=${location.longitude}&detailed=true`,
        paginationUrl ? undefined : params,
    );
};

export const editPrivateMapMetaData = async (
    id: string,
    data: MapMetadataType,
) => {
    return await instance.patch(`${BASE_ROUTE_URL}/${id}/metadata`, data, {
        cancelToken: source.token,
    });
};

export const publishPrivateMapData = async (id: string) => {
    return await instance.post(
        `${BASE_ROUTE_URL}/${id}/publish`,
        {},
        {
            cancelToken: source.token,
        },
    );
};

export const removePrivateMapData = async (id: string) => {
    return await instance.delete(`${BASE_ROUTE_URL}/${id}`, {
        cancelToken: source.token,
    });
};

export const uploadImageToMapData = async (id: string, formData: FormData) => {
    return await instance.post(`${BASE_ROUTE_URL}/${id}/image`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 90000,
        cancelToken: source.token,
    });
};

export const removeImagesToMapData = async (id: string, ids: string[]) => {
    return await instance.delete(`${BASE_ROUTE_URL}/${id}/image`, {
        data: {
            ids,
        },
        cancelToken: source.token,
    });
};

export const getPlannedRoutes = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
) => {
    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(
        paginationUrl ||
            `${PLANNED_ROUTE_URL}?lat=${location.latitude}&lng=${location.longitude}&detailed=true`,
        paginationUrl ? undefined : params,
    );
};

export const addPlannedRoute = async (id: string) => {
    return await instance.put(
        `${PLANNED_ROUTE_URL}/${id}`,
        {},
        {
            cancelToken: source.token,
        },
    );
};

export const removePlannedRoute = async (id: string) => {
    return await instance.delete(`${PLANNED_ROUTE_URL}/${id}`, {
        cancelToken: source.token,
    });
};

export const getMarkersList = async (data: BBox, location: BasicCoordsType) => {
    const bboxParams = tranformParamsToBBoxRequest(data.bbox);
    const loc = tranformParamsToBasicLocationRequest(location);
    const query = `${loc}&${bboxParams}`;

    return await axiosGet(`${BASE_FIND_URL}/map?${query}`, {
        cancelToken: source.token,
    });
};

export const getFeaturedMaps = async (
    location: Coords,
    paginationUrl?: string,
): Promise<AxiosResponse<any>> => {
    let url = `${BASE_URL}/featured?lat=${location.latitude}&lng=${location.longitude}`;

    return await axiosGet(paginationUrl || url, {});
};
