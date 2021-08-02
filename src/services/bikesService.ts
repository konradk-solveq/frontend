import {getBike, getGenericBikeData, getBikesList} from '../api';

export interface serviceResponse {
    data: any | null;
    status: number;
    error: string;
}

export const getBikeByFrameNr = async (
    frameNr: string,
): Promise<serviceResponse> => {
    const response = await getBike(frameNr);

    if (!response?.data || response.status > 400) {
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

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {data: response.data, status: response.status, error: ''};
};

export const getBikesListByFrameNrs = async (frameNrs: string[]) => {
    const numbers: string = frameNrs.join(',');
    const response = await getBikesList(numbers);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {data: response.data, status: response.status, error: ''};
};
