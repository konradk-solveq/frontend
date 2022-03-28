import {BikeType} from '@src/type/bike';
import {getBike, getGenericBikeData, getBikesList} from '../api';
import {bikeTypes} from './mock/genericBIke';

export interface serviceResponse {
    data: any | null;
    status: number;
    error: string;
}

export const getBikeByFrameNr = async (
    frameNr: string,
): Promise<serviceResponse> => {
    const response = await getBike(frameNr);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {data: response.data, status: response.status, error: ''};
};

export const getGenericDataforBike = async () => {
    const response = await getGenericBikeData();

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    /* TODO: remove mocked data after changes on API */
    const t = {bikeTypes: bikeTypes};

    return {
        data: {...response.data, ...t},
        status: response.status,
        error: '',
    };
};

export const getBikesListByFrameNrs = async (frameNrs: string[]) => {
    const numbers: string = frameNrs.join(',');
    const response = await getBikesList(numbers);

    if (!response?.data || response.status >= 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {data: response.data, status: response.status, error: ''};
};
