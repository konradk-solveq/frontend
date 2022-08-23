import axios, {AxiosRequestConfig} from 'axios';
import {API_URL} from '@env';
import {getUserAgent} from './utils/headers';
import {setntryContext} from '@sentryLogger/sentryLogger';
import TimeoutError from '@utils/apiDataTransform/timeoutError';
import CancelRequestError from '@utils/apiDataTransform/cancelRequestError';

const config = {
    timeout: 120000,
};

export interface AxiosRequestConfigI extends AxiosRequestConfig {}

const instance = axios.create({
    baseURL: API_URL,
    timeout: config.timeout,
    validateStatus: status => {
        return status < 500;
    },
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export const setLanguageHeader = (lang: string) => {
    instance.defaults.headers.get['Accept-Language'] = lang;
};

export const setAutorizationHeader = (token: string) => {
    /* TODO: replace with smth more fancy */
    instance.defaults.headers.get.Authorization = `Bearer ${token}`;
    instance.defaults.headers.post.Authorization = `Bearer ${token}`;
    instance.defaults.headers.patch.Authorization = `Bearer ${token}`;
    instance.defaults.headers.put.Authorization = `Bearer ${token}`;
    instance.defaults.headers.delete.Authorization = `Bearer ${token}`;
};

export const setUserAgentHeader = () => {
    const uaHeader = getUserAgent();
    if (uaHeader) {
        instance.defaults.headers.common['User-Agent'] = uaHeader;
    }
    setntryContext('server_uri', {url: API_URL});
};

export const source = axios.CancelToken.source();
export const isCancel = (c: any) => axios.isCancel(c);

export const axiosGet = async (
    url: string,
    options = <AxiosRequestConfigI>{},
    controller?: AbortController,
) => {
    const requestController = controller || createAbortControllerInstance();

    /**
     * Abort request when timeout is reached
     * only when custom controller is not provided
     */
    const clientRequestTimeout = setTimeout(
        () => !controller && requestController?.abort(),
        config.timeout,
    );
    const response = await instance
        .get(url, {
            signal: requestController?.signal,
            ...options,
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                clearTimeout(clientRequestTimeout);
                console.error('Error: ', error.message);

                if (controller) {
                    throw new CancelRequestError(error.message);
                } else {
                    throw new TimeoutError(
                        `Request canceled - timeout of ${config.timeout}ms.`,
                    );
                }
            } else {
                throw error;
            }
        });

    /**
     * Cancel aborting request when successfull response is received
     */
    clearTimeout(clientRequestTimeout);
    return response;
};
export const axiosPut = async (
    url: string,
    data?: object,
    options = <AxiosRequestConfigI>{},
    controller?: AbortController,
) => {
    const requestController = controller || createAbortControllerInstance();

    /**
     * Abort request when timeout is reached
     * only when custom controller is not provided
     */
    const clientRequestTimeout = setTimeout(
        () => !controller && requestController?.abort(),
        config.timeout,
    );
    const response = await instance
        .put(url, data, {
            signal: requestController?.signal,
            ...options,
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                clearTimeout(clientRequestTimeout);
                console.error('Error: ', error.message);

                if (controller) {
                    throw new CancelRequestError(error.message);
                } else {
                    throw new TimeoutError(
                        `Request canceled - timeout of ${config.timeout}ms.`,
                    );
                }
            } else {
                throw error;
            }
        });

    /**
     * Cancel aborting request when successfull response is received
     */
    clearTimeout(clientRequestTimeout);
    return response;
};

export default instance;

/**
 * Temp fix for jest tests
 */
const createAbortControllerInstance = () => {
    if (!process.env.JEST_WORKER_ID) {
        // eslint-disable-next-line no-undef
        return new AbortController();
    }

    return;
};
