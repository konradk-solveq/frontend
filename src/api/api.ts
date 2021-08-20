import axios from 'axios';
import {API_URL} from '@env';
import {getUserAgent} from './utils/headers';
import logger from '@src/utils/crashlytics';

const config = {
    timeout: 60000,
};

const instance = axios.create({
    baseURL: API_URL,
    timeout: config.timeout,
    validateStatus: status => {
        return status >= 200 && status < 500;
    },
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

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
    logger.log(`[SERVER URL - ${API_URL}]`);
};

export const source = axios.CancelToken.source();
export const isCancel = (c: any) => axios.isCancel(c);

export const axiosGet = async (url: string, options = {}) => {
    const abort = axios.CancelToken.source();
    const id = setTimeout(
        () => abort.cancel(`Timeout of ${config.timeout}ms.`),
        config.timeout,
    );
    const response = await instance.get(url, {
        cancelToken: abort.token,
        ...options,
    });
    clearTimeout(id);
    return response;
};

export default instance;
