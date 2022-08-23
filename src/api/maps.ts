import instance, {axiosGet, axiosPut, AxiosRequestConfigI} from '@api/api';
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
import {prepareConfigReuqstWithController} from './utils/config';

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
    controller?: AbortController,
) => {
    const r = range || 50000;
    const l = limit || 10;
    const lat = location?.latitude;
    const lng = location?.longitude;
    const locationParams = `lat=${location?.latitude}&lng=${location?.longitude}&`;
    let url = `${BASE_URL}/find/location?${
        lat && lng ? locationParams : ''
    }range=${r}&limit=${l}&page=1&detailed=true`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(
        paginationUrl || url,
        paginationUrl ? undefined : params,
        controller,
    );
};
export const getMapsCount = async (
    filters?: MapFitlerType,
    controller?: AbortController,
) => {
    let url = `${BASE_URL}/find/location/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params, controller);
};

export const getPrivateMapsCount = async (
    filters?: MapFitlerType,
    controller?: AbortController,
) => {
    let url = `${BASE_URL}/find/my/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params, controller);
};

export const getPlannedMapsCount = async (
    filters?: MapFitlerType,
    controller?: AbortController,
) => {
    let url = `${BASE_URL}/favorites/count`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(url, params, controller);
};

export const getRoute = async (
    id: string,
    location?: Coords,
    withPath?: boolean,
    controller?: AbortController,
) => {
    let url = `${BASE_ROUTE_URL}/${id}`;
    if (location) {
        url = `${url}?lat=${location.latitude}&lng=${location.longitude}&distance=true`;
    }
    if (withPath) {
        const concatenator = location ? '&' : '?';
        url = `${url}${concatenator}path=${!!withPath}`;
    }

    return await axiosGet(url, undefined, controller);
};

export const getPrivateRoutes = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
    controller?: AbortController,
) => {
    const lat = location?.latitude;
    const lng = location?.longitude;
    const locationParams = `lat=${location?.latitude}&lng=${location?.longitude}&`;
    let url = `${BASE_URL}/find/my?${
        lat && lng ? locationParams : ''
    }detailed=true`;

    /**
     * Default: private routes are filtered by created_at.
     */
    const params =
        filters && Object.keys(filters)?.length > 0
            ? {params: filters}
            : {params: {sortBy: 'created', order: 'desc'}};
    return await axiosGet(
        paginationUrl || url,
        paginationUrl ? undefined : params,
        controller,
    );
};

export const editPrivateMapMetaData = async (
    id: string,
    data: MapMetadataType,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.patch(
        `${BASE_ROUTE_URL}/${id}/metadata`,
        data,
        requestConfig,
    );
};

export const publishPrivateMapData = async (
    id: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post(
        `${BASE_ROUTE_URL}/${id}/publish`,
        {},
        requestConfig,
    );
};

export const removePrivateMapData = async (
    id: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.delete(`${BASE_ROUTE_URL}/${id}`, requestConfig);
};

export const uploadImageToMapData = async (
    id: string,
    formData: FormData,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
        headers: {'Content-Type': 'multipart/form-data'},
        timeout: 90000,
    };
    return await instance.post(
        `${BASE_ROUTE_URL}/${id}/image`,
        formData,
        requestConfig,
    );
};

export const removeImagesToMapData = async (
    id: string,
    ids: string[],
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
        data: {
            ids,
        },
    };
    return await instance.delete(
        `${BASE_ROUTE_URL}/${id}/image`,
        requestConfig,
    );
};

export const getPlannedRoutes = async (
    location: Coords,
    paginationUrl?: string,
    filters?: MapFitlerType,
    controller?: AbortController,
) => {
    const lat = location?.latitude;
    const lng = location?.longitude;
    const locationParams = `lat=${location?.latitude}&lng=${location?.longitude}&`;
    let url = `${PLANNED_ROUTE_URL}?${
        lat && lng ? locationParams : ''
    }detailed=true`;

    const params =
        filters && Object.keys(filters)?.length > 0 ? {params: filters} : {};

    return await axiosGet(
        paginationUrl || url,
        paginationUrl ? undefined : params,
        controller,
    );
};

export const addPlannedRoute = async (
    id: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await axiosPut(
        `${PLANNED_ROUTE_URL}/${id}`,
        undefined,
        requestConfig,
    );
};

export const removePlannedRoute = async (
    id: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.delete(`${PLANNED_ROUTE_URL}/${id}`, requestConfig);
};

export const getMarkersList = async (
    data: BBox,
    location: BasicCoordsType,
    controller?: AbortController,
) => {
    const bboxParams = tranformParamsToBBoxRequest(data.bbox);
    const loc = tranformParamsToBasicLocationRequest(location);
    const query = `${loc}&${bboxParams}`;

    return await axiosGet(
        `${BASE_FIND_URL}/map?${query}`,
        undefined,
        controller,
    );
};

export const getFeaturedMaps = async (
    location: Coords,
    paginationUrl?: string,
    controller?: AbortController,
): Promise<AxiosResponse<any>> => {
    let url = `${BASE_URL}/featured?lat=${location.latitude}&lng=${location.longitude}`;

    return await axiosGet(paginationUrl || url, undefined, controller);
};
