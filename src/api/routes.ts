import instance, {source} from './api';
import {ApiPathI} from '../interfaces/geolocation';

export const createRoute = async (name: string) => {
    return await instance.post(
        '/routes/route',
        {
            name: name,
        },
        {
            cancelToken: source.token,
            validateStatus: () => true,
        },
    );
};

export const sendRouteData = async (id: string, path: ApiPathI[]) => {
    return await instance.patch(`/routes/route/${id}/path`, path, {
        cancelToken: source.token,
        validateStatus: () => true,
    });
};
