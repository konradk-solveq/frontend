import {getPlaces} from '../api';
import {BBox, Place} from '../models/places.model';

export interface PlacesResponse {
    data: Place[] | [];
    status: number;
    error: string;
}

export const getPlacesList = async (bbox: BBox): Promise<PlacesResponse> => {
    const response = await getPlaces(bbox);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.status === 404 || response.status === 400) {
            errorMessage = response.data?.message || response.data?.error;
        }
        return {data: [], status: response.status, error: errorMessage};
    }

    return {data: <Place[]>response.data, status: response.status, error: ''};
};
