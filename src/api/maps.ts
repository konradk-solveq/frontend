import instance, {axiosGet, source} from './api';
import {Coords} from '../models/map.model';
import {MapMetadataType} from '../interfaces/api';
import {OptionType} from '../interfaces/form';

const BASE_URL = '/routes';
const BASE_ROUTE_URL = `${BASE_URL}/route`;

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
    let url = `${BASE_URL}/find/location?lat=${location.latitude}&lng=${location.longitude}&range=${r}&limit=${l}&page=1`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(paginationUrl || url, params);
};

export const getRoute = async (id: string) =>
    await axiosGet(`${BASE_ROUTE_URL}/${id}`);

export const getPrivateRoutes = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
) => {
    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};
    return await axiosGet(
        paginationUrl ||
            `${BASE_URL}/find/my?lat=${location.latitude}&lng=${location.longitude}&detailed=true`,
        params,
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
        timeout: 60000,
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
