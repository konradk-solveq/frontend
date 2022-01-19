import {axiosGet, axiosPut} from '@api/api';
import {PutUserConsentsDataT} from '@services/consentsService';

const BASE_ROUTE_URL = '/consents/user';

export const getUserConsents = async () => {
    return await axiosGet(BASE_ROUTE_URL);
};

export const putUserConsents = async (data: PutUserConsentsDataT) => {
    return await axiosPut(BASE_ROUTE_URL, data);
};
