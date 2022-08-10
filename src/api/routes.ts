import instance, {axiosGet, source} from './api';
import {PathApiRequestBodyI} from '../interfaces/geolocation';

export const createRoute = async (name: string) => {
    return await instance.post(
        '/routes/route',
        {
            name: name,
        },
        {
            cancelToken: source.token,
        },
    );
};

export const sendRouteData = async (
    id: string,
    routeData: PathApiRequestBodyI,
) => {
    return await instance.patch(
        `/routes/route/${id}/path-and-properties`,
        routeData,
        {
            cancelToken: source.token,
        },
    );
};

export const getRouteByUrl = async (url: string) => {
    return await axiosGet(url);
};
