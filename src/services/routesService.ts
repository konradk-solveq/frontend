import {createRoute, sendRouteData} from '../api';
import {LocationDataI} from '../interfaces/geolocation';
import {MapType} from '../models/map.model';

export interface MapsResponse {
    data: MapType | null;
    status: number;
    error: string;
}

export const syncRouteData = async (
    path: LocationDataI[],
): Promise<MapsResponse> => {
    const response = await createRoute();

    if (!response?.data?.id || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    const responseFromUpdate = await sendRouteData(response.data.id, path);

    return {
        data: <MapType>responseFromUpdate.data,
        status: response.status,
        error: '',
    };
};
