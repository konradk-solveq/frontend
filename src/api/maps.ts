import instance, {axiosGet, source} from './api';
import {Coords} from '../models/map.model';
import {MapMetadataType} from '../interfaces/api';

export const getMaps = async (
    location: Coords,
    paginationUrl?: string,
    range?: number,
    limit?: number,
) => {
    const r = range || 50000;
    const l = limit || 10;
    const url = `/routes/find/location?lat=${location.latitude}&lng=${location.longitude}&range=${r}&limit=${l}&page=1`;
    return await axiosGet(paginationUrl || url, {
        validateStatus: () => true,
    });
};

export const getRoute = async (id: string) =>
    await axiosGet(`/routes/route/${id}`, {
        validateStatus: () => true,
    });

export const getPrivateRoutes = async (
    location: Coords,
    paginationUrl?: string,
) =>
    await axiosGet(
        paginationUrl ||
            `/routes/find/my?location?lat=${location.latitude}&lng=${location.longitude}detailed=true`,
        {
            validateStatus: () => true,
        },
    );

export const editPrivateMapMetaData = async (
    id: string,
    data: MapMetadataType,
) => {
    return await instance.patch(`/routes/route/${id}/metadata`, data, {
        cancelToken: source.token,
        validateStatus: () => true,
    });
};

export const publishPrivateMapData = async (id: string) => {
    return await instance.post(
        `/routes/route/${id}/publish`,
        {},
        {
            cancelToken: source.token,
            validateStatus: () => true,
        },
    );
};

export const removePrivateMapData = async (id: string) => {
    return await instance.delete(`/routes/route/${id}`, {
        cancelToken: source.token,
        validateStatus: () => true,
    });
};
