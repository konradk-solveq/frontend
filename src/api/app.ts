import {axiosGet} from './api';

export const getConfig = async () => {
    return await axiosGet('/application/config', {
        validateStatus: () => true,
    });
};
