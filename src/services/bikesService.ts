import {getBike} from '../api';

export const getBikeByFrameNr = async (frameNr: string) => {
    const response = await getBike(frameNr);

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.status === 404) {
            errorMessage = response.data?.message || response.data?.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {data: response.data, status: response.status, error: ''};
};
