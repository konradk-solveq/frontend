import instance, {source} from './api';
import {ApiPathI} from '../interfaces/geolocation';

export const createRoute = async () => {
    return await instance.post('/route ', {
        cancelToken: source.token,
        validateStatus: () => true,
    });
};

export const sendRouteData = async (id: string, path: ApiPathI[]) => {
    return await instance.post(
        `/route/${id}/path`,
        {
            path: JSON.stringify(path),
        },
        {
            cancelToken: source.token,
            validateStatus: () => true,
        },
    );
};
