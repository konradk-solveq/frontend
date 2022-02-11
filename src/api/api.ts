import axios from 'axios';
import {API_URL} from '@env';
import {getUserAgent} from './utils/headers';
import {setntryContext} from '@sentryLogger/sentryLogger';

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

/**
 * POST/session/login: cookie - for dashboard
 * GET//application/config: user-agent, Accept-Language
 * GET/application/terms-and-conditions: Accept-Language
 * GET​/application​/regulation​/{version}: Accept-Language
 * GET/application/policy/{version}: Accept-Language
 * GET​/application​/urls: Accept-Language
 * GET/application/ui-translation: accept-language
 *
 */
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
export const axiosPut = async (url: string, data: object, options = {}) => {
    const abort = axios.CancelToken.source();
    const id = setTimeout(
        () => abort.cancel(`Timeout of ${config.timeout}ms.`),
        config.timeout,
    );
    const response = await instance.put(url, data, {
        cancelToken: abort.token,
        ...options,
    });
    clearTimeout(id);
    return response;
};

export default instance;
