import {AxiosRequestConfig} from 'axios';
import instance, {axiosGet} from '@api/api';
import {prepareConfigReuqstWithController} from './utils/config';

/* Initial registration process (as device). API returns all data */
export const registerDevice = async (controller?: AbortController) => {
    const requestConfig: AxiosRequestConfig = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post('/session/mobile/register', {}, requestConfig);
};

export const logInMobile = async (
    userId: string,
    deviceToken: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfig = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post(
        '/session/mobile/login',
        {
            userId: userId,
            deviceToken: deviceToken,
        },
        requestConfig,
    );
};

export const logIn = async (
    email: string,
    password: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfig = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post(
        '/session/login',
        {
            email: email,
            password: password,
        },
        requestConfig,
    );
};

export const currentSession = async (token: string) => {
    return await axiosGet('/session/current', {
        headers: {Authorization: `Bearer ${token}`},
    });
};

export const refreshSession = async (
    token: string,
    refreshToken: string,
    controller?: AbortController,
) => {
    const requestConfig: AxiosRequestConfig = {
        ...prepareConfigReuqstWithController(controller),
        headers: {Authorization: `Bearer ${token}`},
    };
    return await instance.post(
        '/session/refresh',
        {
            refresh_token: refreshToken,
        },
        requestConfig,
    );
};

export const logOut = async (controller?: AbortController) => {
    const requestConfig: AxiosRequestConfig = {
        ...prepareConfigReuqstWithController(controller),
    };
    return await instance.post('/session/logout', {}, requestConfig);
};
