import {Consent} from '@models/consents.model';
import {getUserConsents, putUserConsents} from '@api/consents';

export interface ConsentsResponse {
    data: Consent[] | [];
    status: number;
    error: string;
}

export type PutUserConsentsDataT = {
    ids: number[];
};

export const getConsentsList = async (): Promise<ConsentsResponse> => {
    const response = await getUserConsents();

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: [], status: response.status, error: errorMessage};
    }

    return {
        data: <Consent[]>response.data,
        status: response.status,
        error: '',
    };
};

export const putConsentsList = async (
    data: PutUserConsentsDataT,
): Promise<ConsentsResponse> => {
    const response = await putUserConsents(data);
    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: [], status: response.status, error: errorMessage};
    }

    return {
        data: <Consent[]>response.data,
        status: response.status,
        error: '',
    };
};
