import instance, {source} from './api';
import {LocationDataI} from '../interfaces/geolocation';

export const createRoute = async () => {
    return await instance.post('/route ', {
        cancelToken: source.token,
        validateStatus: () => true,
    });
};

export const sendRouteData = async (id: string, path: LocationDataI[]) => {
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
