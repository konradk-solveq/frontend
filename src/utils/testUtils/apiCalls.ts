import instance from '@api/api';
import {AxiosResponse} from 'axios';

type GeneralResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status'>;

type HttpMethodT = 'post' | 'get' | 'put' | 'delete' | 'patch';

const defaultResponse = {
    data: null,
    status: 204,
};

const defaultErrorResponse = {
    data: null,
    status: 400,
};

export const postApiCallMock = async <T>(
    response?: GeneralResponse<T>,
    method?: HttpMethodT,
    isRejected?: boolean,
) => {
    return jest.spyOn(instance, method || 'post').mockImplementation(() => {
        return new Promise((resolve, reject) => {
            return isRejected
                ? reject(response || defaultErrorResponse)
                : resolve(response || defaultResponse);
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

export const apiCallMock = async <T>(
    response?: GeneralResponse<T>,
    method?: HttpMethodT,
    isRejected?: boolean,
) => {
    return jest.spyOn(instance, method || 'post').mockImplementation(() => {
        return new Promise((resolve, reject) => {
            return isRejected
                ? reject(response || defaultErrorResponse)
                : resolve(response || defaultResponse);
        });
    });
};
