import axios from 'axios';
import {API_URL} from '@env';

const config = {
    timeout: 10000,
};

const instance = axios.create({
    baseURL: API_URL,
    timeout: config.timeout,
    validateStatus: status => {
        return status >= 200 && status < 300;
    },
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export const setAutorizationHeader = (token: string) => {
    /* TODO: replace with smth more fancy */
    instance.defaults.headers.get.Authorization = `Bearer ${token}`;
    instance.defaults.headers.post.Authorization = `Bearer ${token}`;
    instance.defaults.headers.patch.Authorization = `Bearer ${token}`;
    instance.defaults.headers.delete.Authorization = `Bearer ${token}`;
};

export const source = axios.CancelToken.source();
export const isCancel = (c: any) => axios.isCancel(c);

export const axiosGet = (url: string, options = {}) => {
    const abort = axios.CancelToken.source();
    const id = setTimeout(
        () => abort.cancel(`Timeout of ${config.timeout}ms.`),
        config.timeout,
    );
    return instance
        .get(url, {cancelToken: abort.token, ...options})
        .then(response => {
            clearTimeout(id);
            return response;
        });
};

export default instance;
