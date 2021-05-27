import {axiosGet} from './api';
import {Coords} from '../models/map.model';

export const getMaps = async (
    location: Coords,
    range?: number,
    limit?: number,
    paginationUrl?: string,
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
