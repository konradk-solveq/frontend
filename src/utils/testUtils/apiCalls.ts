import instance from '@api/api';
import {AxiosResponse} from 'axios';

type GeneralResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status'>;

type HttpMethodT = 'post' | 'get' | 'put' | 'delete' | 'patch';

const defaultResponse = {
    data: null,
    status: 204,
};

export const postApiCallMock = async <T>(
    response?: GeneralResponse<T>,
    method?: HttpMethodT,
) => {
    return jest.spyOn(instance, method || 'post').mockImplementation(() => {
        return new Promise(resolve => {
            return resolve(response || defaultResponse);
        });
    });
};

export const getApiCallMock = async <T>(response?: GeneralResponse<T>) => {
    return jest.spyOn(instance, 'get').mockImplementation(() => {
        return new Promise(resolve => {
            return resolve(response || defaultResponse);
        });
    });
};

export const putApiCallMock = async <T>(response?: GeneralResponse<T>) => {
    return jest.spyOn(instance, 'put').mockImplementation(() => {
        return new Promise(resolve => {
            return resolve(response || defaultResponse);
        });
    });
};
