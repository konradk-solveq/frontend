import {getConfig} from '../api';
import {AppConfigI} from '../models/config.model';

export const getAppConfigService = async () => {
    const response = await getConfig();

    if (!response?.data || response.status > 400) {
        let errorMessage = 'error';
        if (response.data?.message || response.data?.error) {
            errorMessage = response.data.message || response.data.error;
        }
        return {data: null, status: response.status, error: errorMessage};
    }

    return {
        data: <AppConfigI>response.data,
        status: response.status,
        error: '',
    };
};
