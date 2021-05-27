import {getMaps} from '../api';
import {MapType, Coords} from '../models/map.model';

export interface MapsData {
    elements: MapType[] | [];
    links: {prev: string};
}

export interface MapsResponse {
    data: MapsData;
    status: number;
    error: string;
}

export const getMapsList = async (location: Coords): Promise<MapsResponse> => {
    const response = await getMaps(location);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {
            data: {elements: [], links: {prev: ''}},
            status: response.status,
            error: errorMessage,
        };
    }

    return {
        data: {
            elements: response.data.elements,
            links: response.data.links,
        },
        status: response.status,
        error: '',
    };
};
