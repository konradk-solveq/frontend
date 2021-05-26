import axios from 'axios';
import {API_URL} from '@env';

const config = {
    timeout: 1000,
};

const instance = axios.create({
    baseURL: API_URL,
    timeout: config.timeout,
    // validateStatus: () => {
    //     return true;
    // },
});

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
