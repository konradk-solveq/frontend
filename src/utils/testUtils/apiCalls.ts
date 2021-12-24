import instance from '@api/api';
import {AxiosResponse} from 'axios';

type GeneralResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status'>;

const defaultResponse = {
    data: null,
    status: 204,
};

export const postApiCallMock = async <T>(response?: GeneralResponse<T>) => {
    return jest.spyOn(instance, 'post').mockImplementation(() => {
        return new Promise(resolve => {
            return resolve(response || defaultResponse);
        });
    });
};
