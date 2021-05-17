import {getMaps} from '../api';
import {Map} from '../models/map.model';

export interface MapsResponse {
    data: Map[] | [];
    status: number;
    error: string;
}

export const getMapsList = async (): Promise<MapsResponse> => {
    const response = await getMaps();

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: [], status: response.status, error: errorMessage};
    }

    return {
        data: <Map[] | []>response.data,
        status: response.status,
        error: '',
    };
};
