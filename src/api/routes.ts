import instance, {axiosGet, AxiosRequestConfigI} from '@api/api';
import {PathApiRequestBodyI} from '@interfaces/geolocation';
import {prepareConfigReuqstWithController} from '@api/utils/config';

export const createRoute = async (
    name: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post(
        '/routes/route',
        {
            name: name,
        },
        requestConfig,
    );
};

export const sendRouteData = async (
    id: string,
    routeData: PathApiRequestBodyI,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfigI = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.patch(
        `/routes/route/${id}/path-and-properties`,
        routeData,
        requestConfig,
    );
};

export const getRouteByUrl = async (
    url: string,
    controller?: AbortController,
) => {
    return await axiosGet(url, undefined, controller);
};
